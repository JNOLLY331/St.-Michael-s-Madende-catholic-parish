from django.conf import settings
from django.core.mail import send_mail


class ContactEmailService:

    @staticmethod
    def send_confirmation(message):

        send_mail(
            subject="We have received your message",
            message=(
                f"Dear {message.full_name},\n\n"
                "Thank you for contacting us.\n"
                f"Reference: {message.reference}\n\n"
                "We shall respond shortly."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[message.email],
            fail_silently=True,
        )

    @staticmethod
    def send_reply(message):

        send_mail(
            subject=f"Re: {message.subject}",
            message=message.response,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[message.email],
            fail_silently=True,
        )