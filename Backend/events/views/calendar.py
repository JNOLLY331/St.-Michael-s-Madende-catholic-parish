"""
Calendar API view for public consumption.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from events.filters import EventFilter
from events.models import Event
from events.serializers import EventListSerializer


class CalendarView(APIView):
    """
    Return a filtered, chronological list of all published events 
    specifically structured for frontend calendar displays.
    """

    permission_classes = (AllowAny,)
    filter_backend = DjangoFilterBackend()

    def get_queryset(self):
        """
        Return the base queryset of published events optimized to prevent N+1 queries.
        """
        return (
            Event.objects.filter(is_published=True)
            .select_related("organizer", "ministry")
            .order_by("start_date")
        )

    def get(self, request: Request) -> Response:
        """
        Handle GET requests to fetch public events.
        
        Supports full date range filtering natively using the EventFilter schema:
        e.g., /api/calendar/?start_after=2026-07-01&start_before=2026-07-31
        """
        # 1. Fetch optimized base queryset
        queryset = self.get_queryset()

        # 2. Leverage your pre-existing EventFilter to filter down by range or metadata
        filterset = EventFilter(
            data=request.query_params, queryset=queryset, request=request
        )

        if not filterset.is_valid():
            return Response(filterset.errors, status=status.HTTP_400_BAD_REQUEST)

        # 3. Serialize and return the filtered dataset
        serializer = EventListSerializer(filterset.qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)