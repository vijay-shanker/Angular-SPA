from django.conf.urls import url, include
from userprofile.views import *
from rest_framework.routers import DefaultRouter
from userprofile.views import UserData

urlpatterns = [
    url(r'^login/', LoginView.as_view(), name="login"),
    url(r'^upload-pic/$', UploadPicView.as_view(), name="upload_pic"),
    url(r'^logout/$', LogoutView.as_view(), name="logout"),
    ]

router = DefaultRouter()
router.register(r'users', UserData)
urlpatterns += router.urls