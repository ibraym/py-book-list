# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from booklist.settings.base import *

DEBUG = False

INSTALLED_APPS += [
    'mod_wsgi.server',
]

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('BOOKLIST_POSTGRES_HOST', 'booklist_db'),
        'NAME': os.getenv('BOOKLIST_POSTGRES_DBNAME', 'booklist'),
        'USER': os.getenv('BOOKLIST_POSTGRES_USER', 'root'),
        'PASSWORD': os.getenv('BOOKLIST_POSTGRES_PASSWORD', ''),
        'PORT': os.getenv('BOOKLIST_POSTGRES_PORT', 5432),
    }
}