from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from bloggingApp.models import profileInfo
from bloggingApp.serializers.Profileserializer import ProfileSerializer

class SignUpUser(APIView):
    pass
class ProfileGetPostRestView(APIView):
    def get(self,request):
        prof=profileInfo.objects.all()
        serializer=ProfileSerializer(prof,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        user = User.objects.create_user(username=request.data['username'],
                                        password=request.data['password'],
                                        email=request.data['email'])
        context = {'user': user.id,'displayname':request.data['username']}  # userid based on the token request
        serializer=ProfileSerializer(data=request.data,context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        User.objects.filter(id=user.id).delete()
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ProfileGetPutDelete(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request):
        user = User.objects.filter(id=request.user.id)[0]
        prof=profileInfo.objects.filter(userid=user.id) # remove the pk using the user
        serializer=ProfileSerializer(prof,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request):
        user=User.objects.filter(id=request.user.id)[0]
        # try:
        #     user.username=request.data['displayname']
        #     user.save()
        # except Exception as e:
        #     pass
        context={'user':request.user.id }# remove the pk and place the request.user
        prof=profileInfo.objects.filter(userid=user.id)[0]
        serializer=ProfileSerializer(prof,data=request.data,context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # no need to delete the profile user account
    def delete(self,request):
        profileInfo.objects.filter(id=request.user.id).delete()
        return Response(status=status.HTTP_200_OK)

