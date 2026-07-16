from django.contrib.auth import get_user_model
from django.test import TestCase

from prayers.models import PrayerCategory
from prayers.services import PrayerService

User = get_user_model()


class PrayerServiceTest(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            email="admin@test.com",
            username="admin",
            password="password123",
        )

        self.category = PrayerCategory.objects.create(
            name="Healing"
        )

    def test_create_prayer(self):

        prayer = PrayerService.create_prayer(
            {
                "title": "Healing",
                "description": "Pray for my family.",
                "requester": self.user,
                "category": self.category,
            }
        )

        self.assertEqual(
            prayer.title,
            "Healing",
        )