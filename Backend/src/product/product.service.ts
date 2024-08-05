import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository, DataSource, ILike } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { Gallery } from 'src/gallery/entities/gallery.entity';
import { Category } from 'src/variant/entities/category.entity';
import { Size } from 'src/variant/entities/size.entity';
import { Color } from 'src/variant/entities/color.entity';
import { ProductWithImages } from './interface/productWithImages';
import { FilterDto } from 'src/shared/dto/filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(VariantColor)
    private variantColorRepository: Repository<VariantColor>,
    @InjectRepository(VariantSize)
    private variantSizeRepository: Repository<VariantSize>,
    @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
  ) {}
  // async create(createProductDto: CreateProductDto) {
  //   try {
  //     const { SKU, name, description, category_id } = createProductDto;
  //     const category = await this.categoryRepository.findOne({
  //       where: { id: category_id },
  //     });
  //     const product = await this.productRepository.save({
  //       SKU,
  //       name,
  //       description,
  //       category,
  //     });
  //     for (const item of createProductDto.variants_color) {
  //       const { color_id, image_urls, variants_size } = item;
  //       const color = await this.colorRepository.findOne({
  //         where: { id: color_id },
  //       });

  //       const variantColor = await this.variantColorRepository.save({
  //         color,
  //         product,
  //       });
  //       for (const imageUrl of image_urls) {
  //         await this.galleryRepository.save({
  //           image_url: imageUrl,
  //           variantColor,
  //         });
  //       }
  //       for (const variantSize of variants_size) {
  //         const { size_id, stock, price } = variantSize;
  //         const size = await this.sizeRepository.findOne({
  //           where: { id: size_id },
  //         });
  //         await this.variantSizeRepository.save({
  //           stock,
  //           price,
  //           size,
  //           variantColor,
  //         });
  //       }
  //     }
  //     return { message: 'Product created successfully', data: product };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { SKU, name, description, category_id, variants_color } =
        createProductDto;

      const category = await this.categoryRepository.findOne({
        where: { id: category_id },
        transaction: true,
        lock: { mode: 'pessimistic_write' },
      });

      const product = this.productRepository.create({
        SKU,
        name,
        description,
        category,
      });

      await queryRunner.manager.save(product);

      const variantsColorPromises = variants_color.map(async (item) => {
        const { color_id, image_urls, variants_size } = item;
        const color = await this.colorRepository.findOne({
          where: { id: color_id },
          transaction: true,
          lock: { mode: 'pessimistic_write' },
        });

        const variantColor = this.variantColorRepository.create({
          color,
          product,
        });

        await queryRunner.manager.save(variantColor);

        const galleryPromises = image_urls.map((imageUrl) => {
          const gallery = this.galleryRepository.create({
            image_url: imageUrl,
            variantColor,
          });
          return queryRunner.manager.save(gallery);
        });

        const variantSizePromises = variants_size.map(async (variantSize) => {
          const { size_id, stock, price } = variantSize;
          const size = await this.sizeRepository.findOne({
            where: { id: size_id },
            transaction: true,
            lock: { mode: 'pessimistic_write' },
          });

          const variantSizeEntity = this.variantSizeRepository.create({
            stock,
            price,
            size,
            variantColor,
          });

          return queryRunner.manager.save(variantSizeEntity);
        });

        await Promise.all([...galleryPromises, ...variantSizePromises]);
      });

      await Promise.all(variantsColorPromises);

      await queryRunner.commitTransaction();

      return { message: 'Product created successfully', data: product };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: 'Product creation failed', error };
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query: FilterDto) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';

    const [products, total] = await this.productRepository.findAndCount({
      where: [{ name: ILike(`%${keyword}%`) }, { SKU: ILike(`%${keyword}%`) }],
      take: items_per_page,
      skip: skip,
      select: ['id', 'name', 'SKU', 'created_at', 'updated_at'],
    });
    const productsWithImages: ProductWithImages[] = [];

    for (const product of products) {
      const variantsColor = await this.variantColorRepository.findOne({
        where: { product: { id: product.id } },
      });

      if (variantsColor) {
        const gallery = await this.galleryRepository.find({
          where: { variantColor: { id: variantsColor.id } },
        });
        const image_urls = gallery.map((item) => item.image_url);

        const productWithImages: ProductWithImages = {
          ...product,
          image_urls: image_urls,
        };

        productsWithImages.push(productWithImages);
      } else {
        productsWithImages.push({ ...product, image_urls: [] });
      }
    }
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: productsWithImages,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'category',
        'variantsColor',
        'variantsColor.variantSizes',
        'variantsColor.variantSizes.size',
        'variantsColor.color',
        'variantsColor.galleries',
      ],
    });
    return product;
  }
}
