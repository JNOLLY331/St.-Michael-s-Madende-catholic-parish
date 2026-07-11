"""Unit tests validating serializers belonging to the Sacraments application."""

from datetime import date
from django.test import TestCase

from sacraments.models import Sacrament
from sacraments.serializers import SacramentApplicationSerializer


class SacramentSerializerTest(TestCase):
    """Unit test suite verifying input validation parameters on application intake forms."""

    def setUp(self) -> None:
        """Sets up baseline parent records before each serializer test runs."""
        self.sacrament = Sacrament.objects.create(
            name="Holy Orders",
        )

    def test_application_serializer(self) -> None:
        """Verifies that the serializer evaluates compliant intake data payloads as valid."""
        payload = {
            "sacrament": self.sacrament.id,
            "applicant_name": "Peter Pan",
            "email": "peter@test.com",
            "phone": "+254711111111",
            "date_of_birth": date(1990, 1, 1),
            "preferred_date": date.today(),
            "message": "Hello parish, I need some help regarding schedules.",
        }

        serializer = SacramentApplicationSerializer(data=payload)

        # Triggers internal clean fields validation routines
        self.assertTrue(serializer.is_valid(), serializer.errors)