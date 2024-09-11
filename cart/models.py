from django.db import models
from django.conf import settings
from product.models import Product  # product 앱에서 Product 모델을 가져오기

# Cart 모델
class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='carts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.cart_id} for {self.user.username}"

# CartItem 모델
class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)  # 기본 키
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in Cart {self.cart.cart_id}"
