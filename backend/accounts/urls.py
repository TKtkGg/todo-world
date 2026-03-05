from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import MeView, ProfileView, RegisterView, UserLikeView, UserListView, UserProfileView, UserTodoListView, MyTodoListCreateView, MyTodoDetailView

urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("login", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("me", MeView.as_view(), name="me"),
    path("users", UserListView.as_view(), name="user_list" ),
    path("users/<int:pk>/profile", UserProfileView.as_view(), name="user_profile"),
    path("profile", ProfileView.as_view(), name="profile"),
    path("users/<int:pk>/todos", UserTodoListView.as_view(), name="user_todo_list"),
    path("me/todos", MyTodoListCreateView.as_view(), name="my_todo_list_create"),
    path("me/todos/<int:pk>", MyTodoDetailView.as_view(), name="my_todo_detail"),
    path("users/<int:pk>/like", UserLikeView.as_view(), name="user_like"),
]
