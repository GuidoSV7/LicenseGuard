import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';

import { Upload } from './entities/upload.entity';
import { Web3UploadService } from './services/web3_upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly web3UploadService: Web3UploadService) {}

  @Post('ipfs')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The file has been uploaded successfully to ipfs',
    type: Upload,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadToWeb3Storage(@UploadedFile() file: Express.Multer.File) {
    // console.log('Function uploadToWeb3Storage called');
    // console.log('File received:', file);

    try {
      const response = await this.web3UploadService.pinFileToIPFS(file);
      return { hash: response.IpfsHash };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error);
    }
  }
}