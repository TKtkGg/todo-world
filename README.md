# todo-world

React(Typescript) + Chakra UI + Django REST Framework で作る「ユーザー管理 + プロフィール + TODO」アプリです。  
ログインしたユーザーは **自分のプロフィール編集** と **自分専用のTODO CRUD** ができ、ユーザー一覧から **他ユーザー詳細（プロフィール + TODO閲覧 + いいね）** を見られます。

---

## できること（機能一覧）

### 認証（JWT）
- ユーザー登録 / ログイン（JWT 発行）
- 画面遷移の保護（未ログインならログイン画面へ）
- アクセストークン期限切れ時にリフレッシュして再取得

関連ファイル:
- フロント: `src/api/auth.ts`, `src/components/guard/ProtectedRoute.tsx`, `src/contexts/AuthContent.tsx`
- バック: `backend/accounts/urls.py`（`login`, `token/refresh`）, `backend/config/settings.py`（JWT設定）

### プロフィール
- 自分のプロフィール（ユーザ名 / メッセージ / アイコンURL）を取得・更新
- 他ユーザーのプロフィールを閲覧

関連ファイル:
- フロント: `src/api/profile.ts`, `src/components/pages/Profile.tsx`, `src/components/organisms/user/ProfileCard.tsx`, `src/components/pages/UserDetail.tsx`
- バック: `backend/accounts/models.py`（`Profile`）, `backend/accounts/serializers.py`（`ProfileSerializer`）, `backend/accounts/views.py`（`ProfileView`, `UserProfileView`）

### TODO（アカウントごとに独立 / 永続化）
- 自分の TODO を追加・完了・戻す・削除（バックエンドDBに保存）
- Home には「閲覧だけ」のプレビュー表示 + 「編集する」で TODO ページへ
- 他ユーザー詳細画面では、そのユーザーの TODO を閲覧（編集不可）

関連ファイル:
- フロント: `src/contexts/TodoContext.tsx`, `src/api/todo.ts`, `src/components/pages/TodoList.tsx`, `src/components/pages/Home.tsx`, `src/components/organisms/todo/TodoListPreview.tsx`
- バック: `backend/accounts/models.py`（`Todo`）, `backend/accounts/serializers.py`（`TodoSerializer`）, `backend/accounts/views.py`（`MyTodoListCreateView`, `MyTodoDetailView`, `UserTodoListView`）

### ユーザー一覧 / ユーザー詳細
- ユーザー一覧を表示（今は `username` + `icon_url`、将来的に TODO 等も追加予定）
- ユーザーをクリックで詳細へ（プロフィール + TODO + いいね）

関連ファイル:
- フロント: `src/hooks/useAllUsers.ts`, `src/api/users.ts`, `src/components/pages/userManagement.tsx`, `src/components/pages/UserDetail.tsx`, `src/components/organisms/user/UserCard.tsx`
- バック: `backend/accounts/views.py`（`UserListView`）, `backend/accounts/serializers.py`（`UserWithIconSerializer`）

### いいね（1ユーザーにつき1回）
- 自分以外のユーザーに「いいね」できる（同じ相手に複数回は不可）
- いいね済みかどうかを取得して UI を制御

関連ファイル:
- フロント: `src/api/like.ts`, `src/components/pages/UserDetail.tsx`
- バック: `backend/accounts/models.py`（`Like`）, `backend/accounts/views.py`（`UserLikeView`）

### エラーメッセージ（トースト）
- API エラーなどを Chakra UI の Toaster で表示

関連ファイル:
- `src/components/ui/toaster.tsx`, `src/hooks/useMessage.ts`, `src/App.tsx`

---

## 技術構成（ざっくり）

### フロントエンド
- React + TypeScript + Vite
- Chakra UI v3
- React Router

### バックエンド
- Django
- Django REST Framework
- JWT（`rest_framework_simplejwt`）
- DB: SQLite（`backend/db.sqlite3`）
- CORS（フロント `localhost:5173` から API を呼べる）

---

## 起動方法（開発）

> このリポジトリは **フロントとバックが別プロセス** です。  
> フロントの API ベースURLは `http://127.0.0.1:8000` に固定されています（例: `src/api/auth.ts`）。

### 1) バックエンド（Django）

```bash
cd backend
python -m venv .venv
source .venv/bin/activate

# requirements.txt は未同梱のため、必要なものを手動で入れます
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

python manage.py migrate
python manage.py runserver
```

