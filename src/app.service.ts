import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data';
import { lastValueFrom, map } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async uploadVideo(file: any) {
    const formData = new FormData();

    formData.append('video', file.buffer, file.originalname);
    const responseData = this.httpService
      .post(
        'http://localhost:3005/encoder',
        formData.getBuffer(),
        {
          headers: {
            ...formData.getHeaders(),
            Accept: '*/*',
            'Content-Length': file.size,
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .pipe(
        map((axiosResponse) => {
          return axiosResponse.data;
        }),
      );

    return await lastValueFrom(responseData).then((resp) => {
      return resp;
    });
  }
}
