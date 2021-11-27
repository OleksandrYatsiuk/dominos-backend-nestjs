import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class QueryFindProductsDto {

    @ApiProperty({ default: [], type: Array, required: false })
    pizzas: Array<mongoose.Types.ObjectId>;

    @ApiProperty({ default: [], type: Array, required: false })
    drinks: Array<mongoose.Types.ObjectId>;
}
