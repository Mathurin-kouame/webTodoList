import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projet } from './projet.entity';
import { CreateProjetDto } from './dto/create_projet.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjetReponseDto } from './dto/projet_reponse.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProjetsService {
  constructor(
    @InjectRepository(Projet)
    private readonly projetRepository: Repository<Projet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProjetDto: CreateProjetDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const projet = this.projetRepository.create({
      ...createProjetDto,
      user,
    });

    const savedProjet = await this.projetRepository.save(projet);

    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return { ...savedProjet, user: userDto };
  }

  async findAllByUser(userId: number): Promise<ProjetReponseDto[]> {
    const projets = await this.projetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return projets.map((projet) => ({
      ...projet,
      user: plainToInstance(UserResponseDto, projet.user, {
        excludeExtraneousValues: true,
      }),
    }));
  }
}
