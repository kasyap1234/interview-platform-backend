import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.warn(`User not found during login: ${email}`);
      return null;
    }

    this.logger.log(`Password entered: ${pass}`);
    this.logger.log(`Password retrieved: ${user.password}`);

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      this.logger.log(`User ${email} authenticated successfully`);
      const { password, ...result } = user.toObject();
      return result;
    } else {
      this.logger.warn(`Invalid password for user: ${email}`);
      return null;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // ... other methods, if any ...
}
