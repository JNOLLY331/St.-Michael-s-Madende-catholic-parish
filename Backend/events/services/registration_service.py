"""
Business logic for event registrations.
"""

from django.db import transaction

from events.models import Event, EventRegistration


class RegistrationService:
    """
    Handles attendee registration and cancellation.
    """

    @staticmethod
    @transaction.atomic
    def register(member, event: Event) -> EventRegistration:
        """
        Register a member for an event if they aren't already registered
        and the event has remaining capacity.
        """
        if EventRegistration.objects.filter(member=member, event=event).exists():
            raise ValueError("You are already registered.")

        if event.is_full:
            raise ValueError("This event is already full.")

        registration = EventRegistration.objects.create(
            member=member,
            event=event,
        )

        event.registered_count += 1
        event.save(update_fields=["registered_count"])

        return registration

    @staticmethod
    @transaction.atomic
    def cancel(member, event: Event) -> None:
        """
        Cancel a member's event registration and free up their slot.
        """
        try:
            registration = EventRegistration.objects.get(member=member, event=event)
        except EventRegistration.DoesNotExist:
            raise ValueError("No active registration found for this event.")

        registration.delete()

        event.registered_count -= 1
        event.save(update_fields=["registered_count"])
