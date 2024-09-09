# users/urls.py

from django.urls import path
from .views import CustomPasswordResetView ,login_view, home_view , signup_view , find_username_view,mypage_view
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', login_view, name='login'),        #로그인
    path('home/', home_view, name='home'),          #홈페이지
    path('signup/', signup_view, name='signup'),  # 회원가입 URL
     path('mypage/', mypage_view, name='mypage'), #마이 페이지 
     path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
    path('find-username/', find_username_view, name='find_username'),                
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),  # 여기서 변경
    path('', home_view, name='home'), #기본 주소
]