API は `http://127.0.0.1:8000` で起動します。

### 2) フロントエンド（Vite）

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

---

## 画面（ルーティング）

ルーティングは `src/router/Router.tsx` と `src/router/HomeRoutes.tsx` にまとまっています。

- `/` 認証トップ（`AuthTop`）
- `/accounts/...` ログイン/登録など（`accountsRoutes`）
- `/home` ログイン後（ヘッダー付き）
  - `/home` Home（TODOプレビュー）
  - `/home/user_management` ユーザー一覧
  - `/home/user_management/:userId` ユーザー詳細
  - `/home/profile` 自分のプロフィール編集
  - `/home/todo_list` TODO編集

「ログインが必要な画面」は `ProtectedRoute` で守っています。

---

## フロントの要点（ファイル別に）

### `src/components/guard/ProtectedRoute.tsx`（ログイン必須ガード）

- `localStorage` の `accessToken` が無い場合 → ログインへ
- `accessToken` がある場合 → `/api/accounts/me` でユーザー情報取得
- 401 の場合は `refreshToken` を使って再取得（`src/api/auth.ts` 内）

抜粋:

```ts
// src/components/guard/ProtectedRoute.tsx
const accessToken = localStorage.getItem("accessToken")
if (!accessToken) {
  navigate("/accounts/login")
  setIsLoading(false)
  return
}

const run = async () => {
  try {
    const me = await fetchMe(accessToken)
    setUser(me)
  } catch {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/accounts/login")
  } finally {
    setIsLoading(false)
  }
}
run()
```

### `src/contexts/AuthContent.tsx`（認証状態の置き場）

アプリ全体で「ログイン中ユーザー」と「ロード中」を共有するための Context です。

```ts
// src/contexts/AuthContent.tsx（抜粋）
type AuthContextType = {
  user: MeResponse | null
  setUser: (user: MeResponse | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
```

### `src/contexts/TodoContext.tsx`（TODOのグローバル状態）

TODO は **ページをまたいで使う**（Home のプレビュー / TODO 編集ページなど）ので Context にまとめています。  
また、TODO は **ログインユーザー単位** なので `useAuth().user` が変わったら再取得します。

```ts
// src/contexts/TodoContext.tsx（抜粋）
useEffect(() => {
  if (!user) {
    setItems([])
    setLoading(false)
    return
  }
  let cancelled = false
  setLoading(true)
  fetchMyTodos()
    .then((data) => {
      if (!cancelled) setItems(data)
    })
    .catch(() => {
      if (!cancelled) setItems([])
    })
    .finally(() => {
      if (!cancelled) setLoading(false)
    })
  return () => {
    cancelled = true
  }
}, [user?.id])
```

### `src/api/*.ts`（フロント→バックの通信を1箇所に集約）

画面（コンポーネント）側に `fetch(...)` を散らさず、API 通信は `src/api/` にまとめています。

- `src/api/auth.ts` 認証・`/me` 取得・トークン更新
- `src/api/profile.ts` 自分/他人のプロフィール
- `src/api/todo.ts` 自分TODO CRUD / 他人TODO閲覧
- `src/api/users.ts` ユーザー一覧
- `src/api/like.ts` いいね状態取得 / いいね送信

例（プロフィール: snake_case を camelCase に寄せる）:

```ts
// src/api/profile.ts（抜粋）
return {
  id: raw.id,
  username: raw.username,
  message: raw.message,
  iconUrl: raw.icon_url ?? "",
}
```

### `src/components/ui/toaster.tsx` と `src/hooks/useMessage.ts`（トースト通知）

Chakra UI v3 の Toaster を「アプリで1つ」作って、どこからでも呼べるようにしています。

```ts
// src/hooks/useMessage.ts（抜粋）
toaster.create({
  title,
  type,
  duration: 2000,
  closable: true,
})
```

---

## バックエンドの要点（Django / DRF）

### URL の入口（`backend/config/urls.py`）

バックエンドは `/api/accounts/` 配下に `accounts` アプリをぶら下げています。

```py
# backend/config/urls.py
urlpatterns = [
  path("api/accounts/", include("accounts.urls")),
]
```

### モデル（`backend/accounts/models.py`）

DB に保存される形（テーブル定義）です。

