import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncoderService {
  async hashPass(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async checkPass(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }
}
