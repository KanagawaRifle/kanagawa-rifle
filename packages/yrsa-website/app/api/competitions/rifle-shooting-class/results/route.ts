import { NextRequest, NextResponse } from "next/server";
import {
  getRifleClassResults,
  getRifleClassFiscalYears,
  getFiscalYear,
  RIFLE_CLASS_EVENT_ORDER,
} from "@/lib/rifle-shooting-class";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const yearParam = searchParams.get("year");
    const date = searchParams.get("date");
    const event = searchParams.get("event");
    const name = searchParams.get("name");

    // Build filter
    const filter: {
      year?: number;
      date?: string;
      event?: string;
      name?: string;
    } = {};

    if (yearParam) {
      const year = parseInt(yearParam);
      if (isNaN(year)) {
        return NextResponse.json(
          { error: "Invalid year parameter" },
          { status: 400 }
        );
      }
      filter.year = year;
    }

    if (date) {
      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
          { error: "Invalid date format. Use YYYY-MM-DD" },
          { status: 400 }
        );
      }
      filter.date = date;
    }

    if (event) {
      filter.event = event;
    }

    if (name) {
      filter.name = name;
    }

    // Get results
    const results = await getRifleClassResults(
      Object.keys(filter).length > 0 ? filter : undefined
    );

    // Get unique dates and events for metadata
    const dates = [...new Set(results.map((r) => r.date))];
    const events = [...new Set(results.map((r) => r.event))];
    const fiscalYears = [...new Set(results.map((r) => getFiscalYear(r.date)))];

    return NextResponse.json({
      data: results,
      meta: {
        total: results.length,
        dates: dates.length,
        events: events.sort((a, b) => {
          const indexA = RIFLE_CLASS_EVENT_ORDER.indexOf(a);
          const indexB = RIFLE_CLASS_EVENT_ORDER.indexOf(b);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return a.localeCompare(b);
        }),
        fiscalYears: fiscalYears.sort((a, b) => b - a),
        filters: filter,
      },
    });
  } catch (error) {
    console.error("Error fetching rifle shooting class results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
