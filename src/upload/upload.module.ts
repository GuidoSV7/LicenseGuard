import { Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { Web3UploadService } from './services/web3_upload.service';

@Module({
  controllers: [UploadController],
  providers: [Web3UploadService],
})
export class UploadModule {}
