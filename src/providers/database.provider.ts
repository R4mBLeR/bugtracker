import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'database.db', // Просто имя файла в корне проекта
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Простой путь
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
