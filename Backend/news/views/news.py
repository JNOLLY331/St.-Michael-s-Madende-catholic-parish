from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from news.filters import NewsFilter
from news.models import News
from news.permissions import IsNewsManager
from news.serializers import (
    NewsCreateUpdateSerializer,
    NewsDetailSerializer,
    NewsListSerializer,
)
from news.services import NewsNotificationService, NewsService


class NewsViewSet(viewsets.ModelViewSet):
    """ViewSet for managing parish news, bulletins, and announcements."""

    queryset = News.objects.select_related("category", "author", "parish")
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = NewsFilter
    search_fields = ("title", "excerpt", "content")
    ordering_fields = ("published_at", "created_at", "views")
    ordering = ("-published_at",)

    def get_permissions(self):
        """Map distinct access rules based on public vs private action types."""
        public_actions = ("list", "retrieve", "featured", "latest")
        if self.action in public_actions:
            return [AllowAny()]
        return [IsNewsManager()]

    def get_serializer_class(self):
        """Dynamically assign serializers tailored to specific operations."""
        if self.action == "list":
            return NewsListSerializer
        if self.action == "retrieve":
            return NewsDetailSerializer
        return NewsCreateUpdateSerializer

    def get_queryset(self):
        """Isolate active drafts from general unauthenticated public traffic."""
        if self.request.user and self.request.user.is_authenticated:
            return self.queryset
        return News.objects.published()

    def perform_create(self, serializer):
        NewsService.create_news(serializer.validated_data)

    def perform_update(self, serializer):
        NewsService.update_news(serializer.instance, serializer.validated_data)

    def retrieve(self, request, *args, **kwargs):
        """Fetch article detail view and automatically increment analytical counters."""
        instance = self.get_object()
        NewsService.increment_views(instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # -------------------------------------------------
    # Custom Endpoint Actions
    # -------------------------------------------------

    @action(detail=True, methods=["post"])
    def publish(self, request, pk=None):
        """Publish a news article and notify subscribers."""
        news = self.get_object()
        NewsService.publish(news)
        NewsNotificationService.notify_news_published(news)
        return Response(
            {"message": "News published successfully."}, status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"])
    def archive(self, request, pk=None):
        """Archive a news article from public views."""
        news = self.get_object()
        NewsService.archive(news)
        return Response({"message": "News archived successfully."})

    @action(detail=True, methods=["post"])
    def feature(self, request, pk=None):
        """Pin a news article to featured sections."""
        news = self.get_object()
        NewsService.feature(news)
        NewsNotificationService.notify_featured(news)
        return Response({"message": "News marked as featured."})

    @action(detail=True, methods=["post"])
    def unfeature(self, request, pk=None):
        """Remove an article from featured slots."""
        news = self.get_object()
        NewsService.unfeature(news)
        return Response({"message": "Featured status removed."})

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Retrieve all active pinned/featured announcements."""
        queryset = News.objects.featured()
        serializer = NewsListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def latest(self, request):
        """Retrieve the top 10 most recently published articles."""
        queryset = News.objects.latest()[:10]
        serializer = NewsListSerializer(queryset, many=True)
        return Response(serializer.data)