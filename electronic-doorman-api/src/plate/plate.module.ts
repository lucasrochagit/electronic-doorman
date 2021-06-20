import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { PlateRepository } from './plate.repository';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [PlateService, PlateRepository, UserService],
  controllers: [PlateController],
})
export class PlateModule {}
