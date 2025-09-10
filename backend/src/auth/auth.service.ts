import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe.');
    }

    // Hashear la contraseña.
    const hashedPass = await bcrypt.hash(registerDto.password, 10);

    // Crear el usuario.
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPass,
    });

    //Generar el token.
    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      msg: 'Usuario registrado correctamente.',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // Verificar la contraseña.
    const isPassValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPassValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        photo_url: user.photo_url,
        courses: user.courses,
        projects: user.projects,
        tech: user.techs,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        user: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          photo_url: user.photo_url,
          courses: user.courses,
          projects: user.projects,
          tech: user.techs,
        },
      };
    }
    return null;
  }
}
