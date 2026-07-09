"""
Tests for News models.
"""

from django.contrib.auth import get_user_model
from django.test import TestCase

from church.models import ParishInformation
from news.models import News, NewsCategory

User = get_user_model()


class NewsModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="password123",
        )

        self.parish = ParishInformation.objects.create(
            parish_name="St. Michael",
            history="History",
            mission="Mission",
            vision="Vision",
            address="Address",
            phone="0700000000",
            email="parish@test.com",
            logo="logo.png",
            about_image="about.png",
        )

        self.category = NewsCategory.objects.create(
            name="Announcements"
        )

    def test_news_creation(self):
        news = News.objects.create(
            title="Sunday Mass",
            excerpt="Short summary for the parish.",
            content="Content " * 100,
            parish=self.parish,
            category=self.category,
            author=self.user,
        )

        self.assertEqual(news.title, "Sunday Mass")
        self.assertIsNotNone(news.slug)