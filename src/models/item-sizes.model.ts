import { ApiProperty } from "@nestjs/swagger";

export interface IItemSizes {
    readonly small: number;
    readonly middle: number;
    readonly big: number;
}

export class ModelSizes implements IItemSizes {
    @ApiProperty({ type: Number, required: false })
    readonly small: number;
    @ApiProperty({ type: Number, required: false })
    readonly middle: number;
    @ApiProperty({ type: Number, required: false })
    readonly big: number;

    constructor({
        small = 0,
        middle = 0,
        big = 0
    }: Partial<IItemSizes> = {}) {
        this.small = Number(small);
        this.middle = Number(middle);
        this.big = Number(big);
    }
}