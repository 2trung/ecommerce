import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
    private configService: ConfigService,
  ) {}
  create(createGalleryDto: CreateGalleryDto) {
    return 'This action adds a new gallery';
  }
  async uploadImage(files: Express.Multer.File[]) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
    const uploadResults = [];
    for (const file of files) {
      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          public_id: file.filename,
        });
        fs.unlinkSync(file.path);
        uploadResults.push(uploadResult.secure_url);
      } catch (error) {
        fs.unlinkSync(file.path);
        uploadResults.push({ error });
      }
    }
    return uploadResults;
  }

  findAll() {
    return `This action returns all gallery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
