from . import views
from django.urls import path
from .views import CustomPasswordResetView ,login_view, home_view , signup_view , find_username_view
from django.contrib.auth import views as auth_views

app_name = 'users'  # 네임스페이스 설정

urlpatterns = [
    path('login/', login_view, name='login'),        #로그인
    path('home/', home_view, name='home'),          #홈페이지
    path('signup/', signup_view, name='signup'),  # 회원가입 URL
    path('mypage/', views.mypage_view, name='mypage'), 
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
    path('find_username/', find_username_view, name='find_username'),                
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),  # 여기서 변경
    path('', home_view, name='home'), #기본 주소
    path('product/<int:id>/', views.product_detail, name='product_detail'),     # 상품 상세 페이지
]