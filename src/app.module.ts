import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';





@Module({
  imports: [


    
    ConfigModule.forRoot({isGlobal:true}),


    
    UploadModule,






  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
