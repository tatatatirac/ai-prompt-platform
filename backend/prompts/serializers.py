from rest_framework import serializers
from .models import PromptRequest

class PromptRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptRequest
        fields = "__all__"