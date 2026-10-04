/**
 * RSS フィード生成スクリプト
 *
 * 月例会の結果を RSS フィードとして出力します。
 * ビルド時に実行され、public/feed.xml に出力されます。
 *
 * Usage: npx tsx scripts/generate-feed.ts
 */

import { promises as fs } from 'fs';
import path from 'path';

const siteConfig = {
  baseUrl: 'https://yokosuka.kanagawa-rifle.org',
  name: '横須賀市ライフル射撃協会',
  description: '横須賀市ライフル射撃協会の公式ウェブサイト。月例会結果、競技会情報などを掲載。',
};

interface ResultRecord {
  date: string;
  event: string;
  rank: number;
  name: string;
  series: number[];
  total: number;
  remarks: string;
}

// Parse CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

// Parse CSV text to records
function parseCSV(csvText: string): ResultRecord[] {
  const lines = csvText.split(/\r?\n/);
  const records: ResultRecord[] = [];

  // Skip header (remove BOM if present)
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine) continue;
    const line = rawLine.trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < 6) continue;

    const [date, event, rankStr, name, seriesStr, totalStr, remarks] = values;
    if (!date || !event || !rankStr || !name || !seriesStr || !totalStr) continue;

    const series = seriesStr.split('|').map((s) => parseFloat(s.trim()));

    records.push({
      date,
      event,
      rank: parseInt(rankStr),
      name,
      series,
      total: parseFloat(totalStr),
      remarks: remarks || '',
    });
  }

  return records;
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Format date to RFC 822 format
function toRFC822(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toUTCString();
}

// Format date to Japanese display
function formatDateJapanese(dateStr: string): string {
  const date = new Date(dateStr);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]})`;
}

interface CompetitionDateGroup {
  date: string;
  events: Map<string, ResultRecord[]>;
}

// Group records by date
function groupByDate(records: ResultRecord[]): CompetitionDateGroup[] {
  const dateMap = new Map<string, Map<string, ResultRecord[]>>();

  records.forEach((record) => {
    if (!dateMap.has(record.date)) {
      dateMap.set(record.date, new Map());
    }
    const eventMap = dateMap.get(record.date)!;
    if (!eventMap.has(record.event)) {
      eventMap.set(record.event, []);
    }
    eventMap.get(record.event)!.push(record);
  });

  // Sort by date descending
  const sortedDates = Array.from(dateMap.keys()).sort((a, b) => b.localeCompare(a));

  return sortedDates.map((date) => ({
    date,
    events: dateMap.get(date)!,
  }));
}

// Generate RSS item for a competition date
function generateItem(group: CompetitionDateGroup): string {
  const eventNames = Array.from(group.events.keys()).join(', ');
  const totalParticipants = Array.from(group.events.values()).reduce((sum, records) => sum + records.length, 0);

  // Get top 3 results for description
  let description = `開催日: ${formatDateJapanese(group.date)}\n種目: ${eventNames}\n参加者数: ${totalParticipants}名\n\n`;

  group.events.forEach((records, event) => {
    description += `【${event}】\n`;
    const top3 = records.filter((r) => r.rank <= 3).sort((a, b) => a.rank - b.rank);
    top3.forEach((r) => {
      description += `${r.rank}位: ${r.name} (${r.total}点)\n`;
    });
    description += '\n';
  });

  return `    <item>
      <title>${escapeXml(`月例会結果 - ${formatDateJapanese(group.date)}`)}</title>
      <link>${siteConfig.baseUrl}/competitions/monthly/results/${new Date(group.date).getFullYear()}#${group.date}</link>
      <description>${escapeXml(description.trim())}</description>
      <pubDate>${toRFC822(group.date)}</pubDate>
      <guid isPermaLink="false">monthly-${group.date}</guid>
      <category>月例会</category>
    </item>`;
}

async function generateFeed() {
  const csvPath = path.join(process.cwd(), 'data/competitions/monthly/results.csv');
  const publicDir = path.join(process.cwd(), 'public');

  // Check if CSV exists
  try {
    await fs.access(csvPath);
  } catch {
    console.log('No results CSV found, skipping RSS generation');
    return;
  }

  const csvText = await fs.readFile(csvPath, 'utf-8');
  const records = parseCSV(csvText);

  if (records.length === 0) {
    console.log('No results found, skipping RSS generation');
    return;
  }

  const groups = groupByDate(records);
  const recentGroups = groups.slice(0, 20); // Last 20 competition dates

  const items = recentGroups.map(generateItem).join('\n');
  const lastBuildDate = toRFC822(new Date().toISOString());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.baseUrl}/icon-192x192.png</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${siteConfig.baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  await fs.writeFile(path.join(publicDir, 'feed.xml'), rss, 'utf-8');
  console.log('Generated: public/feed.xml');
  console.log(`  - ${recentGroups.length} competition dates included`);
}

generateFeed().catch(console.error);
