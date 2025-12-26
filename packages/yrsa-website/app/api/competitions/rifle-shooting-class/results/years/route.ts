import { NextResponse } from "next/server";
import { getRifleClassFiscalYears } from "@/lib/rifle-shooting-class";

export async function GET() {
  try {
    const fiscalYears = await getRifleClassFiscalYears();

    return NextResponse.json({
      data: fiscalYears,
      meta: {
        total: fiscalYears.length,
      },
    });
  } catch (error) {
    console.error("Error fetching rifle shooting class fiscal years:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
