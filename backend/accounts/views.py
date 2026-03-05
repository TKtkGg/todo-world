from rest_framework import generics, permissions, status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

from .serializers import ProfileSerializer, RegisterSerializer, TodoSerializer, UserWithIconSerializer

from .models import Like, Todo

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
            }
        )

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithIconSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(instance=request.user)
        return Response(serializer.data)

    def put(self,request):
        serializer = ProfileSerializer(instance=request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("ユーザーが見つかりません")
        serializer = ProfileSerializer(instance=user)
        return Response(serializer.data)

class UserTodoListView(APIView):
    permission_classes = {permissions.IsAuthenticated}

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("ユーザーが見つかりません。")
        todos = Todo.objects.filter(user=user).order_by("id")
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

class MyTodoListCreateView(APIView):
    permision_classes = {permissions.IsAuthenticated}

    def get(self, request):
        todos = Todo.objects.filter(user=request.user).order_by("id")
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        text = request.data.get("text") or ""
        text = text.strip()
        if not text:
            return Response(
                {"text": ["このフィールドは空にできません。"]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        todo = Todo.objects.create(user=request.user, text=text, is_completed=False)
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MyTodoDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_todo(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk, user=request.user)
            return todo
        except Todo.DoesNotExist:
            raise NotFound("TODOが見つかりません。")

    def patch(self, request, pk):
        todo = self.get_todo(request, pk)
        if "is_completed" in request.data:
            todo.is_completed = bool(request.data["is_completed"])
        if "text" in request.data:
            todo.text = (request.data["text"] or "").strip() or todo.text
        todo.save()
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def delete(self, request, pk):
        todo = self.get_todo(request, pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        if request.user.pk == pk:
            return Response({"liked": False})
        exists = Like.objects.filter(from_user=request.user, to_user_id=pk).exists()
        return Response({"liked": exists})
    
    def post(self, request, pk):
        if request.user.pk == pk:
            return Response(
                {"detail": "自分にはいいねできません。"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            to_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("ユーザーが見つかりません。")
        obj, created = Like.objects.get_or_create(
            from_user=request.user,
            to_user=to_user,
        )

        if not created: 
            return Response(
                {"detail": "すでにいいねしています。"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({"liked": True}, status=status.HTTP_201_CREATED)