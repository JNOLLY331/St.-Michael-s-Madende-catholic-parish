"""
Tests for Event models.
"""

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from events.models import Event

User = get_user_model()


class EventModelTest(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="Password123!",
        )

    def test_create_event(self):

        event = Event.objects.create(
            title="Youth Conference",
            description="Annual Youth Conference",
            venue="Parish Hall",
            organizer=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date(),
            start_time="10:00",
            end_time="14:00",
            capacity=200,
        )

        self.assertEqual(
            event.title,
            "Youth Conference",
        )

    def test_available_slots(self):

        event = Event.objects.create(
            title="Conference",
            description="Conference",
            venue="Hall",
            organizer=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date(),
            start_time="08:00",
            end_time="12:00",
            capacity=100,
            registered_count=20,
        )

        self.assertEqual(
            event.available_slots,
            80,
        )
