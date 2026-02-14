const pool = require("../database/")

/* Count total accounts */
async function getAccountCount() {
    const sql = `SELECT COUNT(*) FROM account`
    const result = await pool.query(sql)
    return result.rows[0].count
}

/* Count total vehicles */
async function getInventoryCount() {
    const sql = `SELECT COUNT(*) FROM inventory`
    const result = await pool.query(sql)
    return result.rows[0].count
}

/* Count total classifications */
async function getClassificationCount() {
    const sql = `SELECT COUNT(*) FROM classification`
    const result = await pool.query(sql)
    return result.rows[0].count
}

/* Most expensive vehicle */
async function getMostExpensiveVehicle() {
    const sql = `
        SELECT inv_make, inv_model, inv_price
        FROM inventory
        ORDER BY inv_price DESC
        LIMIT 1
    `
    const result = await pool.query(sql)
    return result.rows[0]
}

/* Most common classification */
async function getMostCommonClassification() {
    const sql = `
        SELECT c.classification_name, COUNT(*) AS count
        FROM inventory i
        JOIN classification c
        ON i.classification_id = c.classification_id
        GROUP BY c.classification_name
        ORDER BY count DESC
        LIMIT 1
    `
    const result = await pool.query(sql)
    return result.rows[0]
}

module.exports = {
    getAccountCount,
    getInventoryCount,
    getClassificationCount,
    getMostExpensiveVehicle,
    getMostCommonClassification
}