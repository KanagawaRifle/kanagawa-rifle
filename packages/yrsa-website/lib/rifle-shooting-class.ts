import { promises as fs } from "fs";
import path from "path";
import {
  type ResultRecord,
  type FiscalYearInfo,
  type ResultsFilter,
  parseCSV,
  getFiscalYear,
  formatDateJapanese,
  groupResultsByDateAndEvent,
} from "./competitions";

// Event display order for rifle shooting class
export const RIFLE_CLASS_EVENT_ORDER = ["BR40BR", "BRF40"];

// Get CSV file path
function getCSVPath(): string {
  return path.join(
    process.cwd(),
    "data/competitions/rifle-shooting-class/results.csv"
  );
}

// Load all results from CSV
export async function loadAllResults(): Promise<ResultRecord[]> {
  const csvText = await fs.readFile(getCSVPath(), "utf-8");
  return parseCSV(csvText);
}

// Get available fiscal years with metadata
export async function getRifleClassFiscalYears(): Promise<FiscalYearInfo[]> {
  const records = await loadAllResults();

  const yearData = new Map<
    number,
    { dates: Set<string>; records: ResultRecord[] }
  >();

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
    result.push({
      year,
      count: data.dates.size,
      eventCount: data.records.length,
      dateRange: {
        start: sortedDates[0],
        end: sortedDates[sortedDates.length - 1],
      },
    });
  });

  return result.sort((a, b) => b.year - a.year);
}

// Sort events by defined order
function sortEvents(events: string[]): string[] {
  return [...events].sort((a, b) => {
    const indexA = RIFLE_CLASS_EVENT_ORDER.indexOf(a);
    const indexB = RIFLE_CLASS_EVENT_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
}

// Get results with optional filtering
export async function getRifleClassResults(
  filter?: ResultsFilter
): Promise<ResultRecord[]> {
  let records = await loadAllResults();

  if (filter) {
    if (filter.year !== undefined) {
      records = records.filter(
        (r) => getFiscalYear(r.date) === filter.year
      );
    }
    if (filter.date) {
      records = records.filter((r) => r.date === filter.date);
    }
    if (filter.event) {
      records = records.filter(
        (r) => r.event.toLowerCase() === filter.event!.toLowerCase()
      );
    }
    if (filter.name) {
      const searchName = filter.name.toLowerCase();
      records = records.filter((r) =>
        r.name.toLowerCase().includes(searchName)
      );
    }
  }

  // Sort by date (desc), then event order, then rank
  return records.sort((a, b) => {
    // Date descending
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;

    // Event order
    const eventOrderA = RIFLE_CLASS_EVENT_ORDER.indexOf(a.event);
    const eventOrderB = RIFLE_CLASS_EVENT_ORDER.indexOf(b.event);
    const eventA = eventOrderA === -1 ? 999 : eventOrderA;
    const eventB = eventOrderB === -1 ? 999 : eventOrderB;
    if (eventA !== eventB) return eventA - eventB;

    // Rank ascending
    return a.rank - b.rank;
  });
}

// Group results by date and event
export function groupRifleClassResultsByDateAndEvent(
  records: ResultRecord[]
): Map<string, Map<string, ResultRecord[]>> {
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
  const sortedDates = Array.from(dateGroups.keys()).sort((a, b) =>
    b.localeCompare(a)
  );

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

// Re-export utilities
export { formatDateJapanese, getFiscalYear };
export type { ResultRecord, FiscalYearInfo, ResultsFilter };
