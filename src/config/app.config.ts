export default () => ({
  environment: process.env.RUNNING_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
});
