from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import PasswordResetForm  # 비밀번호찾기 아이디동반
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser


class CustomPasswordResetForm(PasswordResetForm):
    username = forms.CharField(max_length=150, required=True, label="아이디")

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        username = cleaned_data.get('username')

        UserModel = get_user_model()
        if not UserModel.objects.filter(username=username, email=email).exists():
            raise forms.ValidationError("아이디와 이메일이 일치하지 않습니다.")

        return cleaned_data  # 비밀번호 찾기 아이디이메일


class UserSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    name = forms.CharField(max_length=100, required=True, label="이름")
    phone = forms.CharField(max_length=15, required=True, label="휴대폰")
    address = forms.CharField(max_length=255, required=True, label="주소")
    gender = forms.ChoiceField(choices=[('남자', '남자'), ('여자', '여자'), ('선택안함', '선택안함')], label="성별")
    birthdate = forms.DateField(required=False, label="생년월일")

    class Meta:
        model = CustomUser
        fields = ['username', 'name', 'email', 'phone', 'address', 'gender', 'birthdate', 'password1', 'password2']

    def save(self, commit=True):
        user = super(UserSignUpForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.name = self.cleaned_data['name']
        user.phone = self.cleaned_data['phone']
        user.address = self.cleaned_data['address']
        user.gender = self.cleaned_data['gender']
        user.birthdate = self.cleaned_data['birthdate']
        
        if commit:
            user.save()
        return user


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Username'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Password'
    }))  # 사용자 인증 폼