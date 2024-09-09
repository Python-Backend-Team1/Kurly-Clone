from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):                                                 #유저 테이브 DB
    name = models.CharField(max_length=150, default='Anonymous')              # 기본값으로 'Anonymous' 설정
    phone = models.CharField(max_length=15, default='000-0000-0000')          # 기본값으로 임의의 전화번호 설정
    address = models.CharField(max_length=255, default="Default Address", blank=False, null=False)
    gender = models.CharField(max_length=10, default='남자')                   #default값을 줘야 오류가 안남
    birthdate = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)                                    # 이메일 필드를 고유하게 설정
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