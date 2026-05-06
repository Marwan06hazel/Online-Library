# library/auth.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User

def login_view(request):
    """Login view for users and admins"""
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
                return redirect('/adminpage/')
            else:
                return redirect('/userpage/')
        else:
            messages.error(request, 'Password is incorrect')
            return render(request, 'login.html')
    
    return render(request, 'login.html')


def signup_view(request):
    """Signup view for new users"""
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm')
        is_admin = request.POST.get('admin') == 'on'
        
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
            return redirect('/adminpage/')
        else:
            return redirect('/userpage/')
    
    return render(request, 'signup.html')


def logout_view(request):
    """Logout view"""
    logout(request)
    return redirect('/login.html')


@login_required
def profile_view(request):
    """Display user profile page"""
    return render(request, 'Profile.html', {'user': request.user})


@login_required
def admin_required_view(view_func):
    """Decorator for checking admin privileges"""
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/login.html')
        if not request.user.is_admin:
            return redirect('/userpage/')
        return view_func(request, *args, **kwargs)
    return wrapper