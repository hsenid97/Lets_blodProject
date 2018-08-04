"""Lets_blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token
from bloggingApp.restviews.BlogRestapi import BlogInfoGetPostRestView, BlogInfoGetPutDeleteRestView
from bloggingApp.restviews.CommentRestapi import CommentGetPostRestView, CommentGetPutDeleteRestView
from bloggingApp.restviews.ProfileRestapi import ProfileGetPostRestView, ProfileGetPutDelete, SignUpUser
from bloggingApp.restviews.auth import LoginRestView

urlpatterns = [
    #path('Login/',LoginRestView.as_view(),name="login"),

    #1> this gets all the post of  all user(%%%still working should get the most latest post%%%)
    path('GETallBlogs/',BlogInfoGetPostRestView.as_view(),name='getblogs'),

    #2>get all blogs of a user
    path('GETallBlogs/<int:pk>/',BlogInfoGetPostRestView.as_view(),name='saveblog'),

    #3>get the blogs based on id ,put and delete based on the blogid
    path('EditBlogs/<int:pk>/',BlogInfoGetPutDeleteRestView.as_view(),name='editblog'),

    #4>get all the comments of a givem blogid,post a comment to the given blogid
    path('GETallComments/<int:pk>/',CommentGetPostRestView.as_view(),name='getandpostcomment'),

    #5>get individual comment by commentid
    path('EditComments/<int:pk>/',CommentGetPutDeleteRestView.as_view(),name='editcomment'),

    #6>get all the accounts and post the account
    path('GETallProfile/',ProfileGetPostRestView.as_view(),name='getandpostprofile'),

    #7>edit the profile by profileid
    path('EditProfile/',ProfileGetPutDelete.as_view(),name='editprofile'),

    #8>signup page
    path('SignUp/',SignUpUser.as_view(),name="signup"),

]


