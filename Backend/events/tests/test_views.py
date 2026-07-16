"""
View tests.
"""

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class EventApiTest(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="Password123!",
        )

    def test_list_events(self):

        response = self.client.get("/api/events/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
