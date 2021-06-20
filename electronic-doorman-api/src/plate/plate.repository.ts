import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlateRepository {
  async getPlate(image: Buffer): Promise<string> {
    try {
      const { PLATE_RECOGNITION_URL: url, PLATE_RECOGNITION_TOKEN: token } =
        process.env;

      const {
        data: { results = [] },
      } = await axios.post(
        url,
        {
          upload: image.toString('base64'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      const { plate = '' } = results[0];
      return plate;
    } catch (e) {
      throw new BadRequestException(
        'Could not make the axios request: ' + e.message,
      );
    }
  }
}
