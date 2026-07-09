from django.conf import settings
from django.core.mail import send_mail


def send_welcome_email(user):

    send_mail(
        subject="Welcome to St. Michael Madende Catholic Parish",
        message=f"""
Dear {user.first_name},

Welcome to St. Michael Madende Catholic Parish.

Your account has been created successfully.

God Bless You.
        """,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


def send_verification_email(user, verification_link):

    send_mail(
        subject="Verify your Email",
        message=f"""
Hello {user.first_name},

Thank you for registering.

Please verify your email using the link below.

{verification_link}

God Bless You.
        """,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


def send_reset_password_email(user, reset_link):

    send_mail(
        subject="Password Reset",
        message=f"""
Hello {user.first_name},

Click the link below to reset your password.

{reset_link}

If you did not request this, ignore this email.
        """,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )
