import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateProjetDto } from './dto/create_projet.dto';
import { ProjetsService } from './projets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projets')
export class ProjetsController {
  constructor(private readonly projetsService: ProjetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProjetDto: CreateProjetDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.projetsService.create(createProjetDto, req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: { user: { id: number } }) {
    return this.projetsService.findAllByUser(req.user.id);
  }
}
