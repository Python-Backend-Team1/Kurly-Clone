from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    name = models.CharField(max_length=150, default='Anonymous')              # 기본값으로 'Anonymous' 설정     #customuser모델에 추가할때 필드가 null=False로설정되어서그럼
    phone = models.CharField(max_length=15, default='000-0000-0000')  # 기본값으로 임의의 전화번호 설정
    address = models.CharField(max_length=255, default="Default Address", blank=False, null=False)
    gender = models.CharField(max_length=10, default='남자')  # 여기서 '남자'는 기본값 예시입니다.
    birthdate = models.DateField(null=True, blank=True)