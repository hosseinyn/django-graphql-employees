import graphene
from graphene_django import DjangoObjectType

from .models import Employee

class EmployeeType(DjangoObjectType):
    class Meta:
        model = Employee
        fields = ("__all__")

class Query(graphene.ObjectType):
    all_employees = graphene.List(EmployeeType)

    def resolve_all_employees(root, info):
        return Employee.objects.all()
    
class CreateEmployee(graphene.Mutation):
    class Arguments:
        firstname = graphene.String()
        lastname = graphene.String()
        age = graphene.Int()
        hire_date = graphene.Date()

    employee = graphene.Field(EmployeeType)

    def mutate(root, info , firstname , lastname , age , hire_date):
        employee = Employee(firstname=firstname , lastname=lastname , age=age , hire_date=hire_date)
        employee.save()
        return CreateEmployee(employee=employee)
    
class EditEmployee(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        firstname = graphene.String()
        lastname = graphene.String()
        age = graphene.Int()
        hire_date = graphene.Date()

    employee = graphene.Field(EmployeeType)

    def mutate(root , info , firstname , lastname , age , hire_date , id):
        employee = Employee.objects.get(pk=id)
        if firstname:
            employee.firstname = firstname
        if lastname:
            employee.lastname = lastname
        if age:
            employee.age = age
        if hire_date:
            employee.hire_date = hire_date

        employee.save()

        return EditEmployee(employee=employee)
    
class DeleteEmployee(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(root , info , id):
        try :
            employee = Employee.objects.get(pk=id)

            employee.delete()

            return DeleteEmployee(ok=True)
        except Employee.DoesNotExist : 
            return DeleteEmployee(ok=False)
    

class Mutation(graphene.ObjectType):
    create_employee = CreateEmployee.Field()
    edit_employee = EditEmployee.Field()
    delete_employee = DeleteEmployee.Field()

schema = graphene.Schema(query=Query , mutation=Mutation)