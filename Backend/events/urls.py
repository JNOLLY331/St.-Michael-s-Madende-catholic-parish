from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CalendarView, EventRegistrationViewSet, EventViewSet

app_name = "events"

router = DefaultRouter()
# Changed prefix from r"events" to r"" so your endpoints sit at /api/events/ directly
router.register(r"", EventViewSet, basename="event")
router.register(r"registrations", EventRegistrationViewSet, basename="registration")

urlpatterns = [
    path("", include(router.urls)),
    path("calendar/", CalendarView.as_view(), name="calendar"),
]
