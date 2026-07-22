from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now

from cloudinary.models import CloudinaryField
from .managers import CustomUserManager


class CustomUser(AbstractUser):

    class Roles(models.TextChoices):
        SUPER_ADMIN = "SUPER_ADMIN", "Super Admin"
        PARISH_PRIEST = "PARISH_PRIEST", "Parish Priest"
        ASSISTANT_PRIEST = "ASSISTANT_PRIEST", "Assistant Priest"
        SECRETARY = "SECRETARY", "Secretary"
        FINANCE = "FINANCE", "Finance Officer"
        MINISTRY_LEADER = "MINISTRY_LEADER", "Ministry Leader"
        CATECHIST = "CATECHIST", "Catechist"
        MEMBER = "MEMBER", "Member"
        VISITOR = "VISITOR", "Visitor"

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    profile_picture = CloudinaryField(
        "profile_picture",
        folder="profiles",
        blank=True,
        null=True,
        transformation={
            "width": 400,
            "height": 400,
            "crop": "fill",
            "gravity": "face",
            "quality": "auto",
            "fetch_format": "auto"
        }
    )

    is_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=30, choices=Roles.choices, default=Roles.MEMBER)
    date_joined = models.DateTimeField(default=now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        ordering = ["first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    # Optional: Helper property for optimized URL
    @property
    def profile_picture_url(self):
        if self.profile_picture and self.profile_picture.public_id:
            from cloudinary.utils import cloudinary_url
            return cloudinary_url(
                self.profile_picture.public_id,
                width=400,
                height=400,
                crop="fill",
                gravity="face",
                quality="auto",
                fetch_format="auto"
            )[0]
        return None