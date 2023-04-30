# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from rest_framework.renderers import JSONRenderer

class BookListAPIRenderer(JSONRenderer):
    media_type = 'application/vnd.booklist+json'
