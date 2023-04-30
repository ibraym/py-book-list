# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT


from booklist.apps.core.models import Book

def create_dummy_books():
    books_number = 5
    books = []
    for i in range(books_number):
        book = Book.objects.create(
            name=f'Book {i}',
            title=f'Title {i}',
            author=f'Author {i}',
            description=f'Description {i}',
            price=i,
        )
        book.save()
        books.append(book)
    return books
