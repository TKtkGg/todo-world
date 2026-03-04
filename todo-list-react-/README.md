# React学習用TODOアプリ

React初心者がReactの基本を学習するために作成したシンプルなTODOアプリです。

## 学習目的

このプロジェクトでは、以下のReactの基本概念を実践的に学習できます：

- コンポーネントの作成と分割
- `useState`を使った状態管理
- propsによるデータの受け渡し
- イベントハンドリング
- 配列操作（追加・削除・移動）
- 条件付きレンダリング

## アプリの機能

- TODOの追加
- 未完了TODOの完了への移動
- 完了TODOの未完了への戻し
- TODOの削除
- 未完了TODOの上限管理（最大5件）

## ファイル構成

### メインファイル

#### `src/main.jsx`

アプリケーションのエントリーポイントです。`Todo`コンポーネントをルート要素にマウントします。

```javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Todo />
  </StrictMode>
)
```

#### `src/Todo.jsx`

アプリケーションの中心となるコンポーネントです。以下の状態管理を行っています：

- `todoText`：入力中のTODOテキスト
- `incompleteTodos`：未完了のTODOリスト
- `completeTodos`：完了済みのTODOリスト

主な関数：

- `onChangeTodoText`：入力フィールドの変更を処理
- `onClickAdd`：新しいTODOを未完了リストに追加
- `onClickDelete`：未完了リストからTODOを削除
- `onClickComplete`：未完了から完了へTODOを移動
- `onClickBack`：完了から未完了へTODOを戻す

### コンポーネントファイル

#### `src/components/InputTodo.jsx`

TODOの入力フォームコンポーネントです。

- props：`todoText`, `onChange`, `onClick`, `disabled`
- 未完了TODOが5件に達すると入力が無効化されます

#### `src/components/IncompleteTodos.jsx`

未完了のTODOを表示するコンポーネントです。

- props：`todos`, `onClickComplete`, `onClickDelete`
- 各TODOに「完了」と「削除」ボタンを表示

#### `src/components/CompleteTodos.jsx`

完了済みのTODOを表示するコンポーネントです。

- props：`todos`, `onClick`
- 各TODOに「戻す」ボタンを表示

## 学習ポイント

### 1. コンポーネント分割

アプリを小さなコンポーネントに分割することで、コードの再利用性と保守性を向上させています。

### 2. useState フック

`useState`を使って、TODOのテキストやリストの状態を管理しています。

### 3. propsの活用

親コンポーネント（`Todo`）から子コンポーネントへデータと関数を渡すことで、コンポーネント間の連携を実現しています。

### 4. 配列の操作

スプレッド構文（`...`）と`splice`を使って、配列の追加・削除・移動を実装しています。

```javascript
const newTodos = [...incompleteTodos, todoText];  // 追加
newTodos.splice(index, 1);  // 削除
```

### 5. 条件付きレンダリング

未完了TODOが5件以上の場合に警告メッセージを表示する条件分岐を実装しています。

```javascript
{isMaxLimitIncompleteTodos && (
  <p style={{ color:"red"}}>TODOが多すぎます！</p>
)}
```

## 開発環境

- React 19.2.4
- Vite 7.3.1
- ESLint（コード品質管理）

このプロジェクトは、Reactの基礎を理解し、実際に動くアプリケーションを作る経験を積むための学習教材として最適です。
