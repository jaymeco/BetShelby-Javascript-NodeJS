const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'betshelby',
      user: 'postgres',
      password: '0000'
    },
    migrations: {
      directory: path.resolve(__dirname,'src', 'database', 'migrations')
    }
  }
}
