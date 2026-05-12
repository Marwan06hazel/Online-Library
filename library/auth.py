from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            messages.error(request, 'Email does not exist')
            return render(request, 'login.html')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            if user.is_admin:
                return redirect('adminpage')
            else:
                return redirect('userpage')
        else:
            messages.error(request, 'Password is incorrect')
            return render(request, 'login.html')

    return render(request, 'login.html')


def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm')
        is_admin = request.POST.get('is_admin') == 'on'

        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'signup.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'signup.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return render(request, 'signup.html')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_admin=is_admin
        )

        login(request, user)

        if user.is_admin:
            return redirect('adminpage')
        else:
            return redirect('userpage')

    return render(request, 'signup.html')


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def profile_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        profile_image = request.FILES.get('profile_image')

        user = request.user

        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)
        if profile_image:
            user.profile_image = profile_image

        user.save()
        return redirect('profile')

    return render(request, 'Profile.html', {'user': request.user})


def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if not request.user.is_admin:
            return redirect('userpage')
        return view_func(request, *args, **kwargs)
    return wrapper