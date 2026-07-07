from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *

#parish views
from rest_framework.response import Response
from rest_framework.views import APIView

class ParishInformationView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        parish = ParishInformation.objects.first()
        serializer = ParishInformationSerializer(parish)
        return Response(serializer.data)
    
#hero views
class HeroSectionView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        hero = HeroSection.objects.filter(is_active=True).first()
        serializer = HeroSectionSerializer(hero)
        return Response(serializer.data)
    
 #Leadership views   
class LeadershipListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Leadership.objects.filter(is_active=True)
    serializer_class = LeadershipSerializer
    
#Mass Schedule views
class MassScheduleListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = MassSchedule.objects.filter(is_active=True).order_by("display_order","start_time")
    serializer_class = MassScheduleSerializer
    
#Statistic views 
class StatisticListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Statistic.objects.filter(is_active=True).order_by("display_order")
    serializer_class = StatisticSerializer
    
#saint views
class SaintListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Saint.objects.filter(is_active=True).order_by("display_order")
    serializer_class = SaintSerializer