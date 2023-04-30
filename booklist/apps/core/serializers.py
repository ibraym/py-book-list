# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from rest_framework import serializers
from .models import Profile, Book

class ProfileReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.is_visible = validated_data.get('is_visible', instance.is_visible)
        instance.save()
        return instance

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
