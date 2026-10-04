import { NextRequest, NextResponse } from 'next/server';

import { rifleClassResultsQuerySchema, parseSearchParams } from '@/lib/api/schemas';
import { getRifleClassResults, getFiscalYear, RIFLE_CLASS_EVENT_ORDER } from '@/lib/rifle-shooting-class';

/**
 * GET /api/competitions/rifle-shooting-class/results
 *
 * Fetch rifle shooting class results with optional filtering.
 *
 * Query Parameters:
 * - year: Fiscal year (e.g., 2024)
 * - date: Specific date in YYYY-MM-DD format
 * - event: Event name
 * - name: Participant name (partial match)
 *
 * @example
 * GET /api/competitions/rifle-shooting-class/results?year=2024
 * GET /api/competitions/rifle-shooting-class/results?name=山田
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Validate query parameters with Zod
    const parseResult = parseSearchParams(searchParams, rifleClassResultsQuerySchema);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: parseResult.error,
        },
        { status: 400 },
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

    // Get results
    const results = await getRifleClassResults(Object.keys(filter).length > 0 ? filter : undefined);

    // Get unique dates and events for metadata
    const dates = [...new Set(results.map((r) => r.date))];
    const events = [...new Set(results.map((r) => r.event))];
    const fiscalYears = [...new Set(results.map((r) => getFiscalYear(r.date)))];

    const response = NextResponse.json({
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
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    return response;
  } catch (error) {
    console.error('Error fetching rifle shooting class results:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: '結果の取得中にエラーが発生しました',
      },
      { status: 500 },
    );
  }
}
