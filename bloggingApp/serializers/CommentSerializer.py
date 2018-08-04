from rest_framework import serializers

from bloggingApp.models import commentInfo, profileInfo, blogInfo


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=commentInfo
        fields='__all__'

    def create(self, validated_data):
        temp=commentInfo(
            **validated_data,
                userinfo=profileInfo.objects.filter(userid=self.context['user'])[0],
                blogid=blogInfo.objects.filter(id=self.context['blog'])[0],
                )
        temp.save()
        return temp

    def update(self, instance, validated_data):
        instance.userinfo=validated_data.get('userinfo',instance.userinfo)
        instance.blogid=validated_data.get('blogid',instance.blogid)
        instance.comment=validated_data.get('comment',instance.comment)
        instance.save()
        return instance
