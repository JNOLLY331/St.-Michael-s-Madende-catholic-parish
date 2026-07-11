from django.contrib.auth import get_user_model
from django.test import TestCase

from donations.models import (
    Donation,
    DonationCategory,
)
from donations.services import DonationService

User = get_user_model()


class DonationServiceTest(TestCase):

    def test_service_exists(self):

        self.assertTrue(
            hasattr(
                DonationService,
                "create_donation",
            )
        )