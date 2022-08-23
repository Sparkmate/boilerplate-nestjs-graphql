import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import AdminJS from "adminjs";
import { AdminModule } from "@adminjs/nestjs";
import { Database, Resource } from "@adminjs/typeorm";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/entities/user.entity";
import configuration from "./config/configuration";
import { AppController } from "./app.controller";

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"), // <-- path to the static files
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: configuration().database.host,
      port: 5432,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.name,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: "/admin",
        resources: [User],
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
