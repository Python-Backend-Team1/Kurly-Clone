from django.urls import path
from product import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'product'

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('categories/<int:category_id>/products', views.product_list, name='product_list_by_category'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('staff-only/', views.staff_only_view, name='staff_only_view'),
    path('add/', views.product_add, name='product_add'),
    path('<int:pk>/edit/', views.product_edit, name='product_edit'),
    path('<int:pk>/delete/', views.product_delete, name='product_delete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)