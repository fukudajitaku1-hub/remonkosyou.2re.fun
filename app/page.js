import { getContent } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { home } = await getContent();

  return (
    <main className="page">
      <header className="page-header">
        <h1>
          {home.titleLine1}
          <br />
          {home.titleLine2}
        </h1>
        <img
          className="page-header-icon"
          src="/images/lemon-kosho.jpg"
          alt="えっちゃんのレモンコショウ"
        />
        <section className="card-section">
          {home.intro.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </section>
      </header>

      <section className="card-section">
        {home.about.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        <a className="cta-link" href="/recipe">
          レシピを見る
        </a>
      </section>

      <section className="card-section">
        <h2>商品情報</h2>
        <div className="product-info">
          <img
            className="product-photo"
            src="/images/product-photo.jpg"
            alt="えっちゃんのレモンコショウ"
          />
          <dl className="spec-list">
            <div>
              <dt>内容量</dt>
              <dd>{home.product.amount}</dd>
            </div>
            <div>
              <dt>保存方法</dt>
              <dd>{home.product.storage}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="card-section">
        <h2>ご購入はこちらから（取り扱い店舗）</h2>
        <ul className="store-list">
          {home.stores.map((store, i) => (
            <li key={i}>
              <p className="store-name">{store.name}</p>
              <p className="store-address">{store.address}</p>
            </li>
          ))}
        </ul>
        <a
          className="cta-link"
          href="https://jp.mercari.com/user/profile/472016339"
          target="_blank"
          rel="noopener noreferrer"
        >
          メルカリで購入する
        </a>
      </section>

      <section className="card-section">
        <h2>イベント情報</h2>
        <ul className="event-list">
          {home.events.map((event, i) => (
            <li key={i}>
              <p className="event-date">{event.date}</p>
              <p className="event-name">{event.name}</p>
              <p className="event-place">{event.place}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
