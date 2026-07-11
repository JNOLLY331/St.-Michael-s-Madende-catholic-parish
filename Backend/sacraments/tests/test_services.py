"""Integration unit tests targeting service layer orchestration for sacraments."""

from datetime import date
from django.test import TestCase

from sacraments.models import Sacrament
from sacraments.services.sacrament_service import SacramentService


class SacramentServiceTest(TestCase):
    """Integration tests verifying core business logic flows in SacramentService."""

    def setUp(self) -> None:
        """Sets up baseline parent records before each service workflow test runs."""
        self.sacrament = Sacrament.objects.create(
            name="Baptism",
        )

    def test_create_application(self) -> None:
        """Verifies service workflows successfully construct and initialize application entries."""
        application = SacramentService.create_application(
            sacrament=self.sacrament,
            applicant_name="John Doe",
            email="john@test.com",
            phone="+254700000000",
            date_of_birth=date(2000, 1, 1),
            preferred_date=date.today(),
            message="Hello parish, I need some help regarding schedules.",
        )

        # Asserts workflow defaults initialize with an uppercase PENDING string state
        self.assertEqual(application.status, "PENDING")