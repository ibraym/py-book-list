# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from django.test import TestCase
from booklist.apps.core.models import Profile, Book
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError

from booklist.apps.core.utils import get_book_column_names

class ProfileTestCase(TestCase):
    def setUp(self):
        self.column_names = get_book_column_names()

    def test_preset_column_name(self):
        profiles = Profile.objects.all()
        self.assertEqual(profiles.count(), len(self.column_names))
        # check if the column names are correct
        for profile in profiles:
            self.assertIn(profile.column_name, self.column_names)

    # def test_column_name_not_editable(self):
    #     profiles = Profile.objects.all()
    #     for profile in profiles:
    #         self.assertEqual(profile.column_name, profile._meta.get_field('column_name').value_from_object(profile))
    #         self.assertRaisesMessage(
    #             ValueError, 'Cannot change the value of column_name.',
    #             setattr, profile, 'column_name', 'test')


class BookTestCase(TestCase):
    def setUp(self):
        self.book = Book.objects.create(name='Test Book', author='Test Author', price=10)

    def test_book_str(self):
        self.assertEqual(str(self.book), 'Test Book')

    def test_title_blank(self):
        self.assertEqual(self.book.title, '')

    def test_description_blank(self):
        self.assertEqual(self.book.description, '')

    def test_price_positive_integer(self):
        self.assertRaisesMessage(
            IntegrityError, 'CHECK constraint failed: core_book',
            Book.objects.create, name='Test Book 2', author='Test Author 2', price=-10)

    def test_price_max_length(self):
        book = Book.objects.create(name='Test Book 2', author='Test Author 2', price=999991)
        self.assertRaisesMessage(
            ValidationError, 'Ensure this value is less than or equal to 99999.',
            book.full_clean)
