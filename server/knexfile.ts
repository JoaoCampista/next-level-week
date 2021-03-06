import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },

  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },

  useNullAsDefault: true, // sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning.
};
