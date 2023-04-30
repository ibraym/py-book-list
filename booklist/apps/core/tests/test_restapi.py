# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from rest_framework.test import APIClient, APITestCase
from rest_framework import status

from booklist.apps.core.utils import get_book_column_names
from booklist.apps.core.tests.utils import create_dummy_books

class APITestCaseBase(APITestCase):
     #  setUp
    def setUp(self):
        super().setUp()
        self.column_names = get_book_column_names()
        self.client = APIClient()


class ProfileListTestCase(APITestCaseBase):
    # test the list functionality of ProfileViewSet class
    def test_list(self):
        response = self.client.get('/api/profiles')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), len(self.column_names))
        # check if the column names are correct
        for profile in response.data['results']:
            self.assertIn(profile['column_name'], self.column_names)

class ProfileUpdateTestCase(APITestCaseBase):
    #  setUp
    def setUp(self):
        self.column_names = get_book_column_names()
        self.client = APIClient()

    # test to set is_visible as True for all columns
    def test_set_is_visible_true(self):
        for column_name in self.column_names:
            response = self.client.patch('/api/profiles/{}'.format(column_name), data={'is_visible': True}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test to set is_visible as False for all columns
    def test_set_is_visible_false(self):
        for column_name in self.column_names:
            response = self.client.patch('/api/profiles/{}'.format(column_name), data={'is_visible': False}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test change column_name should not change
    def test_change_column_name_failed(self):
        for column_name in self.column_names:
            response = self.client.patch('/api/profiles/{}'.format(column_name), data={'column_name': 'test'}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            # should not change
            self.assertEqual(response.data['column_name'], column_name)

class BookListTestCase(APITestCaseBase):
    @classmethod
    def setUpTestData(cls):
        cls.books = create_dummy_books()

    # test the list functionality of BookViewSet class
    def test_list(self):
        response = self.client.get('/api/books')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), len(self.books))
        for book in response.data['results']:
            self.assertEqual(len(book), len(self.column_names) + 1) # with id field

class BookCreateTestCase(APITestCaseBase):
    # test the create functionality of BookViewSet class
    def test_create_without_optional_fields(self):
        new_book = {'name': 'Test Book', 'author': 'Test Author', 'price': 10}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), len(self.column_names) + 1) # with id field
        self.assertEqual(response.data['name'], new_book['name'])
        self.assertEqual(response.data['author'], new_book['author'])
        self.assertEqual(response.data['price'], new_book['price'])

    # test with optional fields
    def test_create_with_optional_fields(self):
        new_book = {'name': 'Test Book', 'title': 'Test Book Title', 'author': 'Test Author', 'description': 'Test Book Description','price': 10}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), len(self.column_names) + 1) # with id field
        self.assertEqual(response.data['name'], new_book['name'])
        self.assertEqual(response.data['title'], new_book['title'])
        self.assertEqual(response.data['author'], new_book['author'])
        self.assertEqual(response.data['description'], new_book['description'])
        self.assertEqual(response.data['price'], new_book['price'])

    # test without name is bad request
    def test_create_without_name_failed(self):
        new_book = {'author': 'Test Author', 'price': 10}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # test without author is bad request
    def test_create_without_author_failed(self):
        new_book = {'name': 'Test Book', 'price': 10}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # test without price is bad request
    def test_create_without_price_failed(self):
        new_book = {'name': 'Test Book', 'author': 'Test Author'}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # test invalid price is bad request
    def test_create_invalid_price(self):
        new_book = {'name': 'Test Book', 'author': 'Test Author', 'price': 100000}
        response = self.client.post('/api/books', data=new_book, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class BookUpdateTestCase(APITestCaseBase):
    @classmethod
    def setUpTestData(cls):
        cls.books = create_dummy_books()

    # update name
    def test_update_name(self):
        for book in self.books:
            response = self.client.patch('/api/books/{}'.format(book.id), data={'name': 'Test'}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['name'], 'Test')

    # update title
    def test_update_title(self):
        for book in self.books:
            response = self.client.patch('/api/books/{}'.format(book.id), data={'title': 'Test'}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['title'], 'Test')

    # update price
    def test_update_price(self):
        for book in self.books:
            response = self.client.patch('/api/books/{}'.format(book.id), data={'price': 10}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['price'], 10)

    # update with invalid price
    def test_update_price_failed(self):
        for book in self.books:
            response = self.client.patch('/api/books/{}'.format(book.id), data={'price': 100000}, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class BookDeleteTestCase(APITestCaseBase):
    @classmethod
    def setUpTestData(cls):
        cls.books = create_dummy_books()

    def test_delete(self):
        for book in self.books:
            response = self.client.delete('/api/books/{}'.format(book.id))
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
            self.assertEqual(response.data, None)

    def test_delete_not_found(self):
        response = self.client.delete('/api/books/{}'.format(10))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
