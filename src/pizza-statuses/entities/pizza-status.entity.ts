import { IsMultiRequired } from "@decorators/validation";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { PizzaStatusDocument } from "@schemas/pizza-statuses.schema";
import { Transform } from "class-transformer";

export class ModelPizzaStatus implements Partial<PizzaStatusDocument> {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @ApiProperty({ required: true, type: Number, default: 0 })
    status: number;

    constructor({
        _id = null,
        name = null,
        status = null
    }) {
        this.id = _id;
        this.name = name;
        this.status = status;
    }
}
