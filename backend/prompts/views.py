from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PromptRequest
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import PromptRequestSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

class GeneratePromptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Provera usage limita
        if user.usage_count >= user.usage_limit:
            return Response(
                {"error": "Usage limit reached. Upgrade plan to generate more prompts."},
                status=403
            )

        raw_input = request.data.get("raw_input")
        ai_target = request.data.get("ai_target")
        mode = request.data.get("mode", "standard")
        character_limit = int(request.data.get("character_limit", 1500))

        # Generisanje prompta (ovo ćemo kasnije unaprediti)
        generated_prompt = f"""
        You are an expert AI.
        Target AI: {ai_target}
        Mode: {mode}
        Instructions:
        {raw_input}
        """
        generated_prompt = generated_prompt[:character_limit]

        # Čuvanje u bazi
        prompt_request = PromptRequest.objects.create(
            user=user,
            input_type="text",
            ai_target=ai_target,
            mode=mode,
            character_limit=character_limit,
            raw_input=raw_input,
            generated_prompt=generated_prompt
        )

        # Povećavamo broj korišćenja
        user.usage_count += 1
        user.save()

        return Response({
            "generated_prompt": generated_prompt,
            "usage_remaining": user.usage_limit - user.usage_count
        })



class MyPromptsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        prompts = PromptRequest.objects.filter(user=user).order_by("-created_at")
        serializer = PromptRequestSerializer(prompts, many=True)
        return Response(serializer.data)
    



class MyPromptsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PromptRequestSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["ai_target"]

    def get_queryset(self):
        user = self.request.user
        queryset = PromptRequest.objects.filter(user=user).order_by("-created_at")

        # FILTER po datumu (optional)
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date:
            queryset = queryset.filter(created_at__date__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__date__lte=end_date)

        return queryset
    
from rest_framework import status

class DeletePromptView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        try:
            prompt = PromptRequest.objects.get(pk=pk, user=user)
        except PromptRequest.DoesNotExist:
            return Response({"error": "Prompt not found"}, status=status.HTTP_404_NOT_FOUND)

        prompt.delete()
        return Response({"success": "Prompt deleted"}, status=status.HTTP_200_OK)