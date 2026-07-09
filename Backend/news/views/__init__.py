"""
Views for the News application.
"""

from .news import NewsViewSet
from .category import NewsCategoryViewSet

__all__ = [
    "NewsViewSet",
    "NewsCategoryViewSet",
]