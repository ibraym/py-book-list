# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from booklist.apps.core.models import Book

def get_book_column_names():
    column_name = []
    for field in Book._meta.get_fields():
        if field.name != 'id':
            column_name.append(field.name)
    return column_name
