from django.urls import include, path
from rest_framework.routers import DefaultRouter

from news.views import NewsCategoryViewSet, NewsViewSet

app_name = "news"

router = DefaultRouter()
# /api/news/
router.register(r"categories", NewsCategoryViewSet, basename="category")
router.register(r"", NewsViewSet, basename="news")

urlpatterns = [
    path("", include(router.urls)),
]