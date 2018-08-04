from rest_framework import serializers
from rest_framework_jwt.serializers import User

from bloggingApp.models import profileInfo


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=profileInfo
        fields="__all__"

    def create(self,validate_data):
        temp=profileInfo(**validate_data,userid=User.objects.filter(id=self.context['user'])[0],displayname=self.context['displayname'])
        temp.save()
        return temp

    def update(self, instance, validated_data):
        instance.userid = validated_data.get('userid', instance.userid)
        instance.displayname = validated_data.get('displayname', instance.displayname)
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.profilepic = validated_data.get('profilepic', instance.profilepic)
        instance.followers = validated_data.get('followers', instance.followers)
        instance.following = validated_data.get('following', instance.following)
        instance.followersCount = validated_data.get('followersCount', instance.followersCount)
        instance.followingCount = validated_data.get('followingCount', instance.followingCount)
        instance.blogs = validated_data.get('blogs', instance.blogs)
        instance.blogCount = validated_data.get('blogCount', instance.blogCount)
        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.mobileno = validated_data.get('mobileno', instance.mobileno)
        instance.gender=validated_data.get('gender',instance.gender)
        instance.save()
        return instance
