import { Task } from 'src/tasks/task.entity';
import { UserResponseDto } from './user-response.dto';

export class ProjetReponseDto {
  id: number;
  titre: string;
  description: string;
  user: UserResponseDto;
  tasks: Task[];
}
