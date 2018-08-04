import datetime

from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class profileInfo(models.Model):
    userid=models.OneToOneField(User,on_delete=models.CASCADE,blank=True)
    displayname=models.CharField(max_length=25,default="no_name",blank=True)
    firstname=models.CharField(max_length=25,blank=True,null=True)
    lastname=models.CharField(max_length=25,blank=True,null=True)
    profilepic=models.FileField(upload_to='uploads/',default='',blank=True)
    followers=models.CharField(max_length=100,blank=True,null=True)
    following=models.CharField(max_length=100,blank=True,null=True)
    followersCount=models.IntegerField(default=0)
    followingCount=models.IntegerField(default=0)
    blogs=models.CharField(max_length=100,blank=True,null=True)
    blogCount=models.IntegerField(default=0)
    dateOfBirth=models.DateField(default=datetime.date.today)
    gender=models.CharField(max_length=7,default='male',blank=True)
    mobileno=models.CharField(max_length=10,blank=True,null=True)

    def __str__(self):
        return self.displayname

class blogInfo(models.Model):
    userinfo=models.ForeignKey(profileInfo,on_delete=models.CASCADE,blank=True)
    blogTitle=models.CharField(max_length=20,blank=False)
    blogPost=models.CharField(max_length=1000,default=blogTitle)
    commentid=models.CharField(max_length=100,blank=True)
    commentCount=models.IntegerField(default=0,blank=True)
    likesCount=models.IntegerField(default=0,blank=True)
    likedUsers=models.CharField(max_length=100,blank=True)
    rating=models.IntegerField(default=0,blank=True)

    def __str__(self):
        return self.blogTitle

class commentInfo(models.Model):
    userinfo=models.ForeignKey(profileInfo,on_delete=models.CASCADE,blank=True)
    blogid=models.ForeignKey(blogInfo,on_delete=models.CASCADE,blank=True)
    comment=models.CharField(max_length=150,default=blogid)

    def __str__(self):
        return self.userinfo



