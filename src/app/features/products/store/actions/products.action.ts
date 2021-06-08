import { Product, Cart } from '../../models/product';
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
    props<{id:string}>()
)

export const setProducts = createAction(
    '[Product Page] set products',
    props<{products:Product[], selectedCategoryId:string}>()
)


export const productLoadFailed = createAction(
    '[Product Page] Product load failed',
    props<{errorMsg:string}>()
)
