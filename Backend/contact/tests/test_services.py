from typing import Any
from unittest.mock import patch
from django.test import TestCase

from contact.models import ContactDepartment
from contact.services.contact_service import ContactService


class ContactServiceTest(TestCase):
    """Unit test suite verifying service layer business logic operations."""

    def setUp(self) -> None:
        """Sets up baseline environment and database records before each test runs."""
        self.department = ContactDepartment.objects.create(
            name="Office",
            email="office@test.com",
        )

    @patch("contact.services.email_service.ContactEmailService.send_confirmation")
    def test_create_message(self, mock_send_confirmation: Any) -> None:
        """Verifies that the service creates a message with proper validation lengths."""
        message = ContactService.create_message(
            department=self.department,
            full_name="John Doe",
            email="john@test.com",
            subject="Question Regarding Services",
            message="Hello parish, I need some help regarding schedules.",
        )

        self.assertEqual(message.full_name, "John Doe")
        # Confirms the service layer automatically fired off the receipt email flow
        mock_send_confirmation.assert_called_once_with(message)