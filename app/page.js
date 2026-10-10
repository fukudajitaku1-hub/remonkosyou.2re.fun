export default function Home() {
  return (
    <main className="page">
      <header className="page-header">
        <img
          className="page-header-icon"
          src="/images/lemon-kosho.jpg"
          alt="えっちゃんのレモンコショウ"
        />
        <h1>えっちゃんのレモンコショウ</h1>
        <p>武蔵国分寺からお届けする、発酵レモンコショウ。</p>
        <p>
          塩こうじをたっぷり使い、爽やかなレモンの香りと青唐辛子のピリっとした辛さを合わせた万能調味料です。
        </p>
      </header>

      <section className="card-section">
        <p>
          鍋料理、焼き魚、お肉、唐揚げ、餃子、パスタなど、いつもの料理がワンランクアップします。
        </p>
        <p>何度も試作を繰り返し、やっと完成しました。ぜひ一度お試しください。</p>
        <a className="cta-link" href="/recipe">
          レシピを見る
        </a>
      </section>

      <section className="card-section">
        <h2>商品情報</h2>
        <img
          className="recipe-photo"
          src="/images/product-photo.jpg"
          alt="えっちゃんのレモンコショウ"
        />
        <dl className="spec-list">
          <div>
            <dt>内容量</dt>
            <dd>100g</dd>
          </div>
          <div>
            <dt>保存方法</dt>
            <dd>
              直接日光・高温多湿を避けて常温保存。開封後は冷蔵庫で保存し、お早めにお召し上がりください。
            </dd>
          </div>
        </dl>
      </section>

      <section className="card-section">
        <h2>ご購入はこちらから（取り扱い店舗）</h2>
        <ul className="store-list">
          <li>
            <p className="store-name">なみき牧場</p>
            <p className="store-address">〒185-0005 東京都国分寺市並木町2-11-5</p>
          </li>
          <li>
            <p className="store-name">鉄板焼き 八七まる</p>
            <p className="store-address">〒185-0024 東京都国分寺市泉町3-26-27-B1</p>
          </li>
        </ul>
      </section>

      <section className="card-section">
        <h2>イベント情報</h2>
        <ul className="event-list">
          <li>
            <p className="event-date">10/18（日）11:00〜14:00</p>
            <p className="event-name">
              清水農園サンキュー♡ベジタブル ストリートファームライブ
            </p>
            <p className="event-place">東京都国分寺市北町5-6-6</p>
          </li>
          <li>
            <p className="event-date">10/24（土）11:00〜14:00</p>
            <p className="event-name">なみき牧場 秋マルシェ</p>
            <p className="event-place">東京都国分寺市並木町2-11-5</p>
          </li>
          <li>
            <p className="event-date">11/1（日）9:30〜15:30</p>
            <p className="event-name">国分寺まつり</p>
            <p className="event-place">
              東京都国分寺市泉町2-2-1 武蔵国分寺公園
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
