import { describe, it, expect } from "vitest";
import {
  getFiscalYear,
  parseCSV,
  sortEvents,
  formatDateJapanese,
  EVENT_ORDER,
} from "./competitions";

describe("getFiscalYear", () => {
  it("should return current year for dates from April onwards", () => {
    expect(getFiscalYear("2024-04-01")).toBe(2024);
    expect(getFiscalYear("2024-12-31")).toBe(2024);
  });

  it("should return previous year for dates before April", () => {
    expect(getFiscalYear("2024-01-15")).toBe(2023);
    expect(getFiscalYear("2024-03-31")).toBe(2023);
  });

  it("should handle edge cases at fiscal year boundary", () => {
    expect(getFiscalYear("2024-03-31")).toBe(2023);
    expect(getFiscalYear("2024-04-01")).toBe(2024);
  });
});

describe("parseCSV", () => {
  it("should parse valid CSV data", () => {
    const csv = `date,event,rank,name,series,total,remarks
2024-04-21,AR60S,1,山田太郎,10|9.5|10.2|9.8,39.5,
2024-04-21,AR60S,2,鈴木一郎,9.8|9.6|9.9|9.7,39.0,新人`;

    const records = parseCSV(csv);

    expect(records).toHaveLength(2);
    expect(records[0]).toEqual({
      date: "2024-04-21",
      event: "AR60S",
      rank: 1,
      name: "山田太郎",
      series: [10, 9.5, 10.2, 9.8],
      total: 39.5,
      remarks: "",
    });
    expect(records[1].remarks).toBe("新人");
  });

  it("should handle quoted values with commas", () => {
    const csv = `date,event,rank,name,series,total,remarks
2024-04-21,AR60S,1,"山田, 太郎",10|9.5,19.5,`;

    const records = parseCSV(csv);
    expect(records[0].name).toBe("山田, 太郎");
  });

  it("should skip empty lines", () => {
    const csv = `date,event,rank,name,series,total,remarks
2024-04-21,AR60S,1,山田太郎,10,10,

2024-04-21,AR60S,2,鈴木一郎,9,9,`;

    const records = parseCSV(csv);
    expect(records).toHaveLength(2);
  });

  it("should skip lines with insufficient columns", () => {
    const csv = `date,event,rank,name,series,total,remarks
2024-04-21,AR60S,1,山田太郎,10,10,
incomplete,data`;

    const records = parseCSV(csv);
    expect(records).toHaveLength(1);
  });
});

describe("sortEvents", () => {
  it("should sort events according to EVENT_ORDER", () => {
    const events = ["BP60", "AR60S", "AP60", "HR40"];
    const sorted = sortEvents(events);

    expect(sorted).toEqual(["AR60S", "AP60", "HR40", "BP60"]);
  });

  it("should put unknown events at the end", () => {
    const events = ["UNKNOWN", "AR60S", "OTHER"];
    const sorted = sortEvents(events);

    expect(sorted[0]).toBe("AR60S");
    expect(sorted.slice(1).sort()).toEqual(["OTHER", "UNKNOWN"]);
  });

  it("should handle empty array", () => {
    expect(sortEvents([])).toEqual([]);
  });

  it("should not mutate original array", () => {
    const events = ["BP60", "AR60S"];
    sortEvents(events);
    expect(events).toEqual(["BP60", "AR60S"]);
  });
});

describe("formatDateJapanese", () => {
  it("should format date in Japanese style", () => {
    const formatted = formatDateJapanese("2024-04-21");
    expect(formatted).toContain("2024年");
    expect(formatted).toContain("4月");
    expect(formatted).toContain("21日");
  });

  it("should include weekday", () => {
    // 2024-04-21 is Sunday
    const formatted = formatDateJapanese("2024-04-21");
    expect(formatted).toContain("日");
  });
});

describe("EVENT_ORDER", () => {
  it("should contain expected events", () => {
    expect(EVENT_ORDER).toContain("AR60S");
    expect(EVENT_ORDER).toContain("AP60");
    expect(EVENT_ORDER).toContain("HR40");
  });
});
