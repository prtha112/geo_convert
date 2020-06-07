const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tha',
  host: '10.135.70.32',
  database: 'taxi_order',
  password: 'OV2wR1OM',
  port: 5432,
})

const getOrders = (request, response) => {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getOrders
}
