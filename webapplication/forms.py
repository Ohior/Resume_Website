from django import forms


def shouldBeEmpty(value):
    if value:
        raise forms.ValidationError("This must be empty")

class ContactForm(forms.Form):
    name = forms.CharField(required=True, max_length=100)
    message = forms.CharField(required=True, widget=forms.Textarea)
    email = forms.EmailField(required=True, label="Enter your email address")
    force_field = forms.CharField(required=False, widget=forms.HiddenInput, label="Do not enter", validators=[shouldBeEmpty])
    