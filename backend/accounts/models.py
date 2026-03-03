from django.conf import settings
from django.db import models

# Create your models here.

class Profile(models.Model):
    # Djangoのユーザーモデルと 1対1 で紐づける
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    # メッセージ
    message = models.TextField(blank=True)

    # アイコン
    icon_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return f"Profile({self.user.username})"