- `Profile`: User と 1対1、`message` と `icon_url`
- `Todo`: User と 1対多、`text` と `is_completed`
- `Like`: User→User の関係。`unique_together` で「同じ相手に複数回いいね」を禁止

```py
# backend/accounts/models.py（抜粋）
class Todo(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="todos")
  text = models.CharField(max_length=500)
  is_completed = models.BooleanField(default=False)
```

### シリアライザ（`backend/accounts/serializers.py`）

「Python のモデル/オブジェクト ⇄ JSON」を変換する層です（フロントと話すための形を作る）。

例: `ProfileSerializer` は `User` と `Profile` をまたいで 1つの JSON にまとめます。

```py
# backend/accounts/serializers.py（抜粋）
def to_representation(self, instance):
  user = instance
  try:
    profile = user.profile
    message = profile.message or ""
    icon_url = profile.icon_url or ""
  except Profile.DoesNotExist:
    message = ""
    icon_url = ""
  return {"id": user.id, "username": user.username, "message": message, "icon_url": icon_url}
```

### ビュー（`backend/accounts/views.py`）

「HTTPリクエストが来たときに何をするか」を書く層です。

- `ProfileView`: 自分のプロフィール GET/PUT
- `MyTodoListCreateView`: 自分の TODO 一覧 GET / 作成 POST
- `MyTodoDetailView`: 自分の TODO の PATCH/DELETE（**本人のものだけ** `Todo.objects.get(pk=pk, user=request.user)`）
- `UserTodoListView`: 他ユーザーの TODO 一覧 GET
- `UserLikeView`: いいね状態 GET / いいね POST

```py
# backend/accounts/views.py（抜粋）
todo = Todo.objects.get(pk=pk, user=request.user)  # 他人のTODOは操作できない
```

---

## API 一覧（主要）

ベース: `http://127.0.0.1:8000/api/accounts`

| Method | Path | 説明 | 認証 |
|---|---|---|---|
| POST | `/register` | ユーザー登録 | 不要 |
| POST | `/login` | JWT取得（access/refresh） | 不要 |
| POST | `/token/refresh` | JWT更新 | 不要 |
| GET | `/me` | 自分のユーザー情報 | 必要 |
| GET | `/users` | ユーザー一覧 | 必要 |
| GET | `/profile` | 自分のプロフィール取得 | 必要 |
| PUT | `/profile` | 自分のプロフィール更新 | 必要 |
| GET | `/users/:id/profile` | 他ユーザーのプロフィール | 必要 |
| GET | `/me/todos` | 自分のTODO一覧 | 必要 |
| POST | `/me/todos` | TODO作成 | 必要 |
| PATCH | `/me/todos/:id` | TODO更新（完了/戻す等） | 必要 |
| DELETE | `/me/todos/:id` | TODO削除 | 必要 |
| GET | `/users/:id/todos` | 他ユーザーのTODO一覧 | 必要 |
| GET | `/users/:id/like` | いいね済みか | 必要 |
| POST | `/users/:id/like` | いいね送信 | 必要 |

実装は `backend/accounts/urls.py` を参照してください。

---

## フォルダ構成（目安）

```
.
├── backend/                  # Django / DRF
│   ├── config/               # settings.py / urls.py
│   └── accounts/             # models/serializers/views/urls
└── src/                      # React
    ├── api/                  # fetch を集約
    ├── components/           # pages / organisms / atoms など
    ├── contexts/             # Auth / Todo
    ├── hooks/                # useAllUsers, useMessage など
    ├── router/               # Router.tsx / HomeRoutes.tsx
    └── styles/               # todo.css（TODO UI）
```

---

## 注意点（開発向け）

- **トークン保管**: JWT は `localStorage` に保存しています（学習用の実装）。本番運用では XSS なども考慮して設計が必要です。
- **API_BASE_URL**: フロントは `127.0.0.1:8000` 固定のため、バックエンドの起動先を変える場合は `src/api/*.ts` を調整してください。
- **Django SECRET_KEY**: `backend/config/settings.py` に直書きされています（開発前提）。本番では環境変数化が必要です。

---

## 今後の拡張アイデア（メモ）

- ユーザー一覧に「アイコン」「TODOの一部」を表示（現在は username 中心）
- ページネーション（ユーザー一覧）
- TODO の並び替えや締切などの属性追加
- いいね数の表示（`likes_received` の集計）
