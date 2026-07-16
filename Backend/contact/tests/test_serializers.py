from django.test import TestCase
from contact.models import ContactDepartment
from contact.serializers import ContactMessageSerializer


class ContactSerializerTest(TestCase):
    """Unit test suite verifying serializer validation behavior."""

    def setUp(self) -> None:
        """Sets up baseline environment and database records before each test runs."""
        self.department = ContactDepartment.objects.create(
            name="Office",
            email="office@test.com",
        )

    def test_serializer_valid(self) -> None:
        """Verifies that the serializer passes validation when given compliant payload data."""
        payload = {
            "department": self.department.id,
            "full_name": "John Doe",
            "email": "john@test.com",
            "subject": "Question Regarding Services",
            "message": "Hello parish, I need some help regarding schedules.",
        }

        serializer = ContactMessageSerializer(data=payload)
        
        # Evaluates constraints and displays error logs if validation fails
        self.assertTrue(serializer.is_valid(), serializer.errors)