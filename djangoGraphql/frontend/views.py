from django.shortcuts import render

from employees.models import Employee
from .forms import EmployeeForm

# Create your views here.
def list_employees(request):
    all_employees = Employee.objects.all()
    return render(request , "list.html" , {"employees" : all_employees})