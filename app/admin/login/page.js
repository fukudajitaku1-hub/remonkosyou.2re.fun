import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({ searchParams }) {
  return (
    <main className="admin-page admin-login">
      <h1>管理画面ログイン</h1>
      {searchParams?.error && <p className="admin-error">パスワードが違います。</p>}
      <form action={loginAction} className="admin-form">
        <label>
          パスワード
          <input type="password" name="password" required autoFocus />
        </label>
        <button type="submit" className="cta-link admin-save">
          ログイン
        </button>
      </form>
    </main>
  );
}
