import { PartialType } from '@nestjs/swagger';
import { CreatePizzaStatusDto } from './create-pizza-status.dto';

export class UpdatePizzaStatusDto extends PartialType(CreatePizzaStatusDto) { }
