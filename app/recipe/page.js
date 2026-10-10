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

export default function Recipe() {
  return (
    <main className="page-recipe">
      <a className="back-link" href="/">
        ← トップへ戻る
      </a>

      <header className="recipe-header">
        <img
          className="recipe-header-icon"
          src="/images/lemon-kosho.jpg"
          alt="えっちゃんのレモンコショウ"
        />
        <h1>えっちゃんのレモンコショウ レシピ集</h1>
        <p>
          塩こうじをたっぷり使い、爽やかなレモンの香りと青唐辛子のピリっとした辛さを合わせた万能調味料「えっちゃんのレモンコショウ」を使った、おすすめレシピをご紹介します。
        </p>
      </header>

      <article className="recipe-card">
        <img
          className="recipe-photo"
          src="/images/recipe-chikuwa-cheese.jpg"
          alt="レモンコショウ香る♪ちくわチーズ"
        />
        <h2>❶ レモンコショウ香る♪ちくわチーズ</h2>

        <h3>材料（2人分）</h3>
        <ul className="ingredient-list">
          <li>ちくわ…4本</li>
          <li>スライスチーズ…2枚</li>
          <li>カニカマ…4本</li>
          <li>えっちゃんのレモンコショウ…小さじ1程度（お好みで）</li>
        </ul>

        <h3>作り方</h3>
        <ol className="step-list">
          <li>ちくわに縦に切り込みを入れます。</li>
          <li>半分に切ったスライスチーズを詰めます。</li>
          <li>カニカマをのせます。</li>
          <li>オーブントースターでチーズがとろけるまで約3〜5分焼きます。</li>
          <li>仕上げにえっちゃんのレモンコショウをのせたら完成！</li>
        </ol>

        <div className="tip-box">
          <p className="tip-label">ワンポイント</p>
          <p>
            レモンの爽やかな香りと青唐辛子のピリッとした辛さが、とろけるチーズと相性抜群！
            お酒のおつまみにはもちろん、お弁当のおかずにもおすすめです。
          </p>
        </div>
      </article>

      <article className="recipe-card">
        <img
          className="recipe-photo"
          src="/images/recipe-veggie-dip.jpg"
          alt="蒸し野菜とサラダチキンのレモンコショウヨーグルトディップ"
        />
        <h2>❷ 蒸し野菜とサラダチキンのレモンコショウヨーグルトディップ</h2>
        <p className="recipe-lead">
          野菜本来の甘みを引き立てる、さっぱりヘルシーなディップです。
          レモンの爽やかな香りと塩こうじの旨みで、野菜がどんどん進みます。
        </p>

        <h3>材料（2〜3人分）</h3>
        <p className="ingredient-group">【ディップ】</p>
        <ul className="ingredient-list">
          <li>プレーンヨーグルト（無糖）…大さじ3</li>
          <li>えっちゃんのレモンコショウ…小さじ1〜2（お好みで調整）</li>
        </ul>
        <p className="ingredient-group">【具材】</p>
        <ul className="ingredient-list">
          <li>サラダチキン</li>
          <li>れんこん</li>
          <li>かぼちゃ</li>
          <li>しいたけ</li>
          <li>こんにゃく</li>
          <li>お好みの温野菜</li>
        </ul>

        <h3>作り方</h3>
        <ol className="step-list">
          <li>ヨーグルトと「えっちゃんのレモンコショウ」をよく混ぜます。</li>
          <li>野菜は蒸すか電子レンジでやわらかく加熱します。</li>
          <li>サラダチキンと一緒に盛り付け、ディップを添えたら完成！</li>
        </ol>

        <div className="tip-box">
          <p className="tip-label">🍋 おいしく食べるポイント</p>
          <p>
            レモンの爽やかな香りと青唐辛子のほどよい辛み、塩こうじのまろやかな旨みがヨーグルトと相性抜群！
            野菜はもちろん、鶏むね肉・豚しゃぶ・エビ・スティック野菜にもよく合います。
          </p>
        </div>

        <p className="recipe-closing">
          「野菜をもっと美味しく、もっと楽しく。」
          <br />
          えっちゃんのレモンコショウで、いつもの食卓に爽やかなアクセントを加えてみませんか。
        </p>
      </article>
    </main>
  );
}
