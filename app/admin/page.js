import { redirect } from "next/navigation";
import { getContent } from "../../lib/content";
import { isAuthenticated } from "../../lib/auth";
import { logoutAction, saveContentAction } from "./actions";
import RecipeEditor from "./RecipeEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage({ searchParams }) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const { home, recipe } = await getContent();

  return (
    <main className="admin-page">
      <div className="admin-topbar">
        <h1>管理画面</h1>
        <form action={logoutAction}>
          <button type="submit" className="admin-logout">
            ログアウト
          </button>
        </form>
      </div>

      {searchParams?.saved && <p className="admin-saved">保存しました。公開ページに反映されています。</p>}

      <form action={saveContentAction} className="admin-form">
        <section>
          <h2>トップページ</h2>
          <label>
            タイトル1行目
            <input name="home_titleLine1" defaultValue={home.titleLine1} />
          </label>
          <label>
            タイトル2行目
            <input name="home_titleLine2" defaultValue={home.titleLine2} />
          </label>
          <label>
            紹介文1
            <textarea name="home_intro1" defaultValue={home.intro[0] || ""} />
          </label>
          <label>
            紹介文2
            <textarea name="home_intro2" defaultValue={home.intro[1] || ""} />
          </label>
          <label>
            説明文1
            <textarea name="home_about1" defaultValue={home.about[0] || ""} />
          </label>
          <label>
            説明文2
            <textarea name="home_about2" defaultValue={home.about[1] || ""} />
          </label>

          <h3>商品情報</h3>
          <label>
            内容量
            <input name="home_productAmount" defaultValue={home.product.amount} />
          </label>
          <label>
            保存方法
            <textarea name="home_productStorage" defaultValue={home.product.storage} />
          </label>

          <h3>取り扱い店舗（最大4件。店舗名が空の行は保存されません）</h3>
          {[0, 1, 2, 3].map((i) => {
            const s = home.stores[i] || {};
            return (
              <div className="admin-row" key={i}>
                <label>
                  店舗名
                  <input name={`home_store${i + 1}_name`} defaultValue={s.name || ""} />
                </label>
                <label>
                  住所
                  <input name={`home_store${i + 1}_address`} defaultValue={s.address || ""} />
                </label>
              </div>
            );
          })}

          <h3>イベント情報（最大6件。イベント名が空の行は保存されません）</h3>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const e = home.events[i] || {};
            return (
              <div className="admin-row" key={i}>
                <label>
                  日時
                  <input name={`home_event${i + 1}_date`} defaultValue={e.date || ""} />
                </label>
                <label>
                  イベント名
                  <input name={`home_event${i + 1}_name`} defaultValue={e.name || ""} />
                </label>
                <label>
                  場所
                  <input name={`home_event${i + 1}_place`} defaultValue={e.place || ""} />
                </label>
              </div>
            );
          })}
        </section>

        <section>
          <h2>レシピページ</h2>
          <label>
            タイトル1行目
            <input name="recipe_titleLine1" defaultValue={recipe.titleLines[0] || ""} />
          </label>
          <label>
            タイトル2行目
            <input name="recipe_titleLine2" defaultValue={recipe.titleLines[1] || ""} />
          </label>
          <label>
            タイトル3行目
            <input name="recipe_titleLine3" defaultValue={recipe.titleLines[2] || ""} />
          </label>
          <label>
            紹介文
            <textarea name="recipe_intro" defaultValue={recipe.intro} />
          </label>

          <RecipeEditor initialRecipes={recipe.recipes} />
        </section>

        <button type="submit" className="cta-link admin-save">
          保存する
        </button>
      </form>
    </main>
  );
}
