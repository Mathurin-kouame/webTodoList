import { Module } from '@nestjs/common';
import { ProjetsController } from './projets.controller';
import { ProjetsService } from './projets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Projet } from './projet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projet, User])],
  controllers: [ProjetsController],
  providers: [ProjetsService],
})
export class ProjetsModule {}
