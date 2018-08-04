
from rest_framework import status, permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from bloggingApp.models import commentInfo, blogInfo
from bloggingApp.serializers.CommentSerializer import CommentSerializer


class CommentGetPostRestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request,pk):
        comm=commentInfo.objects.filter(blogid=pk)
        serializer=CommentSerializer(comm,many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

    def post(self,request,pk):
        context={'blog':pk,'user':request.user.id}#replace the user value with request.user
        serializer=CommentSerializer(data=request.query_params,context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class CommentGetPutDeleteRestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request,pk):
        comm=commentInfo.objects.filter(id=pk)
        serializer=CommentSerializer(comm,many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

    def put(self,request,pk):
        comm=commentInfo.objects.filter(id=pk)
        context = {'blog': pk, 'user': request.user.id}  # replace the user value with request.user
        serializer=CommentSerializer(comm[0],request.query_params,context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        commentInfo.objects.filter(id=pk).delete()
        return Response(status=status.HTTP_202_ACCEPTED)