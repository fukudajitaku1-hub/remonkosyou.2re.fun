import { Fragment } from "react";
import { getContent } from "../../lib/content";

export const dynamic = "force-dynamic";

const title = "レシピ集";
const description =
  "えっちゃんのレモン胡椒を使ったおすすめレシピ。ちくわチーズと、蒸し野菜とサラダチキンのヨーグルトディップをご紹介します。";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/recipe",
  },
  openGraph: {
    title,
    description,
    url: "https://remonkosyou.2re.fun/recipe",
    images: [{ url: "/images/recipe-veggie-dip.jpg", width: 900, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/recipe-veggie-dip.jpg"],
  },
};

export default async function Recipe() {
  const { recipe } = await getContent();

  return (
    <main className="page">
      <a className="back-link" href="/">
        ← トップへ戻る
      </a>

      <header className="page-header">
        <img
          className="page-header-icon"
          src="/images/lemon-kosho.jpg"
          alt="えっちゃんのレモンコショウ"
        />
        <h1>
          {recipe.titleLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p>{recipe.intro}</p>
      </header>

      {recipe.recipes.map((r, i) => (
        <article className="card-section" key={i}>
          <img className="recipe-photo" src={r.photo} alt={r.title} />
          <h2>{r.title}</h2>
          {r.lead && <p className="recipe-lead">{r.lead}</p>}

          <h3>{r.ingredientsLabel}</h3>
          {r.ingredientGroups.map((group, gi) => (
            <Fragment key={gi}>
              {group.label && <p className="ingredient-group">{group.label}</p>}
              <ul className="ingredient-list">
                {group.items.map((item, ii) => (
                  <li key={ii}>{item}</li>
                ))}
              </ul>
            </Fragment>
          ))}

          <h3>作り方</h3>
          <ol className="step-list">
            {r.steps.map((step, si) => (
              <li key={si}>{step}</li>
            ))}
          </ol>

          <div className="tip-box">
            <p className="tip-label">{r.tipLabel}</p>
            <p>{r.tip}</p>
          </div>

          {r.closing && (
            <p className="recipe-closing">
              {r.closing.split("\n").map((line, li) => (
                <Fragment key={li}>
                  {li > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </p>
          )}
        </article>
      ))}
    </main>
  );
}
