from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserLoginForm
from django.shortcuts import render
from .forms import UserLoginForm, UserSignUpForm 
from django.core.mail import send_mail            #아이디찾기
from django.contrib.auth.models import User        #아이디찾기
from django.conf import settings                   #아이디찾기
from .forms import CustomPasswordResetForm                    #비밀번호 찾기 아이디 동반
from django.contrib.auth.views import PasswordResetView      #비밀번호 찾기 아이디 동반
from django.contrib.auth import get_user_model                  #아이디찾기 오류
from django.contrib.auth.decorators import login_required
from django.contrib import messages




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
                return redirect('home')  # 로그인 성공 후 홈 페이지로 이동
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


@login_required
def mypage_view(request):
    password_confirmed = request.session.get('password_confirmed', False)

    if not password_confirmed:
        if request.method == 'POST':
            password = request.POST.get('password')
            user = authenticate(username=request.user.username, password=password)
            if user is not None:
                request.session['password_confirmed'] = True
                return redirect('mypage')
            else:
                messages.error(request, '비밀번호가 틀렸습니다.')
        # 여기서 `mypage.html`을 사용해 비밀번호 확인 폼을 표시합니다.
        return render(request, 'users/mypage.html', {'password_confirmed': False})

    if request.method == 'POST':
        email = request.POST.get('email')
        phone = request.POST.get('phone')

        if not email:
            messages.error(request, '이메일은 필수 입력 항목입니다.')
            return redirect('mypage')

        # 기본값 설정
        if not phone:
            phone = '000-0000-0000'

        request.user.email = email
        request.user.phone = phone
        request.user.save()

        messages.success(request, '정보가 성공적으로 수정되었습니다.')

    return render(request, 'users/mypage.html', {
        'password_confirmed': True,
        'user': request.user,
    })

class CustomPasswordResetView(PasswordResetView):                        #비밀번호찾기 아이디동반
    form_class = CustomPasswordResetForm
    template_name = 'users/password_reset_form.html'  # 템플릿 파일 경로
    success_url = '/password_reset/done/'  # 성공 시 리다이렉트될 URL
