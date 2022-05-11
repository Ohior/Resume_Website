from django.db import models

# Create your models here.


class BlogModel(models.Model):
    name = models.CharField(max_length=200)
    message = models.TextField(max_length=10000)
    # image = models.ImageField()
    def __str__(self):
        return self.name

class GameModel(models.Model):
    score = models.IntegerField(default=0)
    
    def __str__(self):
        return self.score
    