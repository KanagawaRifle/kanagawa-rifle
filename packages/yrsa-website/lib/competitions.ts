import { promises as fs } from 'fs';
import path from 'path';

// Record type for competition results
export interface ResultRecord {
  date: string;
  event: string;
  rank: number;
  name: string;
  series: number[];
  total: number;
  remarks: string;
}

// Fiscal year info
export interface FiscalYearInfo {
  year: number;
  count: number;
  eventCount: number;
  dateRange: {
    start: string;
    end: string;
  };
}

// Event display order
export const EVENT_ORDER = ['AR60S', 'AP60', 'HR40', 'BR60S', 'BR40FR', 'BP60'];

// Get fiscal year from date (April = start of fiscal year)
export function getFiscalYear(dateStr: string): number {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return month >= 4 ? year : year - 1;
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
export function parseCSV(csvText: string): ResultRecord[] {
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

// Sort events by defined order
export function sortEvents(events: string[]): string[] {
  return [...events].sort((a, b) => {
    const indexA = EVENT_ORDER.indexOf(a);
    const indexB = EVENT_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
}

// Format date to Japanese display format
export function formatDateJapanese(dateStr: string): string {
  const date = new Date(dateStr);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]})`;
}

// Get CSV file path
function getCSVPath(): string {
  return path.join(process.cwd(), 'data/competitions/monthly/results.csv');
}

// Load all results from CSV
export async function loadAllResults(): Promise<ResultRecord[]> {
  const csvText = await fs.readFile(getCSVPath(), 'utf-8');
  return parseCSV(csvText);
}

// Get available fiscal years with metadata
export async function getFiscalYears(): Promise<FiscalYearInfo[]> {
  const records = await loadAllResults();

  const yearData = new Map<number, { dates: Set<string>; records: ResultRecord[] }>();

  records.forEach((record) => {
    const fiscalYear = getFiscalYear(record.date);
    if (!yearData.has(fiscalYear)) {
      yearData.set(fiscalYear, { dates: new Set(), records: [] });
    }
    const data = yearData.get(fiscalYear)!;
    data.dates.add(record.date);
    data.records.push(record);
  });

  const result: FiscalYearInfo[] = [];

  yearData.forEach((data, year) => {
    const sortedDates = Array.from(data.dates).sort();
    const startDate = sortedDates[0] ?? '';
    const endDate = sortedDates[sortedDates.length - 1] ?? '';
    result.push({
      year,
      count: data.dates.size,
      eventCount: data.records.length,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  });

  return result.sort((a, b) => b.year - a.year);
}

// Filter options
export interface ResultsFilter {
  year?: number;
  date?: string;
  event?: string;
  name?: string;
}

// Get results with optional filtering
export async function getResults(filter?: ResultsFilter): Promise<ResultRecord[]> {
  let records = await loadAllResults();

  if (filter) {
    if (filter.year !== undefined) {
      records = records.filter((r) => getFiscalYear(r.date) === filter.year);
    }
    if (filter.date) {
      records = records.filter((r) => r.date === filter.date);
    }
    if (filter.event) {
      records = records.filter((r) => r.event.toLowerCase() === filter.event!.toLowerCase());
    }
    if (filter.name) {
      const searchName = filter.name.toLowerCase();
      records = records.filter((r) => r.name.toLowerCase().includes(searchName));
    }
  }

  // Sort by date (desc), then event order, then rank
  return records.sort((a, b) => {
    // Date descending
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;

    // Event order
    const eventOrderA = EVENT_ORDER.indexOf(a.event);
    const eventOrderB = EVENT_ORDER.indexOf(b.event);
    const eventA = eventOrderA === -1 ? 999 : eventOrderA;
    const eventB = eventOrderB === -1 ? 999 : eventOrderB;
    if (eventA !== eventB) return eventA - eventB;

    // Rank ascending
    return a.rank - b.rank;
  });
}

// Group results by date and event
export function groupResultsByDateAndEvent(records: ResultRecord[]): Map<string, Map<string, ResultRecord[]>> {
  const dateGroups = new Map<string, Map<string, ResultRecord[]>>();

  // Group by date
  records.forEach((record) => {
    if (!dateGroups.has(record.date)) {
      dateGroups.set(record.date, new Map());
    }
    const eventGroups = dateGroups.get(record.date)!;
    if (!eventGroups.has(record.event)) {
      eventGroups.set(record.event, []);
    }
    eventGroups.get(record.event)!.push(record);
  });

  // Sort dates descending
  const sortedDates = Array.from(dateGroups.keys()).sort((a, b) => b.localeCompare(a));

  const result = new Map<string, Map<string, ResultRecord[]>>();

  sortedDates.forEach((date) => {
    const eventGroups = dateGroups.get(date)!;
    const sortedEventGroups = new Map<string, ResultRecord[]>();

    // Sort events
    const sortedEventNames = sortEvents(Array.from(eventGroups.keys()));
    sortedEventNames.forEach((eventName) => {
      const eventRecords = eventGroups.get(eventName)!;
      // Sort by rank
      eventRecords.sort((a, b) => a.rank - b.rank);
      sortedEventGroups.set(eventName, eventRecords);
    });

    result.set(date, sortedEventGroups);
  });

  return result;
}
