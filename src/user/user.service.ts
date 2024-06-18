import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {};

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') { // violação de unicidade 
        throw new BadRequestException('Username already exists');
      } else {
        throw new Error('Internal server error');
      };
    }
    return user;
  };

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  };

  async findById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    return user;  
  };
};
