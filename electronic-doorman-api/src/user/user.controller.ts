import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Post()
  async create(@Body() user: UserDTO): Promise<UserDTO> {
    return await this._service.create(user);
  }

  @Get()
  async find(): Promise<UserDTO[]> {
    return await this._service.find();
  }

  @Get(':user_id')
  async findById(@Param('user_id') id: string): Promise<UserDTO> {
    return await this._service.findOne({ id });
  }

  @Put(':user_id')
  async update(
    @Param('user_id') id: string,
    @Body() user: UserDTO,
  ): Promise<UserDTO> {
    return await this._service.update(id, user);
  }

  @Delete(':user_id')
  async delete(@Param('user_id') id: string, @Res() res): Promise<void> {
    await this._service.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
