import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlateService {
  constructor(
    private readonly _repository: PlateRepository,
    private readonly _userService: UserService,
  ) {}

  async getPlateOwner(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('You should need to update a plate photo!');
    }
    const plate: string = await this._repository.getPlate(file.buffer);
    if (!plate) {
      throw new BadRequestException('Could not get the plate info.');
    }
    const plateOwner: UserModel = await this._userService.findOne({ plate });
    plateOwner.lastEntrance = new Date();
    await this._userService.update(plateOwner.id, plateOwner);
    return plateOwner.name;
  }
}
