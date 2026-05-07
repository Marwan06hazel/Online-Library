from django.shortcuts import render , get_object_or_404
from .models import Book


def view_books(request):
    books = Book.objects.all()
    return render(request, 'viewbooks.html', {'books': books})


def details(request, id):
    book = get_object_or_404(Book, id=id)
    return render(request, 'details.html', { 'book': book })




# Create your views here.