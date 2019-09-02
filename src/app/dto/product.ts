import {Category} from './category';

export class Product {
  constructor(public id?: number,
              public code?: string,
              public name?: string,
              public brand?: string,
              public description?: string,
              public unitPrice?: number,
              public quantity?: number,
              public active?: boolean,
              public categoryName?: string ,
              public supplierId?: number,
              public purchases?: number,
              public views?: number,
              public imageUrl?: string


  ) {

  }

}

