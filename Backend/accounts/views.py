from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (ChangePasswordSerializer, ForgotPasswordSerializer,
                          LoginSerializer, RegisterSerializer,
                          ResetPasswordSerializer, UpdateProfileSerializer,
                          UserSerializer)
from .tokens import account_activation_token
from .utils import (send_reset_password_email, send_verification_email,
                    send_welcome_email)

User = get_user_model()
password_reset_token = PasswordResetTokenGenerator()


<<<<<<< HEAD
class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Optional: restrict to staff/admins in a real prod env
        # if not request.user.is_staff:
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        users = User.objects.all().order_by("-date_joined")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


=======
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

<<<<<<< HEAD
        # Auto-verify the user so they can log in immediately.
        # Email verification is still sent (printed to console in dev),
        # but users are not blocked from logging in until they verify.
        user.is_verified = True
        user.save(update_fields=["is_verified"])

=======
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        verification_link = f"http://localhost:5173/verify-email/{uid}/{token}/"

        send_welcome_email(user)
        send_verification_email(user, verification_link)

        return Response(
            {
                "success": True,
<<<<<<< HEAD
                "message": "Registration successful! You can now log in.",
=======
                "message": "Registration successful. Please verify your email.",
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        # FIX 2: Tightened broad Exception handling to specific decoding/lookup errors
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"success": False, "message": "Invalid verification link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if account_activation_token.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response(
                {"success": True, "message": "Email verified successfully."}
            )

        return Response(
            {"success": False, "message": "Verification link expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

<<<<<<< HEAD
=======
        if not user.is_verified:
            return Response(
                {"success": False, "message": "Verify your email before logging in."},
                status=status.HTTP_403_FORBIDDEN,
            )

>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "success": True,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            }
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success": True, "message": "Logged out successfully."})
        except Exception:
            return Response(
                {"success": False, "message": "Invalid refresh token."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UpdateProfileSerializer(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Profile updated.",
                "user": UserSerializer(request.user).data,
            }
        )


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user

        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {"success": False, "message": "Old password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(serializer.validated_data["new_password"])
        user.save()
        return Response({"success": True, "message": "Password changed successfully."})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = password_reset_token.make_token(user)
            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"
            send_reset_password_email(user, reset_link)
        except User.DoesNotExist:
            pass
        return Response(
            {
                "success": True,
                "message": "If an account matches that email, a password reset link has been sent.",
            }
        )


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # FIX 2: Tightened broad Exception handling to specific decoding/lookup errors
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"success": False, "message": "Invalid password reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password_reset_token.check_token(user, token):
            return Response(
                {"success": False, "message": "Password reset token expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(serializer.validated_data["password"])
        user.save()
        return Response({"success": True, "message": "Password reset successful."})
