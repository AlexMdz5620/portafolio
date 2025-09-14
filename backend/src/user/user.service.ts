import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-pass-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['courses', 'projects', 'techs', 'links'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con el ID ${id} no encontrado.`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con el ID ${id} no encontrado.`);
    }

    return await this.userRepository.save(user);
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuario con el ID ${id} no encontrado.`);
    }

    const isPassValid = await bcrypt.compare(
      changePasswordDto.password,
      user.password,
    );

    if (!isPassValid) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    const hashedPass = await bcrypt.hash(changePasswordDto.new_password, 10);
    user.password = hashedPass;
    await this.userRepository.save(user);

    return { msg: 'Contraseña actualizada correctamente.' };
  }
}
