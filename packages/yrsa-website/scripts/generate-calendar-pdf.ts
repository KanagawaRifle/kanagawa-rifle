/**
 * 年間予定PDF生成スクリプト
 *
 * Google Calendar APIから年間予定を取得してPDFを生成します。
 * ビルド時に実行され、public/static/projects/ に出力されます。
 *
 * Usage: npx tsx scripts/generate-calendar-pdf.ts [年度]
 * 例: npx tsx scripts/generate-calendar-pdf.ts 2025
 */

import { promises as fs } from 'fs';
import path from 'path';

import { config } from 'dotenv';
import PDFDocument from 'pdfkit';

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') });

interface CalendarEvent {
  summary: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  description?: string;
  location?: string;
}

interface DateGroup {
  date: string;
  events: string[];
}

interface MonthlyEvents {
  month: number; // 1-12
  dateGroups: DateGroup[];
}

// 環境変数から設定を取得
const GOOGLE_CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL;

if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
  console.error('Error: Google Calendar environment variables are not set');
  console.error('Required: NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY, NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL');
  process.exit(1);
}

/**
 * 年度の開始・終了日を取得
 */
function getFiscalYearRange(fiscalYear: number) {
  const start = new Date(fiscalYear, 3, 1); // 4月1日
  const end = new Date(fiscalYear + 1, 2, 31, 23, 59, 59); // 翌年3月31日
  return { start, end };
}

/**
 * 現在の年度を取得
 */
function getCurrentFiscalYear(): number {
  const today = new Date();
  return today.getMonth() < 3 ? today.getFullYear() - 1 : today.getFullYear();
}

/**
 * 西暦を令和年に変換
 */
function toReiwaYear(year: number): number {
  return year - 2018; // 令和元年 = 2019
}

/**
 * Google Calendar APIからイベント取得
 */
