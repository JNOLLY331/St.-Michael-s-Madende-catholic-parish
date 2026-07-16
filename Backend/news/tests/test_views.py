"""
API tests.
"""

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
User = get_user_model()


class NewsViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin",
            email="admin@test.com",
            password="password123",
        )

    def test_news_list(self):

        response = self.client.get(
            "/api/news/articles/"
        )

        self.assertEqual(
            response.status_code,
            200,
        )