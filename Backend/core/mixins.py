from rest_framework.permissions import IsAuthenticated


class AuthenticatedMixin:
    permission_classes = [
        IsAuthenticated,
    ]
