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
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from users.views import CustomPasswordResetView ,login_view, home_view,signup_view ,find_username_view,mypage_view
from django.contrib.auth import views as auth_views                                      #이메일인증(비밀번호찾기관련)

 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('login/', login_view, name='login'),
    path('home/', home_view, name='home'),
    path('signup/', signup_view, name='signup'),                             # 회원가입 URL 추가
    path('mypage/', mypage_view, name='mypage'),                               #마이페이지
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),        #로그아웃뷰
    path('mypage/', mypage_view, name='mypage'),
    path('', home_view, name='home'),                                      # 루트 URL 패턴 추가
    
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),  # 여기서 변경

path('find-username/', find_username_view, name='find_username'),

path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]