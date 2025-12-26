import { NextRequest, NextResponse } from "next/server";
import { getResults, getFiscalYear } from "@/lib/competitions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const yearParam = searchParams.get("year");
    const date = searchParams.get("date");
    const event = searchParams.get("event");
    const name = searchParams.get("name");

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

    const results = await getResults(
      Object.keys(filter).length > 0 ? filter : undefined
    );

    // Build response with metadata
    const uniqueDates = [...new Set(results.map((r) => r.date))];
    const uniqueEvents = [...new Set(results.map((r) => r.event))];
    const uniqueYears = [...new Set(results.map((r) => getFiscalYear(r.date)))];

    return NextResponse.json({
      data: results,
      meta: {
        total: results.length,
        dates: uniqueDates.length,
        events: uniqueEvents,
        fiscalYears: uniqueYears.sort((a, b) => b - a),
        filters: {
          year: filter.year ?? null,
          date: filter.date ?? null,
          event: filter.event ?? null,
          name: filter.name ?? null,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
