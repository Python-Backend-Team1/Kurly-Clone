from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    name = models.CharField(max_length=150, default='Anonymous')
    phone = models.CharField(max_length=15, default='000-0000-0000')  # 기본값 설정
    address = models.CharField(max_length=255, default="Default Address")
    gender = models.CharField(max_length=10, default='남자')
    birthdate = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',
        blank=True,
    )