import { fetchRowsFromBigQueryCountry } from "@/lib/bigquery";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const rows = await fetchRowsFromBigQueryCountry("PL")
        return NextResponse.json({ ok: true, rows })
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 })
    }
}