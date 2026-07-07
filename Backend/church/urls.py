from django.urls import path
from .views import (
    ParishInformationView,
    HeroSectionView,
    LeadershipListView,
    MassScheduleListView,
    StatisticListView,
    SaintListView,
)

urlpatterns = [
    path("parish/", ParishInformationView.as_view(), name="parish-information"),
    path("hero/", HeroSectionView.as_view(), name="hero-section"),
    path("leadership/", LeadershipListView.as_view(), name="leadership-list"),
    path("mass-schedule/", MassScheduleListView.as_view(), name="mass-schedule"),
    path("statistics/", StatisticListView.as_view(), name="statistics-list"),
    path("saints/", SaintListView.as_view(), name="saints-list"),
]