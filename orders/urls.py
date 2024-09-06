from django.urls import path
from django.http import HttpResponseRedirect
from . import views

urlpatterns = [
    path('', lambda request: HttpResponseRedirect('list/')),  # 기본 경로를 'list/'로 리디렉션
    path('create/', views.create_order, name='create_order'),
    path('list/', views.order_list, name='order_list'),
    path('<int:order_id>/', views.order_detail, name='order_detail'),
]