import { ProductPhoto } from './product-photo';

export class Product {
     id: number;
     name: string;
     productCode: string;
     groupCode: string;
     description: string;
     initialPrice: number;
     priceForDay: number;
     priceForWeekend: number;
     priceForWeek: number;
     youtubeUrl: string;
     photos?: ProductPhoto[];
}
