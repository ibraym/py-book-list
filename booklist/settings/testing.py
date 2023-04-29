# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from booklist.settings.development import *
import tempfile

_temp_dir = tempfile.TemporaryDirectory(dir=BASE_DIR, suffix="skeleton")
BASE_DIR = _temp_dir.name
