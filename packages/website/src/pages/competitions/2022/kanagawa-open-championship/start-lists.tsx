import * as React from 'react';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import Button from '@kanagawa-rifle/website/components/Button';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="射座割表" category="2022年度 神奈川オープン兼神奈川県ライフル射撃競技選手権大会" />

      <MainBody>
        <Breadcrumbs maxItems={2} className="text-sm">
          <Link href="/">KRA</Link>
          <Link href="/competitions">大会関係</Link>
          <Link href="/competitions/2022">2022年度</Link>
          <Link href="/competitions/2022/kanagawa-open-championship">
            神奈川オープン兼神奈川県ライフル射撃競技選手権大会
          </Link>
          <Typography className="text-white text-sm">射座割表</Typography>
        </Breadcrumbs>

        <h2 className="text-center text-xl">
          <span className="text-sm">2022年度 (令和4年度)</span>
          <br />
          <span className="text-sm">神奈川オープン兼神奈川県ライフル射撃競技選手権大会</span>
          <br />
          射座割表
        </h2>

        <div>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon fixedWidth={true} icon={faFilePdf} />}
            component={Link}
            href="/static/competitions/2022/kanagawa-open-championship/startlists.pdf"
          >
            射座割表
          </Button>
        </div>

        <h2 className="text-xl pt-4 pb-2 px-4">10mAP60WJ １射群</h2>
        <div className="py-2 px-4">08:50射座入 09:15～10:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">1-2</td>
              <td className="p-2">
                <ruby>
                  齋藤 梨衣
                  <rt>サイトウ リイ</rt>
                </ruby>
              </td>
              <td className="p-2">37 018 306</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mAP60MJ １射群</h2>
        <div className="py-2 px-4">08:50射座入 09:15～10:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">1-3</td>
              <td className="p-2">
                <ruby>
                  鬼丸 凛太郎
                  <rt>オニマル リンタロウ</rt>
                </ruby>
              </td>
              <td className="p-2">39 021 457</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mARS60MJ・WJ １射群</h2>
        <div className="py-2 px-4">08:50射座入 09:15～10:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">1-5</td>
              <td className="p-2">
                <ruby>
                  横尾 憲信
                  <rt>ヨコオ ケンシン</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 098</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-6</td>
              <td className="p-2">
                <ruby>
                  八谷佳樹
                  <rt>ハチヤヨシキ</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 099</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-7</td>
              <td className="p-2">
                <ruby>
                  斉藤 直人
                  <rt>サイトウ ナオト</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 123</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-8</td>
              <td className="p-2">
                <ruby>
                  遠藤美波
                  <rt>エンドウミナミ</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 771</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-9</td>
              <td className="p-2">
                <ruby>
                  馬場 春奈
                  <rt>ババ ハルナ</rt>
                </ruby>
              </td>
              <td className="p-2">43 027 696</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mARS60M １射群</h2>
        <div className="py-2 px-4">08:50射座入 09:15～10:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">1-10</td>
              <td className="p-2">
                <ruby>
                  河端 晋<rt>カワバタ シン</rt>
                </ruby>
              </td>
              <td className="p-2">40 024 565</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-11</td>
              <td className="p-2">
                <ruby>
                  諏訪部 竹彦
                  <rt>スワベ タケヒコ</rt>
                </ruby>
              </td>
              <td className="p-2">26 001 997</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-12</td>
              <td className="p-2">
                <ruby>
                  荒木 基励
                  <rt>アラキ モトイ</rt>
                </ruby>
              </td>
              <td className="p-2">39 022 894</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-13</td>
              <td className="p-2">
                <ruby>
                  久保田 佑<rt>クボタ タスク</rt>
                </ruby>
              </td>
              <td className="p-2">40 024 364</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-14</td>
              <td className="p-2">
                <ruby>
                  鈴木 滉之亮
                  <rt>スズキ コウノスケ</rt>
                </ruby>
              </td>
              <td className="p-2">38 021 115</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mBRS60MJ １射群</h2>
        <div className="py-2 px-4">08:55射座入 09:15～10:00</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">1-16</td>
              <td className="p-2">
                <ruby>
                  浅香 彪馬
                  <rt>アサカ ヒョウマ</rt>
                </ruby>
              </td>
              <td className="p-2">44 030 268</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-17</td>
              <td className="p-2">
                <ruby>
                  鬼丸理央
                  <rt>オニマル リオ</rt>
                </ruby>
              </td>
              <td className="p-2">41 025 764</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-18</td>
              <td className="p-2">
                <ruby>
                  河端時生
                  <rt>カワバタ トキオ</rt>
                </ruby>
              </td>
              <td className="p-2">39 023 001</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-19</td>
              <td className="p-2">
                <ruby>
                  實川 巧起
                  <rt>ジツカワ コウキ</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 085</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-20</td>
              <td className="p-2">
                <ruby>
                  越坂昊立
                  <rt>コシサカ コウタ</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 096</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-21</td>
              <td className="p-2">
                <ruby>
                  千野希良人
                  <rt>チノ キラト</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 762</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-22</td>
              <td className="p-2">
                <ruby>
                  山田睦己
                  <rt>ヤマダ ムツキ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 680</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">1-23</td>
              <td className="p-2">
                <ruby>
                  和田 晃輝
                  <rt>ワダ コウキ</rt>
                </ruby>
              </td>
              <td className="p-2">44 028 959</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mAP60W ２射群</h2>
        <div className="py-2 px-4">10:55射座入 11:15～12:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">2-2</td>
              <td className="p-2">
                <ruby>
                  <rt></rt>
                </ruby>
              </td>
              <td className="p-2"></td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mAP60M ２射群</h2>
        <div className="py-2 px-4">10:55射座入 11:15～12:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">2-3</td>
              <td className="p-2">
                <ruby>
                  <rt></rt>
                </ruby>
              </td>
              <td className="p-2"></td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mARS60M・W ２射群</h2>
        <div className="py-2 px-4">10:55射座入 11:15～12:30</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">2-5</td>
              <td className="p-2">
                <ruby>
                  宇田 博<rt>ウダ ヒロシ</rt>
                </ruby>
              </td>
              <td className="p-2">32 010 551</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-6</td>
              <td className="p-2">
                <ruby>
                  板橋 聖<rt>イタバシ ショウ</rt>
                </ruby>
              </td>
              <td className="p-2">39 021 693</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-7</td>
              <td className="p-2">
                <ruby>
                  平井爽太
                  <rt>ヒライ ソウタ</rt>
                </ruby>
              </td>
              <td className="p-2">39 022 890</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-8</td>
              <td className="p-2">
                <ruby>
                  髙山 正大
                  <rt>タカヤマ マサヒロ</rt>
                </ruby>
              </td>
              <td className="p-2">36 016 624</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-9</td>
              <td className="p-2">
                <ruby>
                  山田怜旺
                  <rt>ヤマダ レオ</rt>
                </ruby>
              </td>
              <td className="p-2">32 010 551</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-10</td>
              <td className="p-2">
                <ruby>
                  三浦 雅功
                  <rt>ミウラ マサトシ</rt>
                </ruby>
              </td>
              <td className="p-2">33 012 975</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-11</td>
              <td className="p-2">
                <ruby>
                  實川 佳那
                  <rt>ジツカワ カナ</rt>
                </ruby>
              </td>
              <td className="p-2">39 022 668</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-12</td>
              <td className="p-2">
                <ruby>
                  岩佐白雪
                  <rt>イワサユキ</rt>
                </ruby>
              </td>
              <td className="p-2">44 089 801</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-13</td>
              <td className="p-2">
                <ruby>
                  八木優希子
                  <rt>ヤギユキコ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 804</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-14</td>
              <td className="p-2">
                <ruby>
                  金 超越
                  <rt>キン チョウエツ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 802</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-15</td>
              <td className="p-2">
                <ruby>
                  三ツ木 俊之
                  <rt>ミツギ トシユキ</rt>
                </ruby>
              </td>
              <td className="p-2">38 021 372</td>
              <td className="p-2 pr-4">日障連</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mBRS60MJ ２射群</h2>
        <div className="py-2 px-4">10:30射座入 10:50～11:35</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">2-17</td>
              <td className="p-2">
                <ruby>
                  <rt></rt>
                </ruby>
              </td>
              <td className="p-2"></td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-18</td>
              <td className="p-2">
                <ruby>
                  ギャンビル ウィリアム 海音
                  <rt>ギャンビル ウィリアム カイト</rt>
                </ruby>
              </td>
              <td className="p-2">38 020 312</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mBRS60WJ ２射群</h2>
        <div className="py-2 px-4">10:30射座入 10:50～11:35</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">2-19</td>
              <td className="p-2">
                <ruby>
                  佐伯寧羽
                  <rt>サエキ ヤスハ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 053</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-20</td>
              <td className="p-2">
                <ruby>
                  芳賀涼華
                  <rt>ハガ スズカ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 050</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-21</td>
              <td className="p-2">
                <ruby>
                  田中美乃梨
                  <rt>タナカ ミノリ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 055</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-22</td>
              <td className="p-2">
                <ruby>
                  大木柚杷
                  <rt>オオキ ユズハ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 673</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">2-23</td>
              <td className="p-2">
                <ruby>
                  浜田香恋
                  <rt>ハマダ カレン</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 057</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mARS60M/W/MJ ３射群</h2>
        <div className="py-2 px-4">13:05射座入 13:30～14:45</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">3-8</td>
              <td className="p-2">
                <ruby>
                  <rt></rt>
                </ruby>
              </td>
              <td className="p-2"></td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-9</td>
              <td className="p-2">
                <ruby>
                  宮上 尭士
                  <rt>ミヤガミ ノリト</rt>
                </ruby>
              </td>
              <td className="p-2">34 014 445</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-10</td>
              <td className="p-2">
                <ruby>
                  竹内ひまり
                  <rt>タケウチヒマリ</rt>
                </ruby>
              </td>
              <td className="p-2">40 024 372</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-11</td>
              <td className="p-2">
                <ruby>
                  ギャンビル ウィリアム 海音
                  <rt>ギャンビル ウィリアム カイト</rt>
                </ruby>
              </td>
              <td className="p-2">38 020 312</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-12</td>
              <td className="p-2">
                <ruby>
                  鈴木 抗太
                  <rt>スズキ コウタ</rt>
                </ruby>
              </td>
              <td className="p-2">37 018 280</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mBRS60WJ ３射群</h2>
        <div className="py-2 px-4">13:10射座入 13:30～14:15</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">3-16</td>
              <td className="p-2">
                <ruby>
                  近藤桃香
                  <rt>コンドウ モモカ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 052</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-17</td>
              <td className="p-2">
                <ruby>
                  寺島梓紗
                  <rt>テラシマ アズサ</rt>
                </ruby>
              </td>
              <td className="p-2">43 027 703</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-18</td>
              <td className="p-2">
                <ruby>
                  島田 綾<rt>シマダ リョウ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 889</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-19</td>
              <td className="p-2">
                <ruby>
                  浅野空奈
                  <rt>アサノ カズナ</rt>
                </ruby>
              </td>
              <td className="p-2">44 029 048</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-20</td>
              <td className="p-2">
                <ruby>
                  水野真実
                  <rt>ミズノ マナミ</rt>
                </ruby>
              </td>
              <td className="p-2">43 027 705</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-21</td>
              <td className="p-2">
                <ruby>
                  遠藤美波
                  <rt>エンドウミナミ</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 771</td>
              <td className="p-2 pr-4"></td>
            </tr>
            <tr>
              <td className="p-2 pl-4">3-22</td>
              <td className="p-2">
                <ruby>
                  山﨑純菜
                  <rt>ヤマザキ ジュナ</rt>
                </ruby>
              </td>
              <td className="p-2">43 027 697</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl pt-4 pb-2 px-4">10mBP60MJ ３射群</h2>
        <div className="py-2 px-4">13:10射座入 13:30～14:15</div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-2 pl-4">射座</th>
              <th className="p-2">
                <ruby>
                  選手名
                  <rt>カナ</rt>
                </ruby>
              </th>
              <th className="p-2">日ラ ID</th>
              <th className="p-2 pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 pl-4">3-24</td>
              <td className="p-2">
                <ruby>
                  千野希良人
                  <rt>チノ キラト</rt>
                </ruby>
              </td>
              <td className="p-2">43 028 762</td>
              <td className="p-2 pr-4"></td>
            </tr>
          </tbody>
        </table>
      </MainBody>
    </>
  );
}
