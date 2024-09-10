from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserLoginForm
from django.shortcuts import render
from .forms import UserLoginForm, UserSignUpForm
from django.core.mail import send_mail                 #아이디비번찾기관련
from django.contrib.auth.models import User              #아이디비번찾기관련
from django.conf import settings                       #아이디비번찾기관련



def home_view(request):
    return render(request, 'home.html')


def find_username_view(request):                        #아이디찾기
    if request.method == 'POST':
        email = request.POST['email']
        try:
            user = User.objects.get(email=email)
            send_mail(
                'Your Username',
                f'Your username is {user.username}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return render(request, 'users/find_username_done.html')
        except User.DoesNotExist:
            return render(request, 'users/find_username.html', {'error': 'Email not found'})

    return render(request, 'users/find_username.html')



def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('home')  # 로그인 성공 후 홈 페이지로 이동
    else:
        form = UserLoginForm()
    
    return render(request, 'users/login.html', {'form': form})      #로그인 뷰



def signup_view(request):                                           #회원가입폼
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # 회원가입 후 자동 로그인
            return redirect('login') #회원가입 후 로그인html로 
    else:
        form = UserSignUpForm()
    return render(request, 'users/signup.html', {'form': form})


class CustomPasswordResetView(PasswordResetView):                        #비밀번호찾기 아이디동반
    form_class = CustomPasswordResetForm
    template_name = 'users/password_reset_form.html'  # 템플릿 파일 경로
    success_url = '/password_reset/done/'  # 성공 시 리다이렉트될 URL
<<<<<<< HEAD
=======



>>>>>>> 401197d7c9cf463d3480a78a1ff5a9cbe81fa190
