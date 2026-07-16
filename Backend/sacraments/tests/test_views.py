"""Integration unit tests targeting public viewset endpoint routing layers."""

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from sacraments.models import Sacrament


class SacramentViewTest(APITestCase):
    """End-to-end integration tests validating endpoints under SacramentViewSet."""

    def setUp(self) -> None:
        """Sets up mock records before executing each API request routine."""
        Sacrament.objects.create(
            name="Baptism",
        )

    def test_list_sacraments(self) -> None:
        """Verifies public GET requests against the listing path yield a 200 OK status."""
        url = reverse("sacraments:sacrament-list")

        response = self.client.get(url)

        # Asserts request successfully traversed the pipeline
        self.assertEqual(response.status_code, status.HTTP_200_OK)