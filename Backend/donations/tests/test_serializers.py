from django.test import TestCase

from donations.serializers import (
    DonationCreateUpdateSerializer,
)


class DonationSerializerTest(TestCase):

    def test_invalid_amount(self):

        serializer = DonationCreateUpdateSerializer(
            data={
                "amount": -100,
            }
        )

        self.assertFalse(
            serializer.is_valid()
        )