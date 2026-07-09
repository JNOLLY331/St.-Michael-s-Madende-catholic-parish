"""
Serializer tests.
"""

from django.test import TestCase

from events.serializers import EventCreateUpdateSerializer


class EventSerializerTest(TestCase):
    def test_invalid_capacity(self):
        serializer = EventCreateUpdateSerializer(
            data={
                "title": "Conference",
                "capacity": -5,
            }
        )
        self.assertFalse(serializer.is_valid())
