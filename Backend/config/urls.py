from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Administration System
    path("admin/", admin.site.urls),
    # Core Application APIs
    path("api/church/", include("church.urls")),
    path("api/accounts/", include("accounts.urls")),
    path("api/ministries/", include("ministries.urls")),  # Registered ministries app
    path("api/events/", include("events.urls")),  # Registered events app
    path("api/news/", include("news.urls")),    # Registered news app
    path("api/prayers/", include("prayers.urls")),    # Registered prayers app
    path("api/donations/", include("donations.urls")), # Registered prayers app
    path("api/gallery/", include("gallery.urls")),  # Registered gallery app
    path("api/contact/", include("contact.urls")), # Registered contact app

    # OpenAPI 3.0 Documentation Schema Engine
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]

# Development Media Files Server
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
