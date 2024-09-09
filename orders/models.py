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
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 주문한 사용자
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # 총 주문 금액
    shipping_address = models.CharField(max_length=255)  # 배송 주소
    order_status = models.CharField(
        max_length=20,
        choices=(
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('shipped', 'Shipped'),
            ('delivered', 'Delivered'),
            ('cancelled', 'Cancelled')
        ),
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)  # 주문 생성 시간
    updated_at = models.DateTimeField(auto_now=True)  # 주문 정보 수정 시간

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

# 주문 항목 모델
class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)  # 자동 생성되는 기본 키로 설정
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')  # order_id
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # product_id
    quantity = models.PositiveIntegerField()  # 수량
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 가격

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"