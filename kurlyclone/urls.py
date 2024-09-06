"""
URL configuration for kurlyclone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from users.views import login_view, home_view,signup_view,find_username_view                               # view추가
from django.contrib.auth import views as auth_views                                      #이메일인증(비밀번호찾기관련)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('login/', login_view, name='login'),
    path('home/', home_view, name='home'),
    path('signup/', signup_view, name='signup'),                             # 회원가입 URL 추가
    path('', home_view, name='home'),                                      # 루트 URL 패턴 추가
    path('find-username/', find_username_view, name='find_username'),       #아이디찾기
    path('orders/', include('orders.urls')),

    
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),                     #비밀번호 찾기 
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]