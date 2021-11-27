import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Drinks, DrinksDocument } from '@schemas/drinks.schema';
import { Pizza, PizzaDocument } from '@schemas/pizzas.schema';
import { Model } from 'mongoose';
import { ModelDrinks } from 'src/module-drinks/entities/drink.entity';
import { LangService } from 'src/module-language/lang.service';
import { ModelPizzaPublic } from 'src/module-pizzas/entities/public-pizza.entity';
import { QueryFindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Pizza.name) private _pizzasDb: Model<PizzaDocument>,
    @InjectModel(Drinks.name) private _drinksDb: Model<DrinksDocument>,
    @Inject(LangService) private _langService: LangService
  ) {

  }

  async findProductsByIds(queries: Partial<QueryFindProductsDto>): Promise<any> {
    const products = {
      pizzas: [],
      drinks: []
    };
    if (queries?.pizzas?.length) {
      const pizzasIds = queries.pizzas.filter(id => id);
      const pizzas = await this._pizzasDb.find({ _id: { $in: pizzasIds } });
      products.pizzas = pizzas.map(pizza => new ModelPizzaPublic({
        ...pizza._doc,
        name: this._langService.getValue(pizza._doc.name)
      }));
    }

    if (queries?.drinks?.length) {
      const drinksIds = queries.drinks.filter(id => id);
      const drinks = await this._drinksDb.find({ _id: { $in: drinksIds } });
      products.drinks = drinks.map(drink => new ModelDrinks(drink));
    }

    return products;

  }

}
