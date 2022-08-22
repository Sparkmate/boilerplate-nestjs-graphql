import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { AdminModule } from '@adminjs/nestjs';
import { User } from './user/entities/user.entity';
import { Database, Resource } from '@adminjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_api',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [User],
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
