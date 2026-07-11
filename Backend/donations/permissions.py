from rest_framework.permissions import BasePermission


class IsFinanceManager(BasePermission):
    """
    Permission for finance committee members.
    """

    message = (
        "Only finance administrators can perform this action."
    )
    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and (
                request.user.is_staff
                or request.user.is_superuser
            )
        )