from django.test import TestCase

from prayers.serializers import PrayerCreateUpdateSerializer


class PrayerSerializerTest(TestCase):

    def test_serializer_valid(self):

        serializer = PrayerCreateUpdateSerializer(
            data={
                "title": "Prayer",
                "description": "Please pray for my family during this difficult season.",
            }
        )

        self.assertTrue(serializer.is_valid())