from django.urls import include, path
from rest_framework.routers import DefaultRouter

from contact.views import (
    ContactDepartmentViewSet,
    ContactMessageViewSet,
    FAQViewSet,
)

app_name = "contact"

router = DefaultRouter()

router.register(
    r"departments",
    ContactDepartmentViewSet,
    basename="contact-department",
)

router.register(
    r"messages",
    ContactMessageViewSet,
    basename="contact-message",
)

router.register(
    r"faqs",
    FAQViewSet,
    basename="contact-faq",
)

urlpatterns = [
    path("", include(router.urls)),
]