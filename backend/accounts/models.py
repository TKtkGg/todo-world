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

class Todo(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="todos",
    )
    text = models.CharField(max_length=500)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Todo({self.user.username}, {self.text[:20]})"

class Like(models.Model):
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="likes_sent",
    )
    to_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="likes_received",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["from_user", "to_user"]]

    def __str__(self) -> str:
        return f"Like({self.from_user.username} -> {self.to_user.username})"