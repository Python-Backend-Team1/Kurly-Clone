from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserLoginForm
from django.shortcuts import render
from .forms import UserLoginForm, UserSignUpForm



def home_view(request):
    return render(request, 'home.html')




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