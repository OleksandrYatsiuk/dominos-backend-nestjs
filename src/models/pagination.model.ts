import { ApiProperty } from '@nestjs/swagger';
import { Model, Query } from 'mongoose';


export class PaginatedDto<T = any[]> {
    @ApiProperty()
    total: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    page: number;

    result: T;
}


export interface IQueryPaginationSearch {
    limit: number;
    page: number
}

export function paginateUtils<T>(model: Model<T>, query: any, filter: any = {}): Query<T[], any> {
    const limit = Number(query.limit || 20);
    const page = Number(query.page - 1 || 0);
    Object.keys(filter).forEach(key => (filter[key] === undefined || filter[key] === null)
        && delete filter[key]);
    return model.find(filter).sort(query?.sort || { createdAt: 1 }).limit(limit).skip(limit * page);

}