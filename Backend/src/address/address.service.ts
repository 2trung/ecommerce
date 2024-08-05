import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userId: number, createAddressDto: CreateAddressDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      console.log({
        ...createAddressDto,
        user,
        default: false,
      });
      const address = await this.addressRepository.save({
        ...createAddressDto,
        user,
        default: false,
      });
      return { mesage: 'Address created successfully', data: address };
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['addresses'],
    });
    return { message: 'Success', data: user.addresses };
  }
}
