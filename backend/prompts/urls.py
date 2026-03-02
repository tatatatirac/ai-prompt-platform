from django.urls import path
from .views import GeneratePromptView, MyPromptsView, DeletePromptView

urlpatterns = [
    path("generate/", GeneratePromptView.as_view(), name="generate"),
    path("my/", MyPromptsView.as_view(), name="my_prompts"),
    path("delete/<int:pk>/", DeletePromptView.as_view(), name="delete_prompt"),
]