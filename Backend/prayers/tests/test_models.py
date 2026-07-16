from django.contrib.auth import get_user_model
from django.test import TestCase

from prayers.models import PrayerCategory, PrayerRequest

User = get_user_model()


class PrayerModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="user@test.com",
            username="user",
            password="password123",
        )

        self.category = PrayerCategory.objects.create(
            name="Healing"
        )

    def test_create_prayer(self):
        prayer = PrayerRequest.objects.create(
            title="Healing Prayer",
            description="Please pray for my recovery.",
            requester=self.user,
            category=self.category,
        )

        self.assertEqual(
            prayer.title,
            "Healing Prayer",
        )