async function fetchCalendarEvents(start: Date, end: Date): Promise<CalendarEvent[]> {
  const timeMin = start.toISOString();
  const timeMax = end.toISOString();

  const url = new URL(
    'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(GOOGLE_CALENDAR_ID!) + '/events',
  );
  url.searchParams.set('key', GOOGLE_CALENDAR_API_KEY!);
  url.searchParams.set('timeMin', timeMin);
  url.searchParams.set('timeMax', timeMax);
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('maxResults', '2500');

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Google Calendar API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * イベントを月別にグループ化（年度順：4月〜3月）
 */
function groupEventsByMonth(events: CalendarEvent[], fiscalYear: number): MonthlyEvents[] {
  const monthlyMap = new Map<number, { date: string; summary: string }[]>();

  // 4月〜12月（当年）、1月〜3月（翌年）の順
  const fiscalMonths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
  fiscalMonths.forEach((m) => monthlyMap.set(m, []));

  events.forEach((event) => {
    const startDate = event.start.date || event.start.dateTime;
    if (!startDate) return;

    const date = new Date(startDate);
    const month = date.getMonth() + 1; // 1-12

    // 年度範囲チェック
    const eventYear = date.getFullYear();
    const isFiscalYearEvent = (month >= 4 && eventYear === fiscalYear) || (month <= 3 && eventYear === fiscalYear + 1);

    if (!isFiscalYearEvent) return;

    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, []);
    }

    // 日付フォーマット
    const day = date.getDate();
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    let dateStr = '';
    if (event.start.date) {
      // 終日イベント
      dateStr = `${day}日（${dayOfWeek}）`;
    } else {
      // 時刻あり
      const hours = date.getHours();
      const minutes = date.getMinutes();
      dateStr = `${day}日（${dayOfWeek}）${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    // 複数日イベントの場合
    if (event.end.date && event.start.date) {
      const endDate = new Date(event.end.date);
      endDate.setDate(endDate.getDate() - 1); // Google Calendar の終日イベントは翌日になる

      if (endDate.getTime() !== date.getTime()) {
        const endDay = endDate.getDate();
        const endDayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][endDate.getDay()];
        dateStr = `${day}日（${dayOfWeek}）～${endDay}日（${endDayOfWeek}）`;
      }
    }

    monthlyMap.get(month)!.push({
      date: dateStr,
      summary: event.summary || '（タイトルなし）',
    });
  });

  return fiscalMonths.map((month) => {
    const events = monthlyMap.get(month) || [];

    // 各月の先頭に定期練習日を追加
    const regularEvent = {
      date: '毎週火・木',
      summary: 'ジュニアアカデミー練習日（※休場日の場合は翌日）',
    };

    // 12月には休場日を追加
    if (month === 12) {
      events.push({
        date: '29日～1月3日',
        summary: 'くりはま花の国射撃場休場日',
      });
    }

    const allEvents = [regularEvent, ...events];

    // イベントを日付でグループ化
    const dateGroups: DateGroup[] = [];
    allEvents.forEach((event) => {
      const lastGroup = dateGroups[dateGroups.length - 1];
      if (lastGroup && lastGroup.date === event.date) {
        lastGroup.events.push(event.summary);
      } else {
        dateGroups.push({ date: event.date, events: [event.summary] });
      }
    });

    return {
      month,
      dateGroups,
    };
  });
}

/**
 * PDFを生成
 */
async function generatePDF(fiscalYear: number, monthlyEvents: MonthlyEvents[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // 日本語明朝体フォントを登録
    const fontPath = path.join(process.cwd(), 'scripts/fonts/NotoSerifJP-Regular.ttf');
    doc.registerFont('NotoSerif', fontPath);
    doc.font('NotoSerif');

    const reiwaYear = toReiwaYear(fiscalYear);
    const todayStr = `令和${reiwaYear}年3月31日`;

    // ヘッダー
    doc.fontSize(10).text(todayStr, { align: 'right' });
    doc.moveDown(0.5);
    doc.fontSize(9).text(`令和${reiwaYear}年度横須賀市ライフル射撃協会事業計画`, { align: 'center' });
    doc.moveDown(1);

    // 表のスタイル（3列構成）
    const tableTop = doc.y;
    const colMonthX = 50;
    const colMonthWidth = 30;
    const colDateX = colMonthX + colMonthWidth;
    const colDateWidth = 120;
    const colEventX = colDateX + colDateWidth;
    const colEventWidth = 345;
    const rowHeight = 20;
    let currentY = tableTop;

    // 表ヘッダー
    doc.fontSize(9);
    doc.rect(colMonthX, currentY, colMonthWidth, rowHeight).stroke();
    doc.rect(colDateX, currentY, colDateWidth, rowHeight).stroke();
    doc.rect(colEventX, currentY, colEventWidth, rowHeight).stroke();
    const headerTextHeight = doc.heightOfString('月', { width: colMonthWidth - 6 });
    const headerTextY = currentY + (rowHeight - headerTextHeight) / 2;
    doc.text('月', colMonthX + 3, headerTextY, { width: colMonthWidth - 6 });
    doc.text('日', colDateX + 3, headerTextY, { width: colDateWidth - 6 });
    doc.text('行 事 名', colEventX + 3, headerTextY, { width: colEventWidth - 6 });
    currentY += rowHeight;

    // 月別データ
    doc.fontSize(9);

    monthlyEvents.forEach(({ month, dateGroups }) => {
      const monthLabel = `${month}月`;

      // ページ溢れチェック
      if (currentY > 700) {
        doc.addPage();
        currentY = 50;
      }

      // 1パス目: 各行の高さを計算
      const rowHeights: number[] = [];
      dateGroups.forEach((dateGroup) => {
        dateGroup.events.forEach((eventName) => {
          const dateTextHeight = doc.heightOfString(dateGroup.date, { width: colDateWidth - 6 });
          const eventTextHeight = doc.heightOfString(eventName, { width: colEventWidth - 6 });
          const cellHeight = Math.max(dateTextHeight, eventTextHeight);
          rowHeights.push(cellHeight);
        });
      });

      const monthStartY = currentY;
      const monthTotalHeight = rowHeights.reduce((sum, h) => sum + h, 0);
      const totalWidth = colMonthWidth + colDateWidth + colEventWidth;

      // 月全体の外枠を描画
      doc.rect(colMonthX, monthStartY, totalWidth, monthTotalHeight).stroke();

      // 縦線を描画（列区切り）
      doc
        .moveTo(colDateX, monthStartY)
        .lineTo(colDateX, monthStartY + monthTotalHeight)
        .stroke();
      doc
        .moveTo(colEventX, monthStartY)
        .lineTo(colEventX, monthStartY + monthTotalHeight)
        .stroke();

      // 2パス目: テキストと内部の横線を描画
      let rowIndex = 0;
      let isFirstRowInMonth = true;

      dateGroups.forEach((dateGroup) => {
        dateGroup.events.forEach((eventName, eventIndex) => {
          const cellHeight = rowHeights[rowIndex] ?? 20; // デフォルト値を設定
          const textY = currentY;

          // 月列のテキスト（最初の行のみ）
          if (isFirstRowInMonth) {
            doc.text(monthLabel, colMonthX + 3, textY, { width: colMonthWidth - 6 });
            isFirstRowInMonth = false;
          }

          // 日付列のテキスト（日付グループの最初の行のみ）
          if (eventIndex === 0) {
            doc.text(dateGroup.date, colDateX + 3, textY, { width: colDateWidth - 6 });
          }

          // 行事名列のテキスト
          doc.text(eventName, colEventX + 3, textY, { width: colEventWidth - 6 });

          currentY += cellHeight;
          rowIndex++;
        });
      });
    });

    doc.end();
  });
}

/**
 * メイン処理
 */
async function main() {
  const args = process.argv.slice(2);
  const fiscalYear = args[0] ? parseInt(args[0]) : getCurrentFiscalYear();

  console.log(`Generating PDF for fiscal year ${fiscalYear}...`);

  const { start, end } = getFiscalYearRange(fiscalYear);
  console.log(`Fetching events from ${start.toISOString()} to ${end.toISOString()}`);

  // イベント取得
  const events = await fetchCalendarEvents(start, end);
  console.log(`Fetched ${events.length} events`);

  // 月別グループ化
  const monthlyEvents = groupEventsByMonth(events, fiscalYear);
  const totalEvents = monthlyEvents.reduce(
    (sum, m) => sum + m.dateGroups.reduce((groupSum, dg) => groupSum + dg.events.length, 0),
    0,
  );
  console.log(`Grouped into ${totalEvents} events across fiscal year months`);

  // PDF生成
  const pdfBuffer = await generatePDF(fiscalYear, monthlyEvents);

  // 出力
  const outputDir = path.join(process.cwd(), 'public/static/projects');
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `project-${fiscalYear}.pdf`);
  await fs.writeFile(outputPath, pdfBuffer);

  console.log(`Generated: ${outputPath}`);
  console.log(`  - Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
}

main().catch(console.error);
