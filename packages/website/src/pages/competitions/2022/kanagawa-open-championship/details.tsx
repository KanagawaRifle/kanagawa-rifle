import Button from '@kanagawa-rifle/website/components/Button';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import * as React from 'react';

export default function Page() {
  return (
    <>
      <Meta title="大会実施要項" category="2022年度 神奈川オープン兼神奈川県ライフル射撃競技選手権大会" />

      <MainBody>
        <Breadcrumbs maxItems={2} className="text-sm">
          <Link href="/">KRA</Link>
          <Link href="/competitions">大会関係</Link>
          <Link href="/competitions/2022">2022年度</Link>
          <Link href="/competitions/2022/kanagawa-open-championship">
            神奈川オープン兼神奈川県ライフル射撃競技選手権大会
          </Link>
          <Typography className="text-white text-sm">大会実施要項</Typography>
        </Breadcrumbs>

        <h2 className="text-center text-xl">
          <span className="text-sm">2022年度 (令和4年度)</span>
          <br />
          <span className="text-sm">神奈川オープン兼神奈川県ライフル射撃競技選手権大会</span>
          <br />
          大会実施要項
        </h2>

        <div>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon fixedWidth={true} icon={faFilePdf} />}
            component={Link}
            href="/static/competitions/2022/kanagawa-open-championship/details.pdf"
          >
            大会実施要項
          </Button>
        </div>

        <h2 className="text-xl p-2">主催</h2>
        <div className="p-2">神奈川県ライフル射撃協会</div>
        <h2 className="text-xl p-2">主管</h2>
        <div className="p-2">神奈川県ライフル射撃協会</div>
        <h2 className="text-xl p-2">期日</h2>
        <p className="p-2">
          ２０２２年１１月６日（日） 競技
          <br />
          ※公開練習日は設けない
        </p>
        <h2 className="text-xl p-2">会場</h2>
        <div className="p-2">
          神奈川県立伊勢原射撃場
          <br />
          神奈川県伊勢原市上粕屋２３８０
          <br />
          TEL：046-392-7880
        </div>
        <h2 className="text-xl p-2">競技日程</h2>
        <div className="p-2">
          銃器服装検査 ８：００～１３：００
          <br />
          開会式、閉会式、および表彰式は実施しない
        </div>
        <h3 className="p-2 font-bold text-lg">１０ｍ射場</h3>
        <h4 className="p-2">ＡＲ、ＡＲＷ、ＡＰ、ＡＰＷ</h4>
        <div className="p-2">
          １射群 ９：１５～１０：３０（射座入 ８：５０）
          <br />
          ２射群 １１：１５～１２：３０（射座入 １０：５０）
          <br />
          ３射群 １３：３０～１４：４５（射座入 １３：０５）
        </div>
        <h4 className="p-2">ＢＲ、ＢＲＷ、ＢＰ、ＢＰＷ</h4>
        <div className="p-2">
          １射群 ９：１５～１０：００（射座入 ８：５５）
          <br />
          ２射群 １１：１５～１２：００（射座入 １０：５５）
          <br />
          ３射群 １３：３０～１４：１５（射座入 １３：１０）
        </div>
        <h3 className="p-2 font-bold text-lg">５０ｍ射場</h3>
        <h4 className="p-2">３✕２０</h4>
        <div className="p-2">
          １射群 ９：１５～１０：４５（射座入 ８：５０）
          <br />
          ２射群 １２：１５～１３：４５（射座入 １１：５０）
        </div>
        <h4 className="p-2">６０ＰＲ</h4>
        <div className="p-2">
          １射群 ９：１５～１０：０５（射座入 ８：５０）
          <br />
          ２射群 １１：１５～１２：０５（射座入１０：５０）
          <br />
          ３射群 １３：１５～１４：０５（射座入１２：５０）
        </div>
        <h2 className="text-xl p-2">競技規則</h2>
        <div className="p-2">
          公益社団法人日本ライフル射撃協会公式競技規則を適用する。
          <br />
          但し、各種目ともファイナル競技は実施しない。
        </div>
        <h2 className="text-xl p-2">使用標的</h2>
        <div className="p-2">
          ５０ｍ種目：公認電子標的（マイトン社製）
          <br />
          ５０ｍ種目：公認電子標的（マイトン社製）
          <br />
          ＢＲ・ＢＰ公認標的装置
        </div>
        <h2 className="text-xl p-2">種目・参加制限</h2>
        <div className="p-2">一人２種目まで 個人戦のみ</div>
        <h2 className="text-xl p-2">参加資格</h2>
        <div className="p-2">
          (公社）日本ライフル射撃協会の２０２２年度会員であること。
          <br />
          神奈川県ライフル射撃協会員は自動的に神奈川県選手権にエントリーするものとする。
        </div>
        <h2 className="text-xl p-2">表彰</h2>
        <div className="p-2">
          １位：選手権証、賞品
          <br />
          ２位～６位：賞状
          <br />
          全員：参加賞
          <br />
          (1) 参加人数が１０名に満たない種目については、１位から３位の表彰とし、選手権証の授与は行わない。
          <br />
          (2) 参加人数が５名に満たない種目については、表彰を行わない場合もある。
          <br />
          (3) 参加人数が３名に満たない種目については、競技を実施しない場合もある。
          <br />
          なお、県選手権参加者の成績は、神奈川県の強化・ジュニア強化の選手選考の参考にいたします。
        </div>
        <h2 className="text-xl p-2">参加料</h2>
        <div className="p-2">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>５０ｍ６０発種目</td>
                <td className="pl-4">７，０００円</td>
              </tr>
              <tr>
                <td>ＡＲ６０M／W</td>
                <td className="pl-4">３，０００円</td>
              </tr>
              <tr>
                <td>ＡＲ６０MＪ／WＪ</td>
                <td className="pl-4">２，５００円</td>
              </tr>
              <tr>
                <td>ＡＰ６０M／W</td>
                <td className="pl-4">４，５００円</td>
              </tr>
              <tr>
                <td>ＡＰ６０MＪ／WＪ</td>
                <td className="pl-4">４，０００円</td>
              </tr>
              <tr>
                <td>ＢＲ・ＢＰ</td>
                <td className="pl-4">２，５００円</td>
              </tr>
              <tr>
                <td>ＢＲ・ＢＰMＪ／WＪ</td>
                <td className="pl-4">２，０００円</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl p-2">申込方法</h2>
        <div className="p-2">
          神奈川県ラ大会申込書に記入し、参加料を振り込みの上、１０月２６日（水）までに必着するよう
          <Link href="https://forms.gle/bVxJWdBScvvguwbb8" target="_blank" rel="noreferrer">
            申込フォーム（推奨）
          </Link>
          、メール、ＦＡＸまたは郵送にて下記へ申し込むこと
          <br />
          ※所属、会員ＩＤ番号、段級位番号及びふりがな、スコープ付の有無を明記すること
          <br />
          ※会員ＩＤ番号及び段級位証書が未着の場合は、登録年月日を明記すること
          <br />
          ※抽選により参加不可の場合は返金
        </div>
        <div className="p-2">
          （申込先） 申込フォーム：
          <Link href="https://forms.gle/bVxJWdBScvvguwbb8" target="_blank" rel="noreferrer">
            https://forms.gle/bVxJWdBScvvguwbb8
          </Link>
          <br />
          メール：kraofficial@yahoo.co.jp <br />
          ＦＡＸ：046-833-6990（くりはま花の国エアライフル射撃場内）
          <br />
          〒２３９－０８３２
          <br />
          神奈川県横須賀市神明町１番地
          <br />
          くりはま花の国エアライフル射撃場内
          <br />
          神奈川県ライフル射撃協会 事務局 宛
        </div>
        <div className="p-2">
          （振込先）
          <br />
          ※①・②のいずれかを選択してください。
          <br />
          名義：①・②とも特定非営利活動法人神奈川県ライフル射撃協会
          <br />① ゆうちょ銀行
          <br />
          記号：10280 番号：79647111
          <br />② 湘南信用金庫 本店営業部 総合口座
          <br />
          口座番号：0360205
        </div>
        <h2 className="text-xl p-2">銃器弾薬</h2>
        <div className="p-2">
          各自が持参し、携帯・運搬及び保管については十分に注意すること。
          銃砲所持許可証、射手手帳および日ラ会員証を携帯し、銃器用具検査の際に提示すること。
        </div>
        <h2 className="text-xl p-2">大会責任者</h2>
        <div className="p-2">
          大会委員長 廣田 眞作
          <br />
          競技委員長 黒柳 育義
        </div>
        <h2 className="text-xl p-2">その他</h2>
        <div className="p-2">
          (1) 左利き射手は、申込用紙の備考欄に明記すること。
          <br />
          (2) 各参加者は本要項を周知すること。
          <br />
          (3) 次に該当する場合、大会参加を見合わせること。。
          <br />
          (ア) 体調がよくない場合（発熱・咳・咽頭痛などの症状がある場合）
          <br />
          (イ) 同居親族や身近な知人に感染もしくは感染が疑われる人がいる場合
          <br />
          (ウ) 過去１４日以内に政府から入国制限、入国後の観察期間を必要とされて
          いる国、地域等への渡航又は当該在住者との濃厚接触がある場合
          <br />
          (4) 感染防止のために主催者が決めた事項、主催者の指示に従うこと。
          <br />
          (5) マスクの着用、こまめな手洗い、装具等の消毒を徹底すること。
          <br />
          (6) 密の状態を作らないこと。
          <br />
          (7) 公式練習日は設けない。ただし、１１月５日の練習については伊勢原射撃場に直接個別に実施（有料、射座選択不可）
          <br />
          (8) サイトイン出来ていない状態での電子標的の使用不可。
          <br />
          黒点以外（標的マスク、標的前板、標的番号等）への意図的な発射不可（練習時も含む）。
          <br />
          (9)
          射座入り前の銃器の組立・準備等は射座後方のスペースで行うこと。この際必ずフラグを挿入し、ＳＢにあってはボルトを外すこと。
        </div>
        <h2 className="text-xl p-2">ライフル射撃に関する講習会／インテグリティ講習会</h2>
        <div className="p-2">
          ライフル射撃に関する講習会：
          <br />
          ＡＲ射場会議室 １５：００ごろ～
        </div>
        <div className="p-2">
          インテグリティ講習会：
          <br />
          ＳＢ射場会議室 １５：００ごろ～
        </div>
        <div className="text-lg p-2">受講申込</div>
        <div className="p-2">
          申込フォーム：
          <Link href="https://forms.gle/bVxJWdBScvvguwbb8" target="_blank" rel="noreferrer">
            https://forms.gle/bVxJWdBScvvguwbb8
          </Link>
          <br />
          メール：kraofficial@yahoo.co.jp <br />
          ＦＡＸ：046-833-6990（くりはま花の国エアライフル射撃場内）
          <br />
          〒２３９－０８３２
          <br />
          神奈川県横須賀市神明町１番地
          <br />
          くりはま花の国エアライフル射撃場内
          <br />
          神奈川県ライフル射撃協会 事務局 宛
        </div>
        <div className="text-lg p-2">受講料</div>
        <div className="p-2">ライフル射撃に関する講習会：３，０００円</div>
        <div className="text-lg p-2">その他</div>
        <div className="p-2">（１）インテグリティ講習会については事前学習課題を配布する。</div>
      </MainBody>
    </>
  );
}
