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
    path('login/', login_view, name='login'),
    path('home/', home_view, name='home'),
    path('signup/', signup_view, name='signup'),                                                         # 회원가입 URL 추가
    path('', home_view, name='home'),                      
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),                   # 루트 URL 패턴 추가
    path('find-username/', find_username_view, name='find_username'),                                    #아이디찾기
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),              #비밀번호 찾기 
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('cart/', include('cart.urls')), 
]

if settings.DEBUG:
    urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
