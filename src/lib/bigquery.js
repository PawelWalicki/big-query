import { BigQuery } from "@google-cloud/bigquery"

const CONFIG = {
    projectId: "velvety-being-502414-f7",
    dataset: "shop_data",
    table: "daily_sales",
    keyFilename: "./src/lib/sa.json"
}

let client = null

function getClient() {
    if (!client) {
        client = new BigQuery({
            projectId: CONFIG.projectId,
            keyFilename: CONFIG.keyFilename
        })
    }
    return client
}

export async function fetchRowsFromBigQuery() {
    const query = `SELECT * from \`${CONFIG.projectId}.${CONFIG.dataset}.${CONFIG.table}\``
    const [rows] = await getClient().query({
        query: query
    })
    return rows
}

export async function fetchRowsFromBigQueryCountry(country) {
    try {

        const query = `SELECT * from \`${CONFIG.projectId}.${CONFIG.dataset}.${CONFIG.table}\` WHERE  country = "${country}" `
        const [rows] = await getClient().query({
            query: query
        })
        return rows
    } catch (e) {
        return e
    }

}

export async function fetchRevenueMoreThan(rev) {
    try {
        const sql = `SELECT * from \`${CONFIG.projectId}.${CONFIG.dataset}.${CONFIG.table}\` WHERE revenue > ${rev}`
        const [rows] = await getClient().query({
            query: sql
        })
        return rows
    } catch (e) {
        throw new Error(e)
    }
}