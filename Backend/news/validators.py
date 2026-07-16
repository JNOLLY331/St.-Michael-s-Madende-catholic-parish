"""
Validators used by the News application.
"""

import os

from django.core.exceptions import ValidationError


IMAGE_EXTENSIONS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
)

DOCUMENT_EXTENSIONS = (
    ".pdf",
)

MAX_IMAGE_SIZE = 5 * 1024 * 1024
MAX_DOCUMENT_SIZE = 20 * 1024 * 1024


def validate_featured_image(image):
    """
    Validate uploaded featured image.
    """

    if not image:
        return

    extension = os.path.splitext(
        image.name
    )[1].lower()

    if extension not in IMAGE_EXTENSIONS:
        raise ValidationError(
            (
                "Unsupported image format. "
                "Allowed formats: JPG, JPEG, PNG, GIF and WEBP."
            )
        )

    if image.size > MAX_IMAGE_SIZE:
        raise ValidationError(
            "Image size cannot exceed 5 MB."
        )


def validate_thumbnail(image):
    """
    Validate uploaded thumbnail.
    """

    validate_featured_image(image)


def validate_attachment(file):
    """
    Validate document attachment.
    """

    if not file:
        return

    extension = os.path.splitext(
        file.name
    )[1].lower()

    if extension not in DOCUMENT_EXTENSIONS:
        raise ValidationError(
            "Only PDF documents are allowed."
        )

    if file.size > MAX_DOCUMENT_SIZE:
        raise ValidationError(
            "Attachment size cannot exceed 20 MB."
        )


def validate_publish_dates(
    published_at,
    expires_at,
):
    """
    Validate publication and expiry dates.
    """

    if (
        published_at
        and expires_at
        and expires_at <= published_at
    ):
        raise ValidationError(
            "Expiry date must be later than publication date."
        )


def validate_title(title):
    """
    Validate article title.
    """

    if len(title.strip()) < 5:
        raise ValidationError(
            "Title must contain at least 5 characters."
        )


def validate_excerpt(excerpt):
    """
    Validate excerpt.
    """

    if len(excerpt.strip()) < 20:
        raise ValidationError(
            "Excerpt must contain at least 20 characters."
        )


def validate_content(content):
    """
    Validate article content.
    """

    if len(content.strip()) < 100:
        raise ValidationError(
            "Content must contain at least 100 characters."
        )