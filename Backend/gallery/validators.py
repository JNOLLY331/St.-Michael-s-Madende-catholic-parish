"""
Gallery file validation utilities.
"""

from pathlib import Path
from django.core.exceptions import ValidationError

ALLOWED_IMAGE_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
}

ALLOWED_VIDEO_EXTENSIONS = {
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
}

MAX_IMAGE_SIZE = 10 * 1024 * 1024   # 10MB
MAX_VIDEO_SIZE = 500 * 1024 * 1024  # 500MB


def validate_media_file(file, media_type: str) -> None:
    """Validate uploaded gallery file extensions and byte sizes against system thresholds."""
    if not file.name:
        raise ValidationError("Uploaded file is missing a valid filename.")

    extension = Path(file.name).suffix.lower().replace(".", "")

    if media_type == "IMAGE":
        if extension not in ALLOWED_IMAGE_EXTENSIONS:
            raise ValidationError(f"Unsupported image format: .{extension}")

        if file.size > MAX_IMAGE_SIZE:
            raise ValidationError("Image size exceeds the permitted 10MB limit.")

    elif media_type == "VIDEO":
        if extension not in ALLOWED_VIDEO_EXTENSIONS:
            raise ValidationError(f"Unsupported video format: .{extension}")

        if file.size > MAX_VIDEO_SIZE:
            raise ValidationError("Video size exceeds the permitted 500MB limit.")

    else:
        raise ValidationError("Invalid media type designation specified.")