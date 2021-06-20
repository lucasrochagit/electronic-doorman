import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlateModule } from './plate/plate.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `.database/electronic_doorman_db`,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PlateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
