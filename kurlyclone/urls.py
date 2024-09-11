from django.urls import path
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users.views import CustomPasswordResetView, login_view, home_view, signup_view, find_username_view
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('product/', include('product.urls', namespace='product')),
    path('users/', include('users.urls')),
    path('order/', include('order.urls')),
    path('cart/', include('cart.urls')), 
    path('', home_view, name='home'), #기본 주소
]

if settings.DEBUG:
    urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
