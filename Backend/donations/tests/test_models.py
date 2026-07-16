from django.test import TestCase

from donations.models import DonationCategory


class DonationCategoryModelTest(TestCase):

    def test_category_creation(self):

        category = DonationCategory.objects.create(
            name="Tithe"
        )

        self.assertEqual(
            str(category),
            "Tithe",
        )