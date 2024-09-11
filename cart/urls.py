from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_view, name='cart_view'),  # 장바구니 조회
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),  # 장바구니에 상품 추가
    path('update/<int:cart_item_id>/', views.update_cart_item, name='update_cart_item'),  # 장바구니 항목 수정
    path('remove/<int:cart_item_id>/', views.remove_cart_item, name='remove_cart_item'),  # 장바구니 항목 삭제
]