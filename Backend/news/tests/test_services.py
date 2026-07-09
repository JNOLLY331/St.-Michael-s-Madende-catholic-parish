"""
Service layer tests.
"""

from django.contrib.auth import get_user_model
from django.test import TestCase

from church.models import ParishInformation
from news.models import NewsCategory
from news.services import NewsService

User = get_user_model()


class NewsServiceTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            password="password123",
        )

        self.parish = ParishInformation.objects.create(
            parish_name="St Michael",
            history="History",
            mission="Mission",
            vision="Vision",
            address="Address",
            phone="0700000000",
            email="test@test.com",
            logo="logo.png",
            about_image="about.png",
        )

        self.category = NewsCategory.objects.create(
            name="General"
        )

    def test_create_news(self):

        article = NewsService.create_news(
            {
                "title": "Test News",
                "excerpt": "Example excerpt for testing.",
                "content": "Content " * 100,
                "author": self.user,
                "category": self.category,
                "parish": self.parish,
            }
        )

        self.assertEqual(article.title, "Test News")