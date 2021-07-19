import { HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlateService } from './plate.service';

@Controller('plates')
export class PlateController {
  constructor(private readonly _service: PlateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async getPlateOwner(
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ): Promise<Response> {
    const owner: string = await this._service.getPlateOwner(file);
    return res.status(HttpStatus.OK).send({ message: `Welcome, ${owner}!` });
  }
}
