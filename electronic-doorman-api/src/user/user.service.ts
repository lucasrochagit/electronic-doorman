import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _repository: Repository<UserEntity>,
  ) {}

  async create(item: UserEntity): Promise<UserModel> {
    item.plate = item.plate.toLowerCase();
    return await this._repository.save(item);
  }

  async find(): Promise<UserEntity[]> {
    return await this._repository.find();
  }

  async findOne(query: any): Promise<UserModel> {
    const exists: boolean = await this.checkExists(query);
    if (!exists) {
      throw new NotFoundException('User not found or already removed!');
    }
    return await this._repository.findOne(query);
  }

  async update(id: string, item: UserEntity): Promise<UserModel> {
    const exists: boolean = await this.checkExists({ id });
    if (!exists) {
      throw new NotFoundException('User not found or already removed!');
    }
    await this._repository.update(id, item);
    return this.findOne({ id });
  }

  async delete(id: string): Promise<void> {
    await this._repository.delete(id);
  }

  async checkExists(params: any): Promise<boolean> {
    return !!(await this._repository.findOne(params));
  }
}
