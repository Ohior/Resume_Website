

from . import views
from django.urls import path

urlpatterns = [
    path("", views.mainPage, name="main_page"),
    path("resume/", views.resumePage, name="resume"),
    path("game/", views.gamePage, name="game"),
    path("blog/", views.blogPage, name="blog"),
]