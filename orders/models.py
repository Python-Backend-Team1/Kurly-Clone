from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# from products.models import Product  # 다른 팀원이 구현한 Product 모델을 임포트


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        app_label = 'orders'  # 여기에 app_label을 명시하여 오류 해결

    def __str__(self):
        return self.name
    
# 주문 모델
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # User 모델 대신 AUTH_USER_MODEL 사용
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=(('pending', 'Pending'), ('completed', 'Completed'), ('cancelled', 'Cancelled')), default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

# 주문 항목 모델
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
