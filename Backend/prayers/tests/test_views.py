from django.test import TestCase
from rest_framework.test import APIClient


class PrayerViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_prayer_list(self):

        response = self.client.get(
            "/api/prayers/"
        )

        self.assertEqual(
            response.status_code,
            200,
        )