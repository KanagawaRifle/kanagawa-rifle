import { NextResponse } from 'next/server';

import { getFiscalYears } from '@/lib/competitions';

export async function GET() {
  try {
    const fiscalYears = await getFiscalYears();

    return NextResponse.json({
      data: fiscalYears,
      meta: {
        total: fiscalYears.length,
      },
    });
  } catch (error) {
    console.error('Error fetching fiscal years:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
