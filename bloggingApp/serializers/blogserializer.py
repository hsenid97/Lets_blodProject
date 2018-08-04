from rest_framework import serializers

from bloggingApp.models import blogInfo, profileInfo



class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model=blogInfo
        fields='__all__'

    def create(self,validated_data):
        temp=blogInfo(**validated_data,userinfo=profileInfo.objects.filter(userid=self.context['userinfo'])[0])
        temp.save()
        return temp

    def update(self, instance, validated_data):
        instance.userinfo=validated_data.get('userinfo',instance.userinfo)
        instance.blogTitle=validated_data.get('blogTitle',instance.blogTitle)
        instance.blogPost = validated_data.get('blogPost', instance.blogPost)
        instance.commentid = validated_data.get('commentid', instance.commentid)
        instance.commentCount = validated_data.get('commentCount', instance.commentCount)
        instance.likesCount = validated_data.get('likesCount', instance.likesCount)
        instance.likedUsers = validated_data.get('likedUsers', instance.likedUsers)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        return instance

