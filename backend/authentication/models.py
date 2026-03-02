from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("user", "User"),
        ("pro", "Pro"),
        ("enterprise", "Enterprise"),
        ("admin", "Admin"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="user"
    )

    usage_limit = models.IntegerField(default=10)
    usage_count = models.IntegerField(default=0)

    def __str__(self):
        return self.username
    