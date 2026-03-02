from django.db import models
from django.conf import settings


class PromptRequest(models.Model):

    INPUT_TYPES = (
        ("text", "Text"),
        ("image", "Image"),
        ("repo", "Repository"),
        ("website", "Website"),
    )

    AI_TARGETS = (
        ("gpt", "GPT"),
        ("claude", "Claude"),
        ("midjourney", "Midjourney"),
    )

    MODES = (
        ("standard", "Standard"),
        ("api", "API"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    input_type = models.CharField(max_length=20, choices=INPUT_TYPES)
    ai_target = models.CharField(max_length=20, choices=AI_TARGETS)
    mode = models.CharField(max_length=20, choices=MODES)

    character_limit = models.IntegerField(default=1500)

    raw_input = models.TextField()
    generated_prompt = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.ai_target}"