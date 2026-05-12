from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_admin = models.BooleanField(default = False)
    email = models.EmailField(unique = True)
    profile_image = models.ImageField(upload_to = 'profiles/', blank = True, null = True)

    def __str__(self):
        return self.username


class Book(models.Model):
    CATEGORY_CHOICES = [
        ('romance', 'Romance'),
        ('science', 'Science'),
        ('fiction', 'Fiction'),
        ('nonfiction', 'Non-Fiction'),
        ('mystery', 'Mystery'),
        ('thriller', 'Thriller'),
        ('fantasy', 'Fantasy'),
        ('horror', 'Horror'),
        ('biography', 'Biography'),
        ('history', 'History'),
        ('poetry', 'Poetry'),
        ('selfhelp', 'Self-Help'),
        ('philosophy', 'Philosophy'),
        ('adventure', 'Adventure'),
        ('children', "Children's"),
        ('youngadult', 'Young Adult'),
        ('comics', 'Comics / Graphic Novels'),
        ('religion', 'Religion / Spirituality'),
        ('sciencefiction', 'Science Fiction'),
        ('travel', 'Travel'),
        ('cookbook', 'Cookbook'),
        ('art', 'Art / Photography'),
        ('health', 'Health / Fitness'),
    ]

    title = models.CharField(max_length = 255)
    author = models.CharField(max_length = 255)
    cover = models.ImageField(upload_to ='covers/', blank = True, null = True)
    category = models.CharField(max_length = 50, choices = CATEGORY_CHOICES)
    description = models.TextField()
    publisher = models.CharField(max_length = 255)
    publish_date = models.CharField(max_length = 10)
    pages = models.IntegerField()
    total_copies = models.IntegerField(default = 1)
    available_copies = models.IntegerField(default = 1)

    def is_available(self):
        return self.available_copies > 0

    def __str__(self):
        return self.title


class BorrowRecord(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'borrow_records')
    book = models.ForeignKey(Book, on_delete = models.CASCADE, related_name = 'borrow_records')
    borrowed_at = models.DateTimeField(auto_now_add = True)
    is_returned = models.BooleanField(default = False)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"


class ReadingRecord(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'reading_records')
    book = models.ForeignKey(Book, on_delete = models.CASCADE, related_name = 'reading_records')
    borrowed_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
    

class FavRecord(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'fav_records')
    book = models.ForeignKey(Book, on_delete = models.CASCADE, related_name = 'fav_records')
    added_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
