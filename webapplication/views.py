from django.http import Http404, HttpResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail

from .models import *
from . import forms

# Create your views here.

def mainPage(request):
    context = {}
    return render(request, "ResumePage.html", context)

def resumePage(request):
    submitted = False
    form = forms.ContactForm()
    if request.method == "POST":
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            submitted = True
            subject = f"Message from {form.cleaned_data['name']}"
            message = form.cleaned_data['message']
            sender = form.cleaned_data["email"]
            recipient = ["movieskudu@gmail.com"]
            try:
                send_mail(subject, message, sender, recipient, fail_silently=True)
                print(f"{subject} message: {message} Sender: {sender}")
                return redirect("/resume")
            except:
                submitted = False
                return HttpResponse("Invalid header found")
    context = {"form":form, "submitted":submitted}
    return render(request, "ResumePage.html", context)

def gamePage(request):
    return render(request, "GamePage.html")

def blogPage(request):
    return render(request, "BlogPage.html")
