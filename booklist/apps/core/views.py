# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

from drf_spectacular.utils import ( OpenApiResponse,
    extend_schema_view, extend_schema
)

from rest_framework import mixins, viewsets
from rest_framework.permissions import SAFE_METHODS


from booklist.apps.core.models import Profile, Book
from booklist.apps.core.serializers import ProfileReadSerializer, ProfileWriteSerializer, BookSerializer


@extend_schema(tags=['profiles'])
@extend_schema_view(
    list=extend_schema(
        summary='Method provides a list of visible columns',
        responses={
            '200': ProfileReadSerializer(many=True),
        }),
    partial_update=extend_schema(
        summary='Method changes the visibility of a column',
        responses={
            '200': ProfileWriteSerializer,
        }),
)
class ProfileViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin):
    queryset = Profile.objects.all()
    http_method_names = ['get', 'patch']

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ProfileReadSerializer
        else:
            return ProfileWriteSerializer

@extend_schema(tags=['books'])
@extend_schema_view(
    list=extend_schema(
        summary='Method provides a list of books',
        responses={
            '200': BookSerializer(many=True),
        }),
    update=extend_schema(
        summary='Method updates a book by id',
        responses={
            '200': BookSerializer,
        }),
    create=extend_schema(
        summary='Method creates a book',
        responses={
            '201': BookSerializer,
        }),
    destroy=extend_schema(
        summary='Method deletes a specific book from the server',
        responses={
            '204': OpenApiResponse(description='The book has been deleted'),
        })
)
class BookViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']
