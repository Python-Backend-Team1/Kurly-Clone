from django.urls import path
from product import views

app_name = 'product'

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('categories/<int:category_id>/products', views.product_list, name='product_list_by_category'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
]