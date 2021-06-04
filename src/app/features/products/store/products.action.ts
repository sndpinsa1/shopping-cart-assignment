import { Product } from '../../../shared/shared/models/product';
import { Cart } from '../../../shared/shared/models/cart';
import { createAction, props } from '@ngrx/store';


export const addToCart = createAction(
    '[Product Page] Add to cart',
    props<{cart:Cart}>()
);

export const updateCartItem = createAction(
    '[Product Page] Update cart item',
    props<{index:number, action:string}>()
)

export const emptyCart = createAction(
    '[Product Page] empty cart',
)

export const loadProducts = createAction(
    '[Product Page] load product',
    props<{id:string|null}>()
)

export const setProducts = createAction(
    '[Product Page] set products',
    props<{products:Product[], selectedCategoryId:string|null}>()
)


export const productLoadFailed = createAction(
    '[Product Page] Product load failed',
    props<{errorMsg:string}>()
)
