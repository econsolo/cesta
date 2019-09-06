import { Category } from './category.model';

export class Product {

    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public count: number = 0,
        public value: number = 0,
        public category: Category = null
    ) { }
}
