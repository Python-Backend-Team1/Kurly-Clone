from django.urls import path
from . import views

urlpatterns = [
    path('', views.cart_view, name='view_cart'),  # /cart/로 매핑됨
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),  # /cart/add/<product_id>/
    path('update/<int:cart_item_id>/', views.update_cart_item, name='update_cart_item'),  # /cart/update/<cart_item_id>/
    path('remove/<int:cart_item_id>/', views.remove_cart_item, name='remove_cart_item'),  # /cart/remove/<cart_item_id>/
]
