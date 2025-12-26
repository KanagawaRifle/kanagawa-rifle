import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "協会案内＆STAFF紹介 | 横須賀市ライフル射撃協会",
  description:
    "協会案内＆STAFF紹介。神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-12">
      <div className="col-span-4">
        <Image
          src="/images/anim32.gif"
          alt="射撃を楽しもう"
          width={503}
          height={73}
          className="block"
        />
        <Image
          src="/images/logo11.jpg"
          alt=""
          width={285}
          height={99}
          className="block"
        />
        <Image
          src="/images/011.jpg"
          alt=""
          width={320}
          height={240}
          className="block"
        />
        <Image
          src="/images/DSCN00591.jpg"
          alt=""
          width={480}
          height={360}
          className="block"
        />
      </div>

      <div className="col-span-8 rounded border border-slate-300 p-4">
        <h3 className="text-xl font-bold">横須賀市ライフル射撃協会について</h3>
        <h4 className="mt-4 font-bold">1.沿革</h4>
        <p className="mt-2">
          昭和32（1957）年　横須賀市射撃協会（ライフル部門、クレー部門）
          <br />
          昭和40（1965）年　横須賀市ライフル射撃協会として分離独立
          <br />
          昭和48（1973）年　役員改選等により現在のライフル射撃協会の形態をとる
          <br />
          <br />
          昭和49年からの活動
          <br />
          春季大会、夏季大会、秋季大会、市民大会、市選手権大会、初心者講習会など
          <br />
          種目別では
          <br />
          大口径ライフル射撃
          <br />
          小口径ライフル射撃
          <br />
          エアーライフル射撃
          <br />
          ピストル射撃
        </p>
        <h4 className="mt-4 font-bold">2.現在の活動状況</h4>
        <p className="mt-2">
          エアライフル射撃部門では、月例射撃大会を行っている。各月下旬には、国際ルールによるエアーライフル立射60発競技会を、また初旬には狩猟用空気銃による射撃競技会を行っている。
          <br />
          大口径ライフル射撃部門では、埼玉県営長瀞射撃場で300ｍ射撃競技会を行っている。
          <br />
          射撃技能等各種講習会、初心者指導、ベテラン射手による勉強会などを実施して国内外における各種射撃種目に対応できる体制を整え、対外的には神奈川県ライフル射撃協会、日本ライフル射撃協会へ理事等役員派遣し、協力体制をとっている。
        </p>
        <h4 className="mt-4 font-bold">3.今後の活動</h4>
        <p className="mt-2">
          くりはま花の国エアーライフル射撃場開設により、初心者の指導、若手選手の育成に力を注いでいる。中でも、ジュニア選手の育成は、我が国の射撃界にとっても重要な課題であり世界的なレベルで通用する選手の育成に繋がるので、本協会でも今後の重要課題の一つである。
        </p>
        <h4 className="mt-4 font-bold">4.射撃場</h4>
        <p className="mt-2">
          この射撃場は横須賀市久里浜にある「くりはま花の国」の中にあり、神奈川公安委員会より、「銃砲刀剣類所持等取締法第9条の2第1項」の規定に基づき指定されている日本ライフル射撃協会公認の横須賀市営射撃場です。
          <br />
          銃刀法による空気銃の射撃場であり、ＢＢ弾を使用するトイガン（玩具扱いの方）の射撃場ではございませんのでご注意ください。
          <br />
          銃刀法による銃所持者でなくても楽しめるビームライフルもおいてあります。
        </p>
      </div>

      <div className="col-span-6 rounded border border-slate-300 p-4">
        <Image
          src="/images/button21.gif"
          width={295}
          height={69}
          alt="射撃場のスタッフです"
        />
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <Image
              src="/images/DSCF002211.jpg"
              width={150}
              height={112}
              alt=""
              className="block"
            />
          </div>
          <div className="col-span-9">
            神奈川県射撃協会会長他、胸にたくさんのバッヂをつけています。
            <br />
            射撃界では「暴れん坊」と呼ばれているらしいが神経細やかな方です。
            <br />
            前から見るとカウボーイ、後ろからみると江戸時代のちょんまげ風なヘアスタイルをした個性豊かな方です。
            <br />
            狩猟時期になると猪や鹿などを捕獲し、自宅には数え切れないほどの銃があるとか?
          </div>
          <div className="col-span-3">
            <Image
              src="/images/DSCF00241.jpg"
              width={150}
              height={112}
              alt=""
              className="block"
            />
          </div>
          <div className="col-span-9">
            頭の切れがバツグンで実績のある監督さんです。
            <br />
            小さなお子さんからお年寄りの方まで、多くの人に愛されているただ一人の女性指導員です。
            <br />
            ただいま彼氏募集中です。
            <br />
            （もの凄く面食いなので、自信のある方アタックしてみたら？）
          </div>
          <div className="col-span-3">
            <Image
              src="/images/DSCF00201.jpg"
              width={150}
              height={112}
              alt=""
              className="block"
            />
          </div>
          <div className="col-span-9">
            髪の長さが1ｍ以上もある長身のお兄さんです。
            <br />
            いつもＰＣ画面に向かって作業をしていますが、話しかけると話好きの真面目な方です。
            <br />
            こちらも独身ですので、どなたか紹介してあげて～
            <br />
            （面食いではないと思います）
          </div>
          <div className="col-span-3">
            <Image
              src="/images/DSCF00181.jpg"
              width={150}
              height={112}
              alt=""
              className="block"
            />
          </div>
          <div className="col-span-9">
            高齢ですが、とても70歳代とは思えぬ筋肉マンです。
            <br />
            射撃場には手作りの懸垂があります。
            <br />
            親切丁寧に教えてくださいます。女性には特に優しいですよ。
            <br />
            撃った鳥をミンチにして作ったつくねはとても美味しいですよ。
          </div>
        </div>
      </div>

      <div className="col-span-6 rounded border border-slate-300 p-4">
        <Image
          src="/images/logo1.jpg"
          width={320}
          height={88}
          alt="横須賀市ライフル射撃協会理事・役員"
        />
        <table className="mt-4 w-full border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 px-4 py-2 text-left">
                役 職 名
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left">
                氏　名
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left">
                役 職 名
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left">
                氏　名
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2">会　長</td>
              <td className="border border-slate-300 px-4 py-2">杉田　惺</td>
              <td className="border border-slate-300 px-4 py-2" rowSpan={7}>
                理　事
              </td>
              <td className="border border-slate-300 px-4 py-2">小室美栄子</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2" rowSpan={3}>
                副会長
              </td>
              <td className="border border-slate-300 px-4 py-2">山本勝巳</td>
              <td className="border border-slate-300 px-4 py-2">杉江養一</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">小牧　豊</td>
              <td className="border border-slate-300 px-4 py-2">鈴木康平</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">坂本俊介</td>
              <td className="border border-slate-300 px-4 py-2">栗山公秀</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">理事長</td>
              <td className="border border-slate-300 px-4 py-2">廣田眞作</td>
              <td className="border border-slate-300 px-4 py-2">
                マティウスミカ
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2" rowSpan={2}>
                副理事長
              </td>
              <td className="border border-slate-300 px-4 py-2">鈴木秀一</td>
              <td className="border border-slate-300 px-4 py-2">菅原嗣高</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2"></td>
              <td className="border border-slate-300 px-4 py-2">桂　玲子</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2" rowSpan={3}>
                監　事
              </td>
              <td className="border border-slate-300 px-4 py-2">山本雅章</td>
              <td className="border border-slate-300 px-4 py-2" rowSpan={2}>
                会　計
              </td>
              <td className="border border-slate-300 px-4 py-2">中村敬夫</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">仁禮正美</td>
              <td className="border border-slate-300 px-4 py-2">辻　薫</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2"></td>
              <td className="border border-slate-300 px-4 py-2">相談役</td>
              <td className="border border-slate-300 px-4 py-2">竹内英明</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
