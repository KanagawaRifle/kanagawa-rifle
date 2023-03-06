import * as React from 'react';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@kanagawa-rifle/website/components/Button';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function Page() {
  return (
    <>
      <Meta title="競技結果" category="2022年度 神奈川オープン兼神奈川県ライフル射撃競技選手権大会" />

      <MainBody maxWidth={'lg'}>
        <Breadcrumbs maxItems={2} className="text-sm">
          <Link href="/">KRA</Link>
          <Link href="/competitions">大会関係</Link>
          <Link href="/competitions/2022">2022年度</Link>
          <Link href="/competitions/2022/kanagawa-open-championship">
            神奈川オープン兼神奈川県ライフル射撃競技選手権大会
          </Link>
          <Typography className="text-white text-sm">競技結果</Typography>
        </Breadcrumbs>

        <h2 className="text-center text-xl">
          <span className="text-sm">2022年度 (令和4年度)</span>
          <br />
          <span className="text-sm">神奈川オープン兼神奈川県ライフル射撃競技選手権大会</span>
          <br />
          競技結果
        </h2>

        <div>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon fixedWidth={true} icon={faFilePdf} />}
            component={Link}
            href="/static/competitions/2022/kanagawa-open-championship/results.pdf"
          >
            競技結果
          </Button>
        </div>

        <div className="max-w-fit overflow-x-scroll">
          <ul className="flex flex-wrap pt-4">
            <li>
              <Link href="#AP_WJ">AP WJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#AR_M">AR M</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#AR_MJ">AR MJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#AR_W">AR W</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#AR_WJ">AR WJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#BP_MJ">BP MJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#BR_MJ">BR MJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#BR_WJ">BR WJ</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#FR60PR_M">FR60PR M</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#FR60PR_M_(スコープ)">FR60PR M (スコープ)</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#FR3×20">FR3×20</Link>
            </li>
            <li className="bg-slate-300 w-px h-6 mx-2"></li>
            <li>
              <Link href="#R3×20">R3×20</Link>
            </li>
          </ul>
          <div className="min-w-max">
            <h2 className="py-4 text-xl font-bold" id="AP_MJ">
              AP MJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-3</td>
                  <td>鬼丸凜太郎</td>
                  <td>39021557</td>
                  <td className="text-center">93</td>
                  <td className="text-center">87</td>
                  <td className="text-center">86</td>
                  <td className="text-center">87</td>
                  <td className="text-center">85</td>
                  <td className="text-center">86</td>
                  <td className="text-center">524</td>
                  <td className="text-center">5</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="AP_WJ">
              AP WJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-2</td>
                  <td>齋藤梨衣</td>
                  <td>37018306</td>
                  <td className="text-center">90</td>
                  <td className="text-center">89</td>
                  <td className="text-center">89</td>
                  <td className="text-center">88</td>
                  <td className="text-center">83</td>
                  <td className="text-center">85</td>
                  <td className="text-center">524</td>
                  <td className="text-center">5</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="AR_M">
              AR M
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3-12</td>
                  <td>鈴木航太</td>
                  <td>37018280</td>
                  <td className="text-center">104.7</td>
                  <td className="text-center">103.6</td>
                  <td className="text-center">101.8</td>
                  <td className="text-center">102.2</td>
                  <td className="text-center">103.7</td>
                  <td className="text-center">102.9</td>
                  <td className="text-center">618.9</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-12</td>
                  <td>荒木基励</td>
                  <td>39022894</td>
                  <td className="text-center">92.0</td>
                  <td className="text-center">101.4</td>
                  <td className="text-center">98.6</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">98.4</td>
                  <td className="text-center">102.1</td>
                  <td className="text-center">593.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2-7</td>
                  <td>平井爽太</td>
                  <td>39022890</td>
                  <td className="text-center">97.9</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">98.4</td>
                  <td className="text-center">101.3</td>
                  <td className="text-center">95.8</td>
                  <td className="text-center">96.0</td>
                  <td className="text-center">588.9</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1-14</td>
                  <td>鈴木滉之亮</td>
                  <td>38021115</td>
                  <td className="text-center">96.8</td>
                  <td className="text-center">94.1</td>
                  <td className="text-center">98.0</td>
                  <td className="text-center">98.6</td>
                  <td className="text-center">99.1</td>
                  <td className="text-center">100.9</td>
                  <td className="text-center">587.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>3-9</td>
                  <td>宮上尭士</td>
                  <td>34014445</td>
                  <td className="text-center">97.7</td>
                  <td className="text-center">95.7</td>
                  <td className="text-center">98.8</td>
                  <td className="text-center">95.6</td>
                  <td className="text-center">96.3</td>
                  <td className="text-center">97.0</td>
                  <td className="text-center">581.1</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>1-13</td>
                  <td>久保田佑</td>
                  <td>40024364</td>
                  <td className="text-center">93.1</td>
                  <td className="text-center">92.1</td>
                  <td className="text-center">93.8</td>
                  <td className="text-center">98.8</td>
                  <td className="text-center">95.5</td>
                  <td className="text-center">100.0</td>
                  <td className="text-center">573.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>1-10</td>
                  <td>河端晋</td>
                  <td>40024565</td>
                  <td className="text-center">94.7</td>
                  <td className="text-center">93.1</td>
                  <td className="text-center">93.3</td>
                  <td className="text-center">97.1</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">97.4</td>
                  <td className="text-center">571.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>2-6</td>
                  <td>板橋聖</td>
                  <td>39021693</td>
                  <td className="text-center">92.5</td>
                  <td className="text-center">94.8</td>
                  <td className="text-center">99.0</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">92.2</td>
                  <td className="text-center">96.1</td>
                  <td className="text-center">570.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>2-8</td>
                  <td>高山正大</td>
                  <td>36016624</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">94.7</td>
                  <td className="text-center">92.1</td>
                  <td className="text-center">93.2</td>
                  <td className="text-center">95.7</td>
                  <td className="text-center">87.0</td>
                  <td className="text-center">558.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>1-11</td>
                  <td>諏訪部竹彦</td>
                  <td>26001997</td>
                  <td className="text-center">89.7</td>
                  <td className="text-center">95.1</td>
                  <td className="text-center">85.5</td>
                  <td className="text-center">86.5</td>
                  <td className="text-center">92.6</td>
                  <td className="text-center">94.2</td>
                  <td className="text-center">543.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>2-15</td>
                  <td>三ツ木俊之</td>
                  <td>38021372</td>
                  <td className="text-center">78.7</td>
                  <td className="text-center">91.2</td>
                  <td className="text-center">87.8</td>
                  <td className="text-center">91.4</td>
                  <td className="text-center">90.8</td>
                  <td className="text-center">85.7</td>
                  <td className="text-center">525.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>2-9</td>
                  <td>山田怜旺</td>
                  <td>44029810</td>
                  <td className="text-center">88.9</td>
                  <td className="text-center">95.0</td>
                  <td className="text-center">86.6</td>
                  <td className="text-center">78.1</td>
                  <td className="text-center">80.2</td>
                  <td className="text-center">75.4</td>
                  <td className="text-center">504.2</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>2-5</td>
                  <td>宇⽥ 博</td>
                  <td>32010551</td>
                  <td className="text-center">71.0</td>
                  <td className="text-center">73.9</td>
                  <td className="text-center">64.7</td>
                  <td className="text-center">68.1</td>
                  <td className="text-center">79.5</td>
                  <td className="text-center">75.4</td>
                  <td className="text-center">432.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>2-10</td>
                  <td>三浦 雅功</td>
                  <td>33012975</td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td>DNS</td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="AR_MJ">
              AR MJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-5</td>
                  <td>横尾憲信</td>
                  <td>43028098</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">97.7</td>
                  <td className="text-center">99.9</td>
                  <td className="text-center">99.9</td>
                  <td className="text-center">100.8</td>
                  <td className="text-center">98.0</td>
                  <td className="text-center">592.7</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-6</td>
                  <td>八谷佳樹</td>
                  <td>43028099</td>
                  <td className="text-center">93.1</td>
                  <td className="text-center">93.4</td>
                  <td className="text-center">92.8</td>
                  <td className="text-center">89.3</td>
                  <td className="text-center">94.2</td>
                  <td className="text-center">92.7</td>
                  <td className="text-center">555.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2-10</td>
                  <td>斉藤 直人</td>
                  <td>33012975</td>
                  <td className="text-center">88.1</td>
                  <td className="text-center">91.1</td>
                  <td className="text-center">87.0</td>
                  <td className="text-center">91.8</td>
                  <td className="text-center">97.7</td>
                  <td className="text-center">98.6</td>
                  <td className="text-center">554.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>3-11</td>
                  <td>ギャンビル ウィリアム 海音</td>
                  <td>38020312</td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td>DNS</td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="AR_W">
              AR W
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3-10</td>
                  <td>竹内ひまり</td>
                  <td>40024372</td>
                  <td className="text-center">104.4</td>
                  <td className="text-center">103</td>
                  <td className="text-center">100.7</td>
                  <td className="text-center">104</td>
                  <td className="text-center">103.6</td>
                  <td className="text-center">103.6</td>
                  <td className="text-center">619.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2-11</td>
                  <td>實川 佳那</td>
                  <td>39022668</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">102.5</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">100.7</td>
                  <td className="text-center">101.3</td>
                  <td className="text-center">103</td>
                  <td className="text-center">607.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2-12</td>
                  <td>岩佐白雪</td>
                  <td>44029801</td>
                  <td className="text-center">92.7</td>
                  <td className="text-center">94.4</td>
                  <td className="text-center">94.1</td>
                  <td className="text-center">95.1</td>
                  <td className="text-center">91.9</td>
                  <td className="text-center">89.7</td>
                  <td className="text-center">557.9</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>2-13</td>
                  <td>八木優希子</td>
                  <td>44029804</td>
                  <td className="text-center">88.3</td>
                  <td className="text-center">95.3</td>
                  <td className="text-center">92.3</td>
                  <td className="text-center">94.7</td>
                  <td className="text-center">95.2</td>
                  <td className="text-center">90.8</td>
                  <td className="text-center">556.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>2-14</td>
                  <td>金超越</td>
                  <td>44029802</td>
                  <td className="text-center">89.9</td>
                  <td className="text-center">89.9</td>
                  <td className="text-center">88</td>
                  <td className="text-center">92.6</td>
                  <td className="text-center">94.8</td>
                  <td className="text-center">97.2</td>
                  <td className="text-center">552.4</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="AR_WJ">
              AR WJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-9</td>
                  <td>馬場春奈</td>
                  <td>43027696</td>
                  <td className="text-center">98.1</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">100.6</td>
                  <td className="text-center">100.7</td>
                  <td className="text-center">102.0</td>
                  <td className="text-center">99.4</td>
                  <td className="text-center">601.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-8</td>
                  <td>遠藤美波</td>
                  <td>43028771</td>
                  <td className="text-center">101.5</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">100.1</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">99.6</td>
                  <td className="text-center">597.1</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="BP_MJ">
              BP MJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3-24</td>
                  <td>千野希良人</td>
                  <td>43028762</td>
                  <td className="text-center">84</td>
                  <td className="text-center">83</td>
                  <td className="text-center">91</td>
                  <td className="text-center">80</td>
                  <td className="text-center">84</td>
                  <td className="text-center">85</td>
                  <td className="text-center">507</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="BR_MJ">
              BR MJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-19</td>
                  <td>實川巧起</td>
                  <td>43028085</td>
                  <td className="text-center">100.9</td>
                  <td className="text-center">99.3</td>
                  <td className="text-center">98.0</td>
                  <td className="text-center">98.7</td>
                  <td className="text-center">99.8</td>
                  <td className="text-center">103.6</td>
                  <td className="text-center">600.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-20</td>
                  <td>越坂昊立</td>
                  <td>43028096</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">99.2</td>
                  <td className="text-center">99.2</td>
                  <td className="text-center">97.5</td>
                  <td className="text-center">102.7</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">597.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>1-21</td>
                  <td>千野希良人</td>
                  <td>43028762</td>
                  <td className="text-center">95.6</td>
                  <td className="text-center">98.9</td>
                  <td className="text-center">97.4</td>
                  <td className="text-center">97.4</td>
                  <td className="text-center">101.4</td>
                  <td className="text-center">99.7</td>
                  <td className="text-center">590.4</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1-17</td>
                  <td>鬼丸理央</td>
                  <td>41025764</td>
                  <td className="text-center">97.2</td>
                  <td className="text-center">96.8</td>
                  <td className="text-center">97.5</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">97.0</td>
                  <td className="text-center">94.8</td>
                  <td className="text-center">579.7</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>1-22</td>
                  <td>山田睦己</td>
                  <td>44029680</td>
                  <td className="text-center">94.3</td>
                  <td className="text-center">93.7</td>
                  <td className="text-center">94.7</td>
                  <td className="text-center">97.3</td>
                  <td className="text-center">95.5</td>
                  <td className="text-center">99.4</td>
                  <td className="text-center">574.9</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>1-18</td>
                  <td>河端時生</td>
                  <td>39023001</td>
                  <td className="text-center">94.6</td>
                  <td className="text-center">97.6</td>
                  <td className="text-center">96.3</td>
                  <td className="text-center">97.3</td>
                  <td className="text-center">93.1</td>
                  <td className="text-center">94.1</td>
                  <td className="text-center">573.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>1-16</td>
                  <td>浅香彪馬</td>
                  <td>44030268</td>
                  <td className="text-center">92.5</td>
                  <td className="text-center">94.0</td>
                  <td className="text-center">97.6</td>
                  <td className="text-center">101.3</td>
                  <td className="text-center">95.7</td>
                  <td className="text-center">87.2</td>
                  <td className="text-center">568.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>1-23</td>
                  <td>和田晃輝</td>
                  <td>44028959</td>
                  <td className="text-center">91.8</td>
                  <td className="text-center">95.0</td>
                  <td className="text-center">97.8</td>
                  <td className="text-center">95.2</td>
                  <td className="text-center">95.5</td>
                  <td className="text-center">82.3</td>
                  <td className="text-center">557.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>2-18</td>
                  <td>ギャンビル ウィリアム 海音</td>
                  <td>38020312</td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td>DNS</td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="BR_WJ">
              BR WJ
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>3-22</td>
                  <td>山﨑純菜</td>
                  <td>43027697</td>
                  <td className="text-center">105.1</td>
                  <td className="text-center">104.0</td>
                  <td className="text-center">103.9</td>
                  <td className="text-center">105.1</td>
                  <td className="text-center">103.8</td>
                  <td className="text-center">104.6</td>
                  <td className="text-center">626.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>3-16</td>
                  <td>近藤桃香</td>
                  <td>44029052</td>
                  <td className="text-center">104.9</td>
                  <td className="text-center">105.3</td>
                  <td className="text-center">104.6</td>
                  <td className="text-center">100.9</td>
                  <td className="text-center">104.6</td>
                  <td className="text-center">103.2</td>
                  <td className="text-center">623.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3-19</td>
                  <td>浅野空奈</td>
                  <td>44029048</td>
                  <td className="text-center">103.8</td>
                  <td className="text-center">101.8</td>
                  <td className="text-center">104.5</td>
                  <td className="text-center">103.5</td>
                  <td className="text-center">100.8</td>
                  <td className="text-center">102.3</td>
                  <td className="text-center">616.7</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>3-21</td>
                  <td>遠藤美波</td>
                  <td>43028771</td>
                  <td className="text-center">102.1</td>
                  <td className="text-center">103.9</td>
                  <td className="text-center">103.7</td>
                  <td className="text-center">101.7</td>
                  <td className="text-center">102.5</td>
                  <td className="text-center">101.4</td>
                  <td className="text-center">615.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>2-19</td>
                  <td>佐伯寧羽</td>
                  <td>44029053</td>
                  <td className="text-center">102.5</td>
                  <td className="text-center">101.9</td>
                  <td className="text-center">102.1</td>
                  <td className="text-center">102.4</td>
                  <td className="text-center">100.3</td>
                  <td className="text-center">102.1</td>
                  <td className="text-center">611.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>2-23</td>
                  <td>浜田香恋</td>
                  <td>44029057</td>
                  <td className="text-center">101.2</td>
                  <td className="text-center">100.9</td>
                  <td className="text-center">98.9</td>
                  <td className="text-center">102.9</td>
                  <td className="text-center">100.3</td>
                  <td className="text-center">102.8</td>
                  <td className="text-center">607.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>2-21</td>
                  <td>田中美乃梨</td>
                  <td>44029055</td>
                  <td className="text-center">99.5</td>
                  <td className="text-center">101.8</td>
                  <td className="text-center">101.0</td>
                  <td className="text-center">102.2</td>
                  <td className="text-center">100.2</td>
                  <td className="text-center">99.0</td>
                  <td className="text-center">603.7</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>2-20</td>
                  <td>芳賀涼華</td>
                  <td>44029050</td>
                  <td className="text-center">100.2</td>
                  <td className="text-center">101.3</td>
                  <td className="text-center">96.9</td>
                  <td className="text-center">99.3</td>
                  <td className="text-center">101.1</td>
                  <td className="text-center">103.2</td>
                  <td className="text-center">602.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>3-20</td>
                  <td>水野真実</td>
                  <td>43027705</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">97.4</td>
                  <td className="text-center">98.4</td>
                  <td className="text-center">100.4</td>
                  <td className="text-center">99.2</td>
                  <td className="text-center">100.3</td>
                  <td className="text-center">591.6</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>3-17</td>
                  <td>寺島梓紗</td>
                  <td>43027703</td>
                  <td className="text-center">97.9</td>
                  <td className="text-center">94.5</td>
                  <td className="text-center">99.4</td>
                  <td className="text-center">96.2</td>
                  <td className="text-center">101.9</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">586.3</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>2-22</td>
                  <td>大木柚杷</td>
                  <td>44029673</td>
                  <td className="text-center">93.2</td>
                  <td className="text-center">91.0</td>
                  <td className="text-center">94.7</td>
                  <td className="text-center">92.2</td>
                  <td className="text-center">98.1</td>
                  <td className="text-center">91.2</td>
                  <td className="text-center">560.4</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>3-18</td>
                  <td>島田綾</td>
                  <td>44029889</td>
                  <td className="text-center">97.9</td>
                  <td className="text-center">98.4</td>
                  <td className="text-center">90.2</td>
                  <td className="text-center">92.1</td>
                  <td className="text-center">92.7</td>
                  <td className="text-center">88.9</td>
                  <td className="text-center">560.2</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="FR60PR_M">
              FR60PR M
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-18</td>
                  <td>西澤安明</td>
                  <td>37018279</td>
                  <td className="text-center">101.6</td>
                  <td className="text-center">97.2</td>
                  <td className="text-center">100.9</td>
                  <td className="text-center">101.5</td>
                  <td className="text-center">100.1</td>
                  <td className="text-center">100.7</td>
                  <td className="text-center">602.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-23</td>
                  <td>髙橋 優治</td>
                  <td>29001316</td>
                  <td className="text-center">101.7</td>
                  <td className="text-center">100.3</td>
                  <td className="text-center">99.3</td>
                  <td className="text-center">97.7</td>
                  <td className="text-center">102.8</td>
                  <td className="text-center">99.7</td>
                  <td className="text-center">601.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>1-17</td>
                  <td>中村 彰博</td>
                  <td>38021112</td>
                  <td className="text-center">94.5</td>
                  <td className="text-center">96.6</td>
                  <td className="text-center">96.5</td>
                  <td className="text-center">98.4</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">99.7</td>
                  <td className="text-center">586.2</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1-19</td>
                  <td>並木啓行</td>
                  <td>31010429</td>
                  <td className="text-center">98.8</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">95.5</td>
                  <td className="text-center">97.6</td>
                  <td className="text-center">99.8</td>
                  <td className="text-center">95.9</td>
                  <td className="text-center">584.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>1-20</td>
                  <td>宮﨑一義</td>
                  <td>29001663</td>
                  <td className="text-center">96.2</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">96.4</td>
                  <td className="text-center">96.8</td>
                  <td className="text-center">98</td>
                  <td className="text-center">99.2</td>
                  <td className="text-center">583.0</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>1-16</td>
                  <td>小林佑彌</td>
                  <td>34014684</td>
                  <td className="text-center">100.5</td>
                  <td className="text-center">96.3</td>
                  <td className="text-center">96.2</td>
                  <td className="text-center">93.5</td>
                  <td className="text-center">98.5</td>
                  <td className="text-center">97.5</td>
                  <td className="text-center">582.5</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>1-22</td>
                  <td>井上達巳</td>
                  <td>23001515</td>
                  <td className="text-center">86.1</td>
                  <td className="text-center">88.6</td>
                  <td className="text-center">78.5</td>
                  <td className="text-center">92.4</td>
                  <td className="text-center">82.9</td>
                  <td className="text-center">85.7</td>
                  <td className="text-center">514.2</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="FR60PR_M_(スコープ)">
              FR60PR M (スコープ)
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={6} className="border-b border-gray-400">
                    シリーズ
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-21</td>
                  <td>菅原嗣高</td>
                  <td>35014999</td>
                  <td className="text-center">102.2</td>
                  <td className="text-center">103.5</td>
                  <td className="text-center">101.7</td>
                  <td className="text-center">100.7</td>
                  <td className="text-center">101</td>
                  <td className="text-center">102.1</td>
                  <td className="text-center">611.2</td>
                  <td className="text-center"></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>1-18</td>
                  <td>中山謙二</td>
                  <td>15000655</td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td>DNF</td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="FR3×20">
              FR3×20
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    K
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    P
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    S
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>1</th>
                  <th>2</th>
                  <th>1</th>
                  <th>2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-11</td>
                  <td>嘉山豪</td>
                  <td>31010431</td>
                  <td className="text-center">94</td>
                  <td className="text-center">98</td>
                  <td className="text-center">97</td>
                  <td className="text-center">94</td>
                  <td className="text-center">90</td>
                  <td className="text-center">91</td>
                  <td className="text-center">564</td>
                  <td className="text-center">9</td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1-13</td>
                  <td>宮上尭士</td>
                  <td>34014445</td>
                  <td className="text-center">92</td>
                  <td className="text-center">93</td>
                  <td className="text-center">95</td>
                  <td className="text-center">96</td>
                  <td className="text-center">92</td>
                  <td className="text-center">92</td>
                  <td className="text-center">560</td>
                  <td className="text-center">17</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>1-15</td>
                  <td>鈴木航太</td>
                  <td>37018280</td>
                  <td className="text-center">93</td>
                  <td className="text-center">86</td>
                  <td className="text-center">92</td>
                  <td className="text-center">88</td>
                  <td className="text-center">94</td>
                  <td className="text-center">90</td>
                  <td className="text-center">543</td>
                  <td className="text-center">9</td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1-16</td>
                  <td>小林佑彌</td>
                  <td>34014684</td>
                  <td className="text-center">91</td>
                  <td className="text-center">81</td>
                  <td className="text-center">96</td>
                  <td className="text-center">98</td>
                  <td className="text-center">83</td>
                  <td className="text-center">83</td>
                  <td className="text-center">532</td>
                  <td className="text-center">6</td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>1-12</td>
                  <td>小田島弘昌</td>
                  <td>23002830</td>
                  <td className="text-center">89</td>
                  <td className="text-center">88</td>
                  <td className="text-center">92</td>
                  <td className="text-center">91</td>
                  <td className="text-center">66</td>
                  <td className="text-center">52</td>
                  <td className="text-center">478</td>
                  <td className="text-center">5</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <h2 className="py-4 text-xl font-bold" id="R3×20">
              R3×20
            </h2>
            <table className="border-y border-gray-400">
              <colgroup>
                <col className="w-10" span={2} />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-12" span={8} />
                <col className="w-48" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className="text-left">
                    順位
                  </th>
                  <th rowSpan={2} className="text-left">
                    射群
                  </th>
                  <th rowSpan={2} className="text-left">
                    氏名
                  </th>
                  <th rowSpan={2} className="text-left">
                    ID
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    K
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    P
                  </th>
                  <th colSpan={2} className="border-b border-gray-400">
                    S
                  </th>
                  <th rowSpan={2}>合計</th>
                  <th rowSpan={2}>X</th>
                  <th rowSpan={2} className="text-left">
                    備考
                  </th>
                </tr>
                <tr className="border-b-4 border-gray-400 border-double">
                  <th>1</th>
                  <th>2</th>
                  <th>1</th>
                  <th>2</th>
                  <th>1</th>
                  <th>2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1-14</td>
                  <td>竹内ひまり</td>
                  <td>40024372</td>
                  <td className="text-center">92</td>
                  <td className="text-center">94</td>
                  <td className="text-center">97</td>
                  <td className="text-center">92</td>
                  <td className="text-center">95</td>
                  <td className="text-center">90</td>
                  <td className="text-center">560</td>
                  <td className="text-center">11</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MainBody>
    </>
  );
}
