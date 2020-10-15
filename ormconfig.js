module.exports = [
  {
    name: 'default',
    type: 'sqlite',
    database:
      './src/database/' +
      (process.env.NODE_ENV === 'test' ? 'tests' : 'database') +
      '.sqlite',
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/models/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
];
