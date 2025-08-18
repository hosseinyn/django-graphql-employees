from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Employee(models.Model):
    firstname = models.CharField(null=False , max_length=50)
    lastname = models.CharField(null=False , max_length=50)
    age = models.PositiveIntegerField(null=False)
    hire_date = models.DateField(null=False)

    def clean(self):
        if self.age > 70:
            raise ValidationError("Age is more than 70 !")
        
    def __str__(self):
        return f"{self.firstname} {self.lastname}"
