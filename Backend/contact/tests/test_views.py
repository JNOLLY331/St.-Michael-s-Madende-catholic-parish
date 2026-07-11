from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from contact.models import ContactDepartment


class ContactViewTest(APITestCase):
    """Integration test suite verifying contact application API endpoints."""

    def setUp(self) -> None:
        """Sets up baseline environment and database records before each test runs."""
        self.department = ContactDepartment.objects.create(
            name="Office",
            email="office@test.com",
        )

    def test_submit_message(self) -> None:
        """Verifies that public users can successfully post contact messages."""
        payload = {
            "department": self.department.id,
            "full_name": "John Doe",
            "email": "john@test.com",
            "subject": "Question Regarding Services",
            "message": "Hello, I need some help regarding your hours.",
        }
        
        response = self.client.post(
            reverse("contact:contact-message-list"),
            data=payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_department_list(self) -> None:
        """Verifies that the active departments endpoint is publicly accessible."""
        response = self.client.get(reverse("contact:contact-department-list"))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)