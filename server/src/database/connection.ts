import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true, // sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning.
});

export default connection;
