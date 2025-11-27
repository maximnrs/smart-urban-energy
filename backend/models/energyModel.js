const db = require('../database/db');

exports.getEnergyValue = async () => {
    const [rows] = await db.query("SELECT value FROM energy_data LIMIT 1");
    return rows[0].value;
};