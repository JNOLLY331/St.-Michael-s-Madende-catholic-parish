from django.test import TestCase
from contact.models import ContactDepartment, ContactMessage, FAQ


class ContactDepartmentModelTest(TestCase):
    """Unit tests validating database-level behaviors for ContactDepartment."""

    def test_create_department(self) -> None:
        """Verifies department fields persist and slugify routines execute properly."""
        department = ContactDepartment.objects.create(
            name="Parish Office",
            email="office@test.com",
        )

        self.assertEqual(department.name, "Parish Office")
        self.assertTrue(department.slug)


class FAQModelTest(TestCase):
    """Unit tests validating database-level behaviors for FAQs."""

    def test_create_faq(self) -> None:
        """Verifies text field string rendering paths work correctly."""
        faq = FAQ.objects.create(
            question="What are the current Mass Times?",
            answer="Our main service is held on Sunday at 8:00 AM.",
        )

        self.assertEqual(str(faq), "What are the current Mass Times?")


class ContactMessageModelTest(TestCase):
    """Unit tests validating database-level behaviors for ContactMessage."""

    def setUp(self) -> None:
        """Sets up a baseline target department before each message test runs."""
        self.department = ContactDepartment.objects.create(
            name="Office",
            email="office@test.com",
        )

    def test_create_message(self) -> None:
        """Verifies auto-generated reference tokens and relational fields align."""
        message = ContactMessage.objects.create(
            department=self.department,
            full_name="John Doe",
            email="john@test.com",
            subject="Question Regarding Services",
            message="Hello parish, I need some help regarding schedules.",
        )

        self.assertTrue(message.reference)
        self.assertEqual(message.department, self.department)