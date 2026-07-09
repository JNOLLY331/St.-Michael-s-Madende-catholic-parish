"""
Tests for EventService.
"""

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from events.models import Event
from events.services import EventService

User = get_user_model()


class EventServiceTest(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="Password123!",
        )

    def test_publish(self):

        event = Event.objects.create(
            title="Youth Day",
            description="Youth Day",
            venue="Church",
            organizer=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date(),
            start_time="09:00",
            end_time="12:00",
        )

        EventService.publish_event(event)

        event.refresh_from_db()

        self.assertTrue(event.is_published)
