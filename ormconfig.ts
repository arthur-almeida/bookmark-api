import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  entities: ['src/migrations/*.ts'],
};

const dataSource = new DataSource(options);

export default dataSource;
