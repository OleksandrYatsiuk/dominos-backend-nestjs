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
    page: number;
}

export function paginateUtils<T>(model: Model<T>, pagination: IQueryPaginationSearch, filter: any = {}, sort: any = {}): Query<T[], any> {
    const limit = Number(pagination.limit || 20);
    const page = Number(pagination.page - 1 || 0);
    Object.keys(filter).forEach(key => (filter[key] === undefined || filter[key] === null) && delete filter[key]);
    return model.find(filter).sort(sort || { createdAt: 1 }).limit(limit).skip(limit * page);

}


export async function paginationUtils<T>(model: Model<T>, pagination: IQueryPaginationSearch, filter: any = {}, sort: any = {}): Promise<PaginatedDto<T[]>> {
    const limit = Number(pagination.limit || 20);
    const page = Number(pagination.page - 1 || 0);
    Object.keys(filter).forEach(key => (filter[key] === undefined || filter[key] === null) && delete filter[key]);


    const items = await model.find(filter).sort(sort || { createdAt: 1 });
    const itemsPerPage = await model.find(filter).sort(sort || { createdAt: 1 }).limit(limit).skip(limit * page);

    return {
        total: items.length,
        page: page + 1,
        limit: limit,
        result: itemsPerPage
    }

}