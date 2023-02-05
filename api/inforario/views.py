from django.http import JsonResponse
from datetime import datetime
from urllib import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime

@api_view(["GET"])
def ver_horarios(request):
    dados = "dados"

    print("cheguei aqui")
    return Response(status=200, data= dados)