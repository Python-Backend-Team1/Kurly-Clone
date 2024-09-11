from django.urls import path
from . import views

app_name = 'order'  # 네임스페이스 설정

urlpatterns = [
    path('create/', views.create_order, name='create_order'),  # 주문 생성
    path('list/', views.order_list, name='order_list'),  # 주문 목록
    path('<int:order_id>/', views.order_detail, name='order_detail'),  # 주문 상세
]
