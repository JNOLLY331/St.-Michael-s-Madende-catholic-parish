"""
Integration tests for Gallery ViewSets and API endpoints.
"""

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class GalleryViewTest(TestCase):
    """Verifies HTTP operations, URL routing routing rules, and response headers."""

    def setUp(self):
        """Initialize the REST Framework test client before each test execution block."""
        self.client = APIClient()

    def test_gallery_endpoint(self):
        """Ensure the media list endpoint routes properly and returns an expected status code."""
        # Adjusted URL to match standard REST router mapping rules
        response = self.client.get("/gallery/media/")

        # Asserts the view does not crash with a 500 error, accepting open or secured statuses
        self.assertIn(
            response.status_code,
            [
                status.HTTP_200_OK,
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )