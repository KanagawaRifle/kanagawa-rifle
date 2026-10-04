import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import rifleShootingImage from '@/app/_assets/rifle-shooting.jpg';
import { getOpengraphImageUrl } from '@/lib/server';

import { CernBackground } from './_components';

export const metadata: Metadata = {
  title: '協会案内 | 横須賀市ライフル射撃協会【神奈川県】',
  description:
    '神奈川県横須賀市のライフル射撃団体。1957年創立。くりはま花の国エアライフル射撃場を拠点に活動。競技射撃の普及と技術向上を目指す。',
  keywords: ['ライフル射撃', '射撃協会', '横須賀市', '神奈川県', '射撃団体', 'くりはま花の国'],
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: '協会案内',
          subtitle: '横須賀市ライフル射撃協会の歴史と組織',
          theme: 'cern',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const boardMembers = [
  { role: '会長', name: '杉田　惺' },
  { role: '副会長', name: '山本勝巳' },
  { role: '副会長', name: '小牧　豊' },
  { role: '副会長', name: '坂本俊介' },
  { role: '理事長', name: '廣田眞作' },
  { role: '副理事長', name: '鈴木秀一' },
  { role: '監事', name: '山本雅章' },
  { role: '監事', name: '仁禮正美' },
  { role: '理事', name: '小室美栄子' },
  { role: '理事', name: '杉江養一' },
  { role: '理事', name: '鈴木康平' },
  { role: '理事', name: '栗山公秀' },
  { role: '理事', name: 'マティウスミカ' },
  { role: '理事', name: '菅原嗣高' },
  { role: '理事', name: '桂　玲子' },
  { role: '会計', name: '中村敬夫' },
  { role: '会計', name: '辻　薫' },
  { role: '相談役', name: '竹内英明' },
];

export default function AboutPage() {
  return (
    <CernBackground>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {' | '}
            <li>
              <Link href="/shooting-range">射撃場</Link>
            </li>
            {' | '}
            <li>
              <Link href="/competitions">競技会</Link>
            </li>
            {' | '}
            <li>
              <Link href="/projects">年間予定</Link>
            </li>
            {' | '}
            <li>
              <Link href="/links">リンク</Link>
            </li>
          </ul>
        </nav>
      </header>

      <h1>横須賀市ライフル射撃協会について</h1>

      <p>
        横須賀市ライフル射撃協会は、神奈川県横須賀市を拠点に活動するライフル射撃の競技団体です。
        競技射撃の普及と発展、および会員の技術向上を目指して活動しています。
      </p>

      <div style={{ margin: '2em 0' }}>
        <Image src={rifleShootingImage} alt="横須賀市ライフル射撃協会 - 神奈川県のライフル射撃団体" sizes="320px" />
      </div>

      <hr />

      <h2>協会の沿革</h2>

      <h3>1. 創立の経緯</h3>

      <p>
        本協会の歴史は、昭和32年（1957年）、ライフル射撃部門とクレー射撃部門を一括して「横須賀市射撃協会」として発足したことに始まる。
        そして、8年後の昭和40年に両部門が分離・独立するまでの期間は、本市射撃協会の初期発展期と位置づけることができる。
      </p>

      <p>
        当時、中央競技団体としてはすでに「
        <a href="http://www.riflesports.jp/" target="_blank" rel="noopener noreferrer">
          日本ライフル射撃協会
          <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
        </a>
        」および「日本クレー射撃協会」が設立されていたが、本市においては市内の諸猟友会を中心に構成され、
        会長には大久保吉雄氏が就任し、理事・役員には射撃競技経験者および猟友会関係者の中から選出された。
      </p>

      <p>
        活動当初は市内に射撃場が存在せず、自衛隊の協力を得て武山射撃場を借用し、臨時の許可を得て使用していた。
        このため、協会単独での利用はかなわず、競技大会は市内警察署、海上・陸上自衛隊、さらには在日米海軍との親善を目的とした合同行事として実施されていた。
      </p>

      <h3>2. 協会の独立</h3>

      <p>
        昭和40年、すでに独立していた上部組織である日本ライフル射撃協会および
        <a href="https://kraofficial.web.fc2.com/" target="_blank" rel="noopener noreferrer">
          神奈川県ライフル射撃協会
          <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
        </a>
        に倣い、「横須賀市ライフル射撃協会」として独立・発足した。
      </p>

      <p>
        会長には田村亀雄、理事長には伊藤洋三が外部より迎えられ、副会長およびその他の役員には、
        自衛隊ならびに市内関係機関の幹部が選出された。発足当初は自衛隊や警察などの関係者が主体であり、
        一般市民の参加はごく一部にとどまっていた。
      </p>

      <h3>3. 現在の協会</h3>

      <p>
        昭和48年、役員および組織の大規模な改選を行い、クレー射撃協会より青木良夫氏を会長に迎えて、
        民間人による協会として再編成・再出発した。これを機に、本協会は大口径ライフル、小口径ライフル、
        エアライフルの各部門において、幅広い活動を展開してきた。
      </p>

      <p>
        平成11年には、沢田市長および教育委員会の尽力により、
        <Link href="/shooting-range">くりはま花の国公園内に念願の屋内エアライフル射撃場</Link>
        が設置された。この射撃場は天候に左右されることなく、毎日8時30分から21時まで使用可能であり、
        以後の活動基盤として大きな役割を果たしている。
      </p>

      <p>
        さらに平成28年には、射撃場の大規模なリニューアルが行われ、電子標的や新型ビームライフルが導入された。
        これにより、国内外の競技規格に対応した練習環境が整備され、将来の選手育成に一層の弾みがついている。
      </p>

      <h3>4. 将来に向かって</h3>

      <ul>
        <li>
          競技射撃においては、多くの国体選手や海外で活躍する選手を輩出するため、 競技力の向上を目的とした
          <Link href="/competitions">競技会</Link>・強化練習・講習会等の充実を図る
        </li>
        <li>狩猟シーズンオフにおける狩猟銃の技術向上を目的として、競技会や練習会を充実させる</li>
        <li>身体に障害のある方々も楽しめるスポーツとしての普及を推進する</li>
        <li>年齢や性別を問わず、誰もが同じ土俵で競える生涯スポーツとしての位置づけを確立する</li>
      </ul>

      <hr />

      <h2>役員一覧</h2>

      <table>
        <thead>
          <tr>
            <th>役職</th>
            <th>氏名</th>
          </tr>
        </thead>
        <tbody>
          {boardMembers.map((member, idx) => (
            <tr key={idx}>
              <td>{member.role}</td>
              <td>{member.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>射撃場のスタッフ</h2>

      <dl>
        <dt>
          <Image
            src="/images/DSCF002211.jpg"
            width={150}
            height={112}
            sizes="150px"
            loading="lazy"
            alt="神奈川県射撃協会会長のプロフィール写真"
            style={{ marginTop: '1em' }}
          />
        </dt>
        <dd>
          神奈川県射撃協会会長他、胸にたくさんのバッヂをつけています。
          射撃界では「暴れん坊」と呼ばれているらしいが神経細やかな方です。
          前から見るとカウボーイ、後ろからみると江戸時代のちょんまげ風なヘアスタイルをした個性豊かな方です。
          狩猟時期になると猪や鹿などを捕獲し、自宅には数え切れないほどの銃があるとか?
        </dd>

        <dt>
          <Image
            src="/images/DSCF00241.jpg"
            width={150}
            height={112}
            sizes="150px"
            loading="lazy"
            alt="女性指導員のプロフィール写真"
            style={{ marginTop: '1em' }}
          />
        </dt>
        <dd>
          頭の切れがバツグンで実績のある監督さんです。
          小さなお子さんからお年寄りの方まで、多くの人に愛されているただ一人の女性指導員です。
          ただいま彼氏募集中です。（もの凄く面食いなので、自信のある方アタックしてみたら？）
        </dd>

        <dt>
          <Image
            src="/images/DSCF00201.jpg"
            width={150}
            height={112}
            sizes="150px"
            loading="lazy"
            alt="スタッフのプロフィール写真"
            style={{ marginTop: '1em' }}
          />
        </dt>
        <dd>
          髪の長さが1ｍ以上もある長身のお兄さんです。
          いつもＰＣ画面に向かって作業をしていますが、話しかけると話好きの真面目な方です。
          こちらも独身ですので、どなたか紹介してあげて～（面食いではないと思います）
        </dd>

        <dt>
          <Image
            src="/images/DSCF00181.jpg"
            width={150}
            height={112}
            sizes="150px"
            loading="lazy"
            alt="ベテランスタッフのプロフィール写真"
            style={{ marginTop: '1em' }}
          />
        </dt>
        <dd>
          高齢ですが、とても70歳代とは思えぬ筋肉マンです。 射撃場には手作りの懸垂があります。
          親切丁寧に教えてくださいます。女性には特に優しいですよ。
          撃った鳥をミンチにして作ったつくねはとても美味しいですよ。
        </dd>
      </dl>

      <hr />

      <h2>関連リンク</h2>

      <ul>
        <li>
          <a href="http://www.riflesports.jp/" target="_blank" rel="noopener noreferrer">
            日本ライフル射撃協会
            <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
          </a>
        </li>
        <li>
          <a href="https://kraofficial.web.fc2.com/" target="_blank" rel="noopener noreferrer">
            神奈川県ライフル射撃協会
            <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
          </a>
        </li>
        <li>
          <a href="http://yokosuka-sports.jp/" target="_blank" rel="noopener noreferrer">
            横須賀市スポーツ協会
            <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
          </a>
        </li>
      </ul>

      <p>
        その他のリンクは<Link href="/links">リンク集</Link>をご覧ください。
      </p>

      <hr />

      <address>
        横須賀市ライフル射撃協会
        <br />
        〒239-0832 神奈川県横須賀市神明町1番地
        <br />
        くりはま花の国 エアライフル射撃場内
      </address>
    </CernBackground>
  );
}
