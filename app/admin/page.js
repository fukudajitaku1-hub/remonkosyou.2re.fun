import { redirect } from "next/navigation";
import { getContent } from "../../lib/content";
import { isAuthenticated } from "../../lib/auth";
import { logoutAction, saveContentAction } from "./actions";

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

          {[0, 1].map((i) => {
            const r = recipe.recipes[i] || {};
            const groups = r.ingredientGroups || [];
            return (
              <fieldset className="admin-recipe" key={i}>
                <legend>レシピ{i + 1}</legend>
                <label>
                  写真パス
                  <input name={`recipe_r${i + 1}_photo`} defaultValue={r.photo || ""} />
                </label>
                <label>
                  タイトル
                  <input name={`recipe_r${i + 1}_title`} defaultValue={r.title || ""} />
                </label>
                <label>
                  リード文（任意）
                  <textarea name={`recipe_r${i + 1}_lead`} defaultValue={r.lead || ""} />
                </label>
                <label>
                  材料見出し
                  <input name={`recipe_r${i + 1}_ingredientsLabel`} defaultValue={r.ingredientsLabel || ""} />
                </label>
                <label>
                  材料グループ1見出し（任意）
                  <input name={`recipe_r${i + 1}_group1Label`} defaultValue={groups[0]?.label || ""} />
                </label>
                <label>
                  材料グループ1（1行に1項目）
                  <textarea
                    name={`recipe_r${i + 1}_group1Items`}
                    defaultValue={(groups[0]?.items || []).join("\n")}
                  />
                </label>
                <label>
                  材料グループ2見出し（任意）
                  <input name={`recipe_r${i + 1}_group2Label`} defaultValue={groups[1]?.label || ""} />
                </label>
                <label>
                  材料グループ2（1行に1項目、任意）
                  <textarea
                    name={`recipe_r${i + 1}_group2Items`}
                    defaultValue={(groups[1]?.items || []).join("\n")}
                  />
                </label>
                <label>
                  作り方（1行に1手順）
                  <textarea name={`recipe_r${i + 1}_steps`} defaultValue={(r.steps || []).join("\n")} />
                </label>
                <label>
                  ワンポイント見出し
                  <input name={`recipe_r${i + 1}_tipLabel`} defaultValue={r.tipLabel || ""} />
                </label>
                <label>
                  ワンポイント本文
                  <textarea name={`recipe_r${i + 1}_tip`} defaultValue={r.tip || ""} />
                </label>
                <label>
                  結びの文（任意）
                  <textarea name={`recipe_r${i + 1}_closing`} defaultValue={r.closing || ""} />
                </label>
              </fieldset>
            );
          })}
        </section>

        <button type="submit" className="cta-link admin-save">
          保存する
        </button>
      </form>
    </main>
  );
}
