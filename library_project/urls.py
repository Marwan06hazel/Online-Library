from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from library import auth, views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),

    # Home redirect
    path('', lambda request: redirect('login'), name='home'),

    # Auth
    path('login/', auth.login_view, name='login'),
    path('signup/', auth.signup_view, name='signup'),
    path('logout/', auth.logout_view, name='logout'),
    path('profile/', auth.profile_view, name='profile'),

    # Admin Pages
    path('adminpage/', views.adminpage, name='adminpage'),
    path('books/', views.manage_books, name='manage_books'),
    path('books/add/', views.add_book, name='add_book'),
    path('books/edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('books/delete/<int:book_id>/', views.delete_book, name='delete_book'),

    # User Pages
    path('userpage/', views.userpage, name='userpage'),
    path('viewbooks/', views.viewbooks, name='viewbooks'),
    path('borrowed/', views.borrowed_books, name='borrowed_books'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),

    # Book Details
    path('details/<int:id>/', views.details, name='book_details'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)