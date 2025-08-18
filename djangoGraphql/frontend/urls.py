from django.urls import path

from .views import list_employees

urlpatterns = [
    path("" , view=list_employees , name="List Employees"),
]