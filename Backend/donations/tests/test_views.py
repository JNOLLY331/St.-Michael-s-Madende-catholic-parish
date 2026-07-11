from django.test import TestCase
from rest_framework.test import APIClient


class DonationViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
    def test_endpoint_exists(self):
        response = self.client.get(
            "/api/donations/"
        )

        self.assertIn(
            response.status_code,
            [
                200,
                401,
                403,
            ],
        )