from django.shortcuts import render
from django.contrib.auth import authenticate

# Create your views here.
from rest_framework import generics
from rest_framework.authtoken.models  import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


from .serializers import *


class LoginView(generics.GenericAPIView):
	serializer_class = UserLoginSerializer

	def post(self, request, *args, **kwargs):
		data = request.data
		serializer = self.serializer_class(data=data)
		if serializer.is_valid():
			user = authenticate(email=data['email'], password=data['password'])
			if user:
				token, created = Token.objects.get_or_create(user=user)
				return Response({'token':token.key, 'userid':user.id}, status=status.HTTP_200_OK)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserData(ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class= UserSerializer
	queryset = User.objects.all()
