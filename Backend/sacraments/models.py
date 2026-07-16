"""
Enterprise models for the Sacraments application.
"""

from __future__ import annotations
import uuid
from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from core.models import BaseModel
from sacraments.managers import (
    SacramentManager,
    SacramentRequirementManager,
    SacramentApplicationManager,
)
from sacraments.validators import (
    validate_applicant_name,
    validate_attachment,
    validate_contact_email,
    validate_message,
    validate_phone_number,
)

<<<<<<< HEAD

# ── The Seven Catholic Sacraments ─────────────────────────────────────────────
class SacramentType(models.TextChoices):
    BAPTISM            = "BAPTISM",            "Baptism"
    CONFIRMATION       = "CONFIRMATION",       "Confirmation"
    EUCHARIST          = "EUCHARIST",          "Holy Eucharist"
    RECONCILIATION     = "RECONCILIATION",     "Reconciliation (Confession)"
    ANOINTING_OF_SICK  = "ANOINTING_OF_SICK",  "Anointing of the Sick"
    HOLY_ORDERS        = "HOLY_ORDERS",        "Holy Orders"
    MATRIMONY          = "MATRIMONY",          "Matrimony (Marriage)"


class ApplicationStatus(models.TextChoices):
    PENDING      = "PENDING",      "Pending"
    UNDER_REVIEW = "UNDER_REVIEW", "Under Review"
    APPROVED     = "APPROVED",     "Approved"
    REJECTED     = "REJECTED",     "Rejected"
    COMPLETED    = "COMPLETED",    "Completed"
    CANCELLED    = "CANCELLED",    "Cancelled"


class Sacrament(BaseModel):
    id   = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # ── Selectable sacrament type (the 7 sacraments) ─────────────────────────
    sacrament_type = models.CharField(
        max_length=30,
        choices=SacramentType.choices,
        unique=True,
        help_text="Select one of the seven Catholic sacraments.",
    )

    # ── Display name (auto-filled from sacrament_type if left blank) ──────────
    name = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        help_text="Human-readable name. Auto-filled from the sacrament type if left blank.",
    )
    slug                = models.SlugField(max_length=120, unique=True, blank=True)
    short_description   = models.CharField(max_length=255, blank=True)
    description         = models.TextField(blank=True)
    icon                = models.CharField(max_length=100, blank=True)
    banner              = models.ImageField(upload_to="sacraments/banners/", blank=True, null=True)
    preparation_duration = models.CharField(max_length=100, blank=True)
    minimum_age         = models.PositiveIntegerField(default=0)
    requires_booking    = models.BooleanField(default=True)
    requires_documents  = models.BooleanField(default=False)
    display_order       = models.PositiveIntegerField(default=0)
    is_active           = models.BooleanField(default=True)
    objects             = SacramentManager()

    class Meta:
        ordering = ("display_order", "name")

    def __str__(self):
        return self.name or self.get_sacrament_type_display()

    def save(self, *a, **kw):
        # Auto-fill name from the human-readable sacrament type label
        if not self.name and self.sacrament_type:
            self.name = self.get_sacrament_type_display()
        # Auto-generate slug
        if not self.slug and self.name:
            self.slug = slugify(self.name)
        super().save(*a, **kw)

    def get_absolute_url(self):
        return reverse("sacraments:sacrament-detail", kwargs={"pk": self.pk})


class SacramentRequirement(BaseModel):
    id        = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sacrament = models.ForeignKey(Sacrament, on_delete=models.CASCADE, related_name="requirements")
    title     = models.CharField(max_length=200)
    description   = models.TextField(blank=True)
    required      = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    objects       = SacramentRequirementManager()

    class Meta:
        ordering = ("display_order", "title")

    def __str__(self):
        return f"{self.sacrament.name} - {self.title}"


