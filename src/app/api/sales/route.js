import { fetchRowsFromBigQuery } from "@/lib/bigquery";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const rows = await fetchRowsFromBigQuery()
        return NextResponse.json({ ok: true, rows })

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}