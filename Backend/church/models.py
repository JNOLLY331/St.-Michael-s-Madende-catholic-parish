from django.db import models

class ParishInformation(models.Model):
        parish_name = models.CharField(max_length=200)
        motto = models.CharField(max_length=255, blank=True)
        history = models.TextField()
        mission = models.TextField()
        vision = models.TextField()
        address = models.CharField(max_length=255)
        phone = models.CharField(max_length=30)
        alternative_phone = models.CharField(max_length=30, blank=True)
        email = models.EmailField()
        website = models.URLField(blank=True)
        facebook = models.URLField(blank=True)
        youtube = models.URLField(blank=True)
        instagram = models.URLField(blank=True)
        twitter = models.URLField(blank=True)
        logo = models.ImageField(upload_to="church/logo/")
        about_image = models.ImageField(upload_to="church/about/")
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        class Meta:
            verbose_name = "Parish Information"
            verbose_name_plural = "Parish Information"

        def __str__(self):
            return self.parish_name
        
    
    
class HeroSection(models.Model):
        title = models.CharField(max_length=255)
        subtitle = models.TextField()
        background_image = models.ImageField(
            upload_to="church/hero/"
        )
        primary_button_text = models.CharField(max_length=100)
        primary_button_link = models.CharField(max_length=200)
        secondary_button_text = models.CharField(max_length=100)
        secondary_button_link = models.CharField(max_length=200)
        is_active = models.BooleanField(default=True)
        def __str__(self):
            return self.title
        
        
class Leadership(models.Model):
        name = models.CharField(max_length=150)
        position = models.CharField(max_length=100)
        photo = models.ImageField(
            upload_to="church/leadership/"
        )
        email = models.EmailField(blank=True)
        phone = models.CharField(max_length=30, blank=True)
        message = models.TextField(blank=True)
        display_order = models.PositiveIntegerField(default=1)
        is_active = models.BooleanField(default=True)
        def __str__(self):
            return f"{self.position} - {self.name}"
        
        
        
class MassSchedule(models.Model):
        DAYS = [
            ("Monday", "Monday"),
            ("Tuesday", "Tuesday"),
            ("Wednesday", "Wednesday"),
            ("Thursday", "Thursday"),
            ("Friday", "Friday"),
            ("Saturday", "Saturday"),
            ("Sunday", "Sunday"),
        ]
        day = models.CharField(max_length=20, choices=DAYS)
        service_name = models.CharField(max_length=100)
        language = models.CharField(max_length=50)
        start_time = models.TimeField()
        end_time = models.TimeField()
        notes = models.TextField(blank=True)
        display_order = models.PositiveIntegerField(default=1)
        is_active = models.BooleanField(default=True)
        def __str__(self):
            return f"{self.day} - {self.service_name}"
        
        
class Statistic(models.Model):
        title = models.CharField(max_length=100)
        value = models.PositiveIntegerField()
        icon = models.CharField(max_length=100)
        display_order = models.PositiveIntegerField(default=1)
        is_active = models.BooleanField(default=True)
        def __str__(self):
            return self.title
        
        
class Saint(models.Model):
        name = models.CharField(max_length=100)
        feast_day = models.DateField()
        image = models.ImageField(
            upload_to="church/saints/" )
        quote = models.TextField(blank=True)
        display_order = models.PositiveIntegerField(default=1)
        is_active = models.BooleanField(default=True)
        def __str__(self):
            return self.name
                
            
            
            
        