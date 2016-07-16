from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
from django.conf import settings


class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ('Male','Male'),
        ('Female','Female')
    )
            
    email = models.EmailField(_('Email'),unique=True)
    
    username = models.CharField(_('User Name'),max_length=100, null=True)
    
    contact_no = models.CharField(
        _('Contact Number'),max_length=20, 
        null=True, blank=True)
    
    gender = models.CharField(
        _('Gender'),max_length=10, null=True, 
        blank=True, choices=GENDER_CHOICES )

    profile_pic = models.ImageField(upload_to='profilepics/', null=True)
    
    is_staff = models.BooleanField(
        _('Staff status'), default=False,
        help_text=_('whether the user can log into this admin '
                    'site.'))
    
    is_active = models.BooleanField(
        _('Active'), default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))

    date_joined = models.DateTimeField(_('date joined'),default=timezone.now)
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()
    
    def __unicode__(self):
        return "%s" % self.email
    
    def get_short_name(self):
        return self.username
    
    @property
    def get_splited_email(self):
        return self.email.split('@')[0]
    
    def save(self, *args, **kwargs):
        if all([self.is_superuser==False,  self.pk==None, self.has_usable_password()==False]) :
            self.set_password(self.password)
        super(User, self).save(*args, **kwargs)
