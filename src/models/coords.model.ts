export interface ILatLng {
    lat: number;
    lng: number;
}

export enum ELanguage {
    uk = 'uk',
    ru = 'ru',
    en = 'en'
}

export class ModelCoords implements Readonly<ILatLng> {
    readonly lat: number;
    readonly lng: number;
    constructor({ lat = null, lng = null }: Partial<ILatLng> = {}) {
        this.lat = lat;
        this.lng = lng;
    }
}