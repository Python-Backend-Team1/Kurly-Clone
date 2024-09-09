# users/urls.py

from django.urls import path
from .views import CustomPasswordResetView ,login_view, home_view , signup_view , find_username_view 

urlpatterns = [
    path('login/', login_view, name='login'),        #로그인
    path('home/', home_view, name='home'),          #홈페이지
    path('signup/', signup_view, name='signup'),  # 회원가입 URL
    path('find-username/', find_username_view, name='find_username'),                
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),  # 여기서 변경
    path('', home_view, name='home'), #기본 주소
]
