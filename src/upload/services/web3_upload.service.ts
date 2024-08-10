import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Web3UploadService {
  private readonly logger = new Logger(Web3UploadService.name);
  private readonly pinataJwt: string;

  constructor(private configService: ConfigService) {
    this.pinataJwt = process.env.PINATAJWT
  }

  async pinFileToIPFS(file: Express.Multer.File) {
    try {
      const data = new FormData();
      data.append("file", new Blob([file.buffer], { type: file.mimetype }), file.originalname);

      // console.log(this.pinataJwt);
      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.pinataJwt}`,
          },
          body: data,
        }
      );
      const response = await request.json();
      this.logger.log(response);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}