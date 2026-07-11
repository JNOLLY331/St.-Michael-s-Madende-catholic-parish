"""Database model integrity unit tests for the Sacraments application."""

from datetime import date
from django.contrib.auth import get_user_model
from django.test import TestCase

from sacraments.models import Sacrament, SacramentApplication, SacramentRequirement

User = get_user_model()


class SacramentModelTest(TestCase):
    """Unit tests validating database-level behaviors for Sacraments."""

    def setUp(self) -> None:
        """Sets up baseline environment and records before each test runs."""
        self.sacrament = Sacrament.objects.create(
            name="Baptism",
            short_description="Infant Baptism",
        )

    def test_slug_created(self) -> None:
        """Verifies that an automated slugification routine populates the slug field."""
        self.assertEqual(self.sacrament.slug, "baptism")

    def test_string_representation(self) -> None:
        """Verifies that the object __str__ method returns the sacrament name."""
        self.assertEqual(str(self.sacrament), "Baptism")


class SacramentRequirementModelTest(TestCase):
    """Unit tests validating database-level behaviors for Sacrament requirements."""

    def setUp(self) -> None:
        """Sets up parent sacrament and dependent prerequisite criteria instances."""
        self.sacrament = Sacrament.objects.create(
            name="Confirmation",
        )
        self.requirement = SacramentRequirement.objects.create(
            sacrament=self.sacrament,
            title="Birth Certificate",
        )

    def test_str(self) -> None:
        """Verifies string serialization displays human-readable tracking info."""
        self.assertIn("Birth Certificate", str(self.requirement))


class SacramentApplicationModelTest(TestCase):
    """Unit tests validating database-level behaviors for Sacrament user applications."""

    def setUp(self) -> None:
        """Sets up a complete user intake form payload structure."""
        self.sacrament = Sacrament.objects.create(
            name="Marriage",
        )
        self.application = SacramentApplication.objects.create(
            sacrament=self.sacrament,
            applicant_name="John Doe",
            email="john@example.com",
            phone="+254700000000",
            date_of_birth=date(1995, 1, 1),
            preferred_date=date.today(),
            message="Hello parish, I need some help regarding schedules.",
        )

    def test_reference_generated(self) -> None:
        """Verifies unique reference ticketing masks are generated upon creation."""
        self.assertTrue(self.application.reference.startswith("SAC-"))

    def test_default_status(self) -> None:
        """Verifies workflow records instantiate with a baseline PENDING status state."""
        # Aligning explicitly with the database manager uppercase string status rules
        self.assertEqual(self.application.status, "PENDING")