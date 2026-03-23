import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Простой путь
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
