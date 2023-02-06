from django.http import JsonResponse
from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from boto3.dynamodb.conditions import Key
from rest_framework import status
from datetime import datetime
import os
from dotenv import load_dotenv
import boto3

load_dotenv()

def start():
    client = boto3.client(
        'dynamodb',
        region_name = 'eu-west2',
        aws_access_key_id=str(os.getenv("DJANGO_ACCESS_KEY")),
        aws_secret_access_key=str(os.getenv("DJANGO_SECRET_KEY")),
        )

    dynamodb = boto3.resource(
        'dynamodb',
        region_name = 'eu-west-2',
        aws_access_key_id=str(os.getenv("DJANGO_ACCESS_KEY")),
        aws_secret_access_key=str(os.getenv("DJANGO_SECRET_KEY")),
        )

    ddb_exceptions = client.exceptions

    return client, dynamodb, ddb_exceptions

@api_view(["GET","POST"])
def ver_horarios(request):
    request_data = request.data
    username = request_data["username"]

    client, dynamodb, ddb_exceptions = start()

    table = dynamodb.Table("Horarios") 

    response = table.scan()

    data = response['Items']

    horario_list = list()

    for item in data:
        if item["username"] == username:
            itemDict = {
                "nome": item["nomeHorario"],
            }
            horario_list.append(itemDict)

    return Response(status=200, data= horario_list)

@api_view(["POST"])
def criar_novo_horario(request):

    request_data = request.data

    nome_horario = request_data["nome_horario"]
    username = request_data["username"]

    client, dynamodb, ddb_exceptions = start()

    table = dynamodb.Table("Horarios") 

    numberofElements = len(table.scan()["Items"])

    table.put_item(Item = {
        "numberId": numberofElements, 
        "username": username,
        "nomeHorario": nome_horario
    })


    return Response(status=200)