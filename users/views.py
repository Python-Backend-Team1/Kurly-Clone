from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserLoginForm
from django.shortcuts import render
from .forms import UserLoginForm, UserSignUpForm 
from django.core.mail import send_mail                        #아이디찾기
from django.contrib.auth.models import User                   #아이디찾기
from django.conf import settings                              #아이디찾기
from .forms import CustomPasswordResetForm                    #비밀번호 찾기 아이디 동반
from django.contrib.auth.views import PasswordResetView       #비밀번호 찾기 아이디 동반
from django.contrib.auth import get_user_model                #아이디찾기 오류



def home_view(request):
    return render(request, 'home.html')

def find_username_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        try:
            # 이메일과 일치하는 첫 번째 사용자만 선택
            user = get_user_model().objects.filter(email=email).first()
            if user:
                send_mail(
                    'Your Username',
                    f'Your username is {user.username}',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return render(request, 'users/find_username_done.html')
            else:
                return render(request, 'users/find_username.html', {'error': 'Email not found'})

        except Exception as e:
            return render(request, 'users/find_username.html', {'error': str(e)})

    return render(request, 'users/find_username.html')


def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('product:product_list')  # 로그인 성공 후 상점 페이지로 이동
    else:
        form = UserLoginForm()
    
    return render(request, 'users/login.html', {'form': form})      #로그인 뷰



def signup_view(request):
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserSignUpForm()
    return render(request, 'users/signup.html', {'form': form})


class CustomPasswordResetView(PasswordResetView):                        #비밀번호찾기 아이디동반
    form_class = CustomPasswordResetForm
    template_name = 'users/password_reset_form.html'  # 템플릿 파일 경로
    success_url = '/password_reset/done/'  # 성공 시 리다이렉트될 URL
