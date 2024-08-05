import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FilterDto } from '../shared/dto/filter.dto';
import { Size } from './entities/size.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  createColor(createColorDto: CreateColorDto) {
    return this.colorRepository.save(createColorDto);
  }

  createSize(name: string) {
    return this.sizeRepository.save({ name });
  }

  createCategory(name: string) {
    return this.categoryRepository.save({ name });
  }

  async findAllColor(query: FilterDto) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';

    const [res, total] = await this.colorRepository.findAndCount({
      where: [{ name: ILike(`%${keyword}%`) }, { hex: ILike(`%${keyword}%`) }],
      // order: { created_at: "DESC" },
      take: items_per_page,
      skip: skip,
      select: ['id', 'name', 'hex', 'created_at', 'updated_at'],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findAllSize(query: FilterDto) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';

    const [res, total] = await this.sizeRepository.findAndCount({
      where: { name: ILike(`%${keyword}%`) },
      // order: { created_at: "DESC" },
      take: items_per_page,
      skip: skip,
      select: ['id', 'name', 'created_at', 'updated_at'],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findAllCategory(query: FilterDto) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';

    const [res, total] = await this.categoryRepository.findAndCount({
      where: { name: ILike(`%${keyword}%`) },
      // order: { created_at: "DESC" },
      take: items_per_page,
      skip: skip,
      select: ['id', 'name', 'created_at', 'updated_at'],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
}
