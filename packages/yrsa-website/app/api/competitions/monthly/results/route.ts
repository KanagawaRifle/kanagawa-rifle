import { NextRequest, NextResponse } from "next/server";
import { getResults, getFiscalYear } from "@/lib/competitions";
import {
  monthlyResultsQuerySchema,
  parseSearchParams,
} from "@/lib/api/schemas";

/**
 * GET /api/competitions/monthly/results
 *
 * Fetch monthly competition results with optional filtering.
 *
 * Query Parameters:
 * - year: Fiscal year (e.g., 2024)
 * - date: Specific date in YYYY-MM-DD format
 * - event: Event name (e.g., AR60S, AP60)
 * - name: Participant name (partial match)
 *
 * @example
 * GET /api/competitions/monthly/results?year=2024
 * GET /api/competitions/monthly/results?date=2024-04-21&event=AR60S
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate query parameters with Zod
    const parseResult = parseSearchParams(searchParams, monthlyResultsQuerySchema);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          message: parseResult.error,
        },
        { status: 400 }
      );
    }

    const { year, date, event, name } = parseResult.data;

    // Build filter object
    const filter: {
      year?: number;
      date?: string;
      event?: string;
      name?: string;
    } = {};

    if (year !== undefined) {
      filter.year = year;
    }
    if (date) {
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

    const response = NextResponse.json({
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

    // Add cache headers for better performance
    // Cache for 1 hour, stale-while-revalidate for 1 day
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return response;
  } catch (error) {
    console.error("Error fetching monthly results:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "結果の取得中にエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
