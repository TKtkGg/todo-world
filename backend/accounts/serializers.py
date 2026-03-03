from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "password_confirm"]
        read_only_fields = ["id"]
    
    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({
                "password_confirm": "パスワードが一致しません。"
            })
        return attrs
    
    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )
        return user

class ProfileSerializer(serializers.Serializer):
    
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField()
    message = serializers.CharField(allow_blank=True, required=False)
    icon_url = serializers.CharField(allow_blank=True, required=False)

    def to_representation(self, instance):
        user = instance

        try:
            profile = user.profile
            message = profile.message or ""
            icon_url = profile.icon_url or ""
        except Profile.DoesNotExist:
            message = ""
            icon_url = ""

        return {
            "id": user.id,
            "username": user.username,
            "message": message,
            "icon_url": icon_url
        }
    
    def update(self, instance, validated_data):
        user = instance

        new_username = validated_data.get("username")
        if new_username is not None:
            user.username = new_username
            user.save()

        profile, _ = Profile.objects.get_or_create(user=user)

        new_message = validated_data.get("message")
        if new_message is not None:
            profile.message = new_message
        
        new_icon_url = validated_data.get("icon_url")
        if new_icon_url is not None:
            profile.icon_url = new_icon_url
        
        profile.save()

        return user

class UserWithIconSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField()
    icon_url = serializers.CharField(allow_blank=True, required=False)

    def to_representation(self, instance):
        user = instance
        try:
            profile = user.profile
            icon_url = profile.icon_url or ""
        except Profile.DoesNotExist:
            icon_url = ""

        return {
            "id": user.id,
            "username": user.username,
            "icon_url": icon_url,
        }
    
