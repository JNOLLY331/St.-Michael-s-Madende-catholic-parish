"""
Serializer tests.
"""

from django.test import TestCase

from news.serializers import NewsCreateUpdateSerializer


class NewsSerializerTest(TestCase):

    def test_invalid_title(self):

        serializer = NewsCreateUpdateSerializer(
            data={
                "title": "ABC",
            }
        )

        self.assertFalse(serializer.is_valid())