class SacramentApplication(BaseModel):
    id        = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference = models.CharField(max_length=25, unique=True, editable=False)
    sacrament = models.ForeignKey(Sacrament, on_delete=models.PROTECT, related_name="applications")
    applicant_name = models.CharField(max_length=150, validators=[validate_applicant_name])
    email          = models.EmailField(validators=[validate_contact_email])
    phone          = models.CharField(max_length=30, validators=[validate_phone_number], blank=True)
    date_of_birth  = models.DateField()
    preferred_date = models.DateField()
    message        = models.TextField(blank=True, validators=[validate_message])
    attachment     = models.FileField(
        upload_to="sacraments/applications/", blank=True, null=True,
        validators=[validate_attachment],
    )
    status         = models.CharField(
        max_length=20, choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING,
    )
    approved_by    = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="approved_sacrament_applications",
    )
    approved_at      = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)
    objects          = SacramentApplicationManager()

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.reference} - {self.applicant_name}"

    def save(self, *a, **kw):
        if not self.reference:
            self.reference = "SAC-" + uuid.uuid4().hex[:10].upper()
        super().save(*a, **kw)

    def get_absolute_url(self):
        return reverse("sacraments:application-detail", kwargs={"pk": self.pk})
=======
class ApplicationStatus(models.TextChoices):
    PENDING="PENDING","Pending"
    UNDER_REVIEW="UNDER_REVIEW","Under Review"
    APPROVED="APPROVED","Approved"
    REJECTED="REJECTED","Rejected"
    COMPLETED="COMPLETED","Completed"
    CANCELLED="CANCELLED","Cancelled"

class Sacrament(BaseModel):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=100,unique=True)
    slug=models.SlugField(max_length=120,unique=True,blank=True)
    short_description=models.CharField(max_length=255,blank=True)
    description=models.TextField(blank=True)
    icon=models.CharField(max_length=100,blank=True)
    banner=models.ImageField(upload_to="sacraments/banners/",blank=True,null=True)
    preparation_duration=models.CharField(max_length=100,blank=True)
    minimum_age=models.PositiveIntegerField(default=0)
    requires_booking=models.BooleanField(default=True)
    requires_documents=models.BooleanField(default=False)
    display_order=models.PositiveIntegerField(default=0)
    is_active=models.BooleanField(default=True)
    objects=SacramentManager()
    class Meta:
        ordering=("display_order","name")
    def __str__(self): return self.name
    def save(self,*a,**kw):
        if not self.slug: self.slug=slugify(self.name)
        super().save(*a,**kw)
    def get_absolute_url(self):
        return reverse("sacraments:sacrament-detail",kwargs={"pk":self.pk})

class SacramentRequirement(BaseModel):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    sacrament=models.ForeignKey(Sacrament,on_delete=models.CASCADE,related_name="requirements")
    title=models.CharField(max_length=200)
    description=models.TextField(blank=True)
    required=models.BooleanField(default=True)
    display_order=models.PositiveIntegerField(default=0)
    objects=SacramentRequirementManager()
    class Meta:
        ordering=("display_order","title")
    def __str__(self):
        return f"{self.sacrament.name} - {self.title}"

class SacramentApplication(BaseModel):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    reference=models.CharField(max_length=25,unique=True,editable=False)
    sacrament=models.ForeignKey(Sacrament,on_delete=models.PROTECT,related_name="applications")
    applicant_name=models.CharField(max_length=150,validators=[validate_applicant_name])
    email=models.EmailField(validators=[validate_contact_email])
    phone=models.CharField(max_length=30,validators=[validate_phone_number],blank=True)
    date_of_birth=models.DateField()
    preferred_date=models.DateField()
    message=models.TextField(blank=True,validators=[validate_message])
    attachment=models.FileField(upload_to="sacraments/applications/",blank=True,null=True,validators=[validate_attachment])
    status=models.CharField(max_length=20,choices=ApplicationStatus.choices,default=ApplicationStatus.PENDING)
    approved_by=models.ForeignKey(settings.AUTH_USER_MODEL,null=True,blank=True,on_delete=models.SET_NULL,related_name="approved_sacrament_applications")
    approved_at=models.DateTimeField(null=True,blank=True)
    rejection_reason=models.TextField(blank=True)
    objects=SacramentApplicationManager()
    class Meta:
        ordering=("-created_at",)
    def __str__(self):
        return f"{self.reference} - {self.applicant_name}"
    def save(self,*a,**kw):
        if not self.reference:
            self.reference="SAC-"+uuid.uuid4().hex[:10].upper()
        super().save(*a,**kw)
    def get_absolute_url(self):
        return reverse("sacraments:application-detail",kwargs={"pk":self.pk})
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
