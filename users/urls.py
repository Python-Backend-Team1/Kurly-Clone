# users/urls.py

from django.urls import path
from .views import login_view, home_view , signup_view,find_username_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('home/', home_view, name='home'),
    path('signup/', signup_view, name='signup'),  # 회원가입 URL
    path('find-username/', find_username_view, name='find_username'),
]
