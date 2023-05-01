# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from booklist.settings.base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

INSTALLED_APPS += [
    'django_extensions',
]

ALLOWED_HOSTS.append('testserver')

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Cross-Origin Resource
UI_SCHEME = os.environ.get('UI_SCHEME', 'http')
UI_HOST = os.environ.get('UI_HOST', 'localhost')
UI_PORT = os.environ.get('UI_PORT', 3000)
CORS_ALLOW_CREDENTIALS = True
UI_URL = '{}://{}'.format(UI_SCHEME, UI_HOST)
CSRF_TRUSTED_ORIGINS = [UI_URL]

if UI_PORT and UI_PORT != '80':
    UI_URL += ':{}'.format(UI_PORT)

CORS_ORIGIN_WHITELIST = [UI_URL]
CORS_REPLACE_HTTPS_REFERER = True
