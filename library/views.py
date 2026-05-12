from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Book


@login_required
def adminpage(request):
    books = Book.objects.all()
    return render(request, 'adminpage.html', {'books': books})


@login_required
def userpage(request):
    return render(request, 'userpage.html')


def view_books(request):
    books = Book.objects.all()
    return render(request, 'viewbooks.html', {'books': books})

viewbooks = view_books

def details(request, id):
    book = get_object_or_404(Book, id=id)
    return render(request, 'Details.html', {'book': book})

def manage_books(request):
    books = Book.objects.all()
    return render(request, 'managebooks.html', {'books': books})

def add_book(request):
    if request.method == 'POST':
        title = request.POST.get('title', '')
        author = request.POST.get('author', '')
        category = request.POST.get('category', '')
        description = request.POST.get('description', '')
        publisher = request.POST.get('publisher', '')
        publish_date = request.POST.get('publish_date', '')
        pages = request.POST.get('pages') or 0
        total_copies = request.POST.get('total_copies') or 1
        cover = request.FILES.get('cover')
        Book.objects.create(
            title = title,
            author = author,
            category = category,
            description = description,
            publisher = publisher,
            publish_date = publish_date,
            pages = int(pages),
            total_copies = int(total_copies),
            available_copies = int(total_copies),
            cover=cover
        )
        return redirect('viewbooks')
    return render(request, 'AddBook.html')

def edit_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        book.title = request.POST['title']
        book.author = request.POST['author']
        book.category = request.POST['category']
        book.description = request.POST['description']
        book.total_copies = request.POST['total_copies']
        book.available_copies = request.POST['available_copies']
        book.publisher = request.POST['publisher']
        book.publish_date = request.POST['publish_date']
        book.pages = request.POST['pages']
        if 'cover' in request.FILES:
            book.cover = request.FILES['cover']
        book.save()
        return redirect('viewbooks')
    return render(request, 'managebooks.html', {'book': book})

def delete_book(request, book_id):
    book = get_object_or_404(Book, id = book_id)
    if request.method == 'POST':
        book.delete()
    return redirect('viewbooks')

@login_required
def borrowed_books(request):
    return render(request, 'listofborrowedbooks.html')

@login_required
def borrow_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'BorrowPage.html', {'book': book})

def home(request):
    return render(request, 'index.html')
