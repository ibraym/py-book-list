# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from django.db import models
from django.core.validators import MaxValueValidator

class Profile(models.Model):
    column_name = models.CharField(max_length=20, primary_key=True, editable=False)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ['-column_name']

class Book(models.Model):
    name = models.CharField(max_length=20)
    title = models.CharField(max_length=30, blank=True)
    author = models.CharField(max_length=30)
    description = models.CharField(max_length=512, blank=True)
    price = models.PositiveIntegerField(validators=[MaxValueValidator(99999)])

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name
