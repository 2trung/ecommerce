import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VariantService } from './variant.service';

import { CreateColorDto } from './dto/create-color.dto';
import { FilterDto } from '../shared/dto/filter.dto';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}
  @Get('/color')
  findAllColor(@Query() query: FilterDto) {
    return this.variantService.findAllColor(query);
  }
  @Get('/size')
  findAllSize(@Query() query: FilterDto) {
    return this.variantService.findAllSize(query);
  }
  @Get('/category')
  findAllCategory(@Query() query: FilterDto) {
    return this.variantService.findAllCategory(query);
  }

  @Post('/color/add')
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.variantService.createColor(createColorDto);
  }
  @Post('/size/add')
  createSize(@Body('name') name: string) {
    return this.variantService.createSize(name);
  }
  @Post('/category/add')
  createCategory(@Body('name') name: string) {
    return this.variantService.createCategory(name);
  }

  // @Get()
  // findAll() {
  //   return this.variantService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.variantService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
  //   return this.variantService.update(+id, updateVariantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.variantService.remove(+id);
  // }
}
