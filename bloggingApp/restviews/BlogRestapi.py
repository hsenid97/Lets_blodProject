from django.shortcuts import get_object_or_404
from rest_framework import permissions, serializers, status
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework_jwt.serializers import User

from bloggingApp.models import blogInfo, profileInfo
from bloggingApp.serializers.blogserializer import BlogSerializer


class BlogInfoGetPostRestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request):
        blogs=blogInfo.objects.all()
        serializer=BlogSerializer(blogs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        context={'userinfo': request.user.id }
        serializer = BlogSerializer(data=request.data,context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class BlogInfoGetPutDeleteRestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request,pk):
        blogs=get_object_or_404(blogInfo,pk=pk)
        serializer=BlogSerializer(blogs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,pk):
        context = {'userinfo': request.user.id}#remodify this context to request.user in deployment stage
        try:
            blog=blogInfo.objects.filter(id=pk)[0]
            serializer = BlogSerializer(blog, data=request.data, context=context)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        temp=get_object_or_404(blogInfo,pk=pk)
        temp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)









    #fields=['id','blogTitle','blogPost','commentid','commentCount','likesCount','likedUsers','rating']
