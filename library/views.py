from django.shortcuts import render , redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Book, BorrowRecord, ReadingRecord, FavRecord
from django.contrib import messages
from datetime import timedelta


@login_required
def adminpage(request):
    books = Book.objects.all()
    return render(request, 'adminpage.html', {'books': books})


@login_required
def userpage(request):
    return render(request, 'userpage.html')

@login_required(login_url='login')
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

def borrow(request, id):

    book = get_object_or_404(Book, id=id)

    if request.method == "POST":

        duration = request.POST.get('duration')
        paymentMethod = request.POST.get('payment_method')
        address = request.POST.get('delivery_address')
        # unit = request.POST.get("duration_unit")

        # if unit == "days":
        #     delta = timedelta(days=duration)

        # elif unit == "weeks":
        #     delta = timedelta(weeks=duration)

        # else:
        #     delta = timedelta(days=30 * duration)

        if BorrowRecord.objects.filter(
            user=request.user, book=book,
            is_returned=False
        ).exists():
            messages.error(request, "This book is already borrowed!")
            return redirect('borrowbook', id=book.id)
        

        if book.available_copies <= 0:
            messages.error(request, "No copies available.")
            return redirect('borrowbook', id=book.id)
        
        if not address.strip():
            messages.error(request, "Delivery address is required.")
            return redirect('borrowbook', id=book.id)
        
        if not duration:
            messages.error(request, "Duration is required.")
            return redirect('borrowbook', id=book.id)
        
        durationNum = int(request.POST.get('duration'))

        if durationNum <= 0:
            messages.error(request, "Enter a valid duration.")
            return redirect('borrowbook', id=book.id)

        BorrowRecord.objects.create(
            user=request.user,
            book=book,
            duration_days=durationNum
        )

        book.available_copies -= 1
        book.save()

        # messages.success(request, "Book is borrowed successfully!")
        return redirect('borrowed')
        
    # show page initially    
    return render(request, 'BorrowPage.html', { 'book': book })

def borrowed(request):
    currUser = request.user
    borrowed = BorrowRecord.objects.filter(user=currUser, is_returned=False)
    reading = ReadingRecord.objects.filter(user=request.user)
    favorites = FavRecord.objects.filter(user=request.user)

    for b in borrowed:
        b.due_date = b.borrowed_at + timedelta(days=b.duration_days)

    return render(request, 'listofborrowedbooks.html', {'borrow_records': borrowed, 'reading_records': reading, 'fav_records': favorites})

def returnbook(request, id):

    borrow_record = get_object_or_404(BorrowRecord, id=id, user=request.user)

    if request.method == "POST":

        if borrow_record.is_returned == False: 
            borrow_record.is_returned = True
            borrow_record.book.available_copies += 1

            borrow_record.save()
            borrow_record.book.save()

            ReadingRecord.objects.create(
                user=request.user,
                book=borrow_record.book,
                borrowed_at=borrow_record.borrowed_at
            )

            return redirect('borrowed')
    
    return redirect('borrowed')         

def favToggle(request, id):

    book = get_object_or_404(Book, id=id)

    if request.method == "POST":

        fav_book = FavRecord.objects.filter(
            user=request.user,
            book=book
        )

        if fav_book.exists():
            fav_book.delete()
        else:
            FavRecord.objects.create(
                user=request.user,
                book=book
            )
    return redirect('borrowed') 

def home(request):
    return render(request, 'index.html')
