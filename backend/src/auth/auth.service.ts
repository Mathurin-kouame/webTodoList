import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { nom, prenoms, email, password } = registerDto;

    // Vérifier l'email existe déjà
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail)
      throw new NotFoundException({
        error: 'Cet email est déjà utilisé.',
      });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer et sauvegarder le nouvel utilisateur
    const newUser = this.userRepository.create({
      nom,
      prenoms,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return { message: 'compte crée avec succès' };
  }

  //connexion
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser)
      throw new NotFoundException({
        error: "Mot de passe ou le nom de l'utilisateur est incorrect",
      });

    const isPasswordValid = await this.isPasswordValid(
      password,
      existingUser.password,
    );

    if (!isPasswordValid)
      throw new NotFoundException({
        error: "Mot de passe ou le nom de l'utilisateur est incorrect",
      });
    return this.authentificateUser(existingUser.id);
  }
  //fonction pour verifier le mot de passe hash
  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async authentificateUser(userId: number) {
    const payload = { sub: userId };

    //'singAsync' pour génerer le token
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      // type: 'Bearer',
    };
  }
}
