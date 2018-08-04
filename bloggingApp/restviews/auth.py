from django.contrib.auth import authenticate
from django.urls import reverse_lazy
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

class login(object):
    def __init__(self,username,password):
        self.username=username
        self.password=password
#
# class LoginSerializer(serializers.Serializer):
#     username=serializers.CharField(max_length=30)
#     password=serializers.CharField(max_length=30)

class LoginRestView(APIView):
    def post(self,request):
        data=login(username=request.query_params['username'],password=request.query_params['password'])
        user=authenticate(
            request,
            username=data.username,
            password=data.password
        )
        if user is not None:
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


