import * as productReducer from './products.reducer';
import * as productActions from '../actions/products.action';
import { mockCart } from '../../../../shared/mocks/app-state.mock';
import { mockProducts } from '../../../../shared/mocks/products.mock';
describe('Proudct Reducter Test', () => {
  describe('prduct action', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it('should return the default state', () => {
      const { initialState } = productReducer;
      const action = {
        type: 'Unknown',
      };
      const state = productReducer.productsReducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should add item to cart on addtocart action', () => {
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      expect(state.items.length).toBeGreaterThan(0);
    });

    it('should update item qty on update add action', () => {
      localStorage.clear();
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      const addAction = productActions.updateCartItem({
        productId: '5b6c750701a7c38429530897',
        action: 'add',
      });
      const nextstate = productReducer.productsReducer(state, addAction);
      expect(nextstate.items[0].qty).toEqual(3);
    });

    it('should update item qty on update add action', () => {
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      const addAction = productActions.updateCartItem({
        productId: '5b6c750701a7c38429530897',
        action: 'remove',
      });
      const nextstate = productReducer.productsReducer(state, addAction);
      expect(nextstate.items[0].qty).toEqual(1);
    });

    it('should update product not in to the cart', () => {
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      const addAction = productActions.updateCartItem({
        productId: '0000000000000000',
        action: 'remove',
      });
      const nextstate = productReducer.productsReducer(state, addAction);
      expect(nextstate).toEqual(state);
    });

    it('should be item remove from cart when qty 1', () => {
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      const addAction = productActions.updateCartItem({
        productId: '5b6c750701a7c38429530897',
        action: 'remove',
      });
      const nextstate = productReducer.productsReducer(state, addAction);
      const addAction2 = productActions.updateCartItem({
        productId: '5b6c750701a7c38429530897',
        action: 'remove',
      });
      const nextstate2 = productReducer.productsReducer(nextstate, addAction2);
      expect(nextstate2.items.length).toEqual(0);
    });

    it('should be empty items on empty cart', () => {
      const { initialState } = productReducer;
      const action = productActions.addToCart({ cart: mockCart[0] });
      const state = productReducer.productsReducer(initialState, action);
      const addAction = productActions.emptyCart();
      const nextstate = productReducer.productsReducer(state, addAction);
      expect(nextstate.items.length).toEqual(0);
    });

    it('should be all products load', () => {
      const { initialState } = productReducer;
      const action = productActions.loadProducts({ id: '' });
      const state = productReducer.productsReducer(initialState, action);
      expect(state).toEqual(initialState);
    });

    it('should set products', () => {
      const { initialState } = productReducer;
      const action = productActions.setProducts({
        products: mockProducts,
        selectedCategoryId: '5b6899953d1a866534f516e2',
      });
      const state = productReducer.productsReducer(initialState, action);
      expect(state.products.length).toEqual(2);
    });

    it('should should show errormsg', () => {
      const { initialState } = productReducer;
      const action = productActions.productLoadFailed({ errorMsg: 'failed' });
      const state = productReducer.productsReducer(initialState, action);
      expect(state.errorMsg).toEqual('failed');
    });

    it('should be catch when string not parse', () => {
      localStorage.setItem('cart', 'asfasdfasdfa');
      const result = productReducer.getCartItemFromLocalStorage();
      expect(result.length).toEqual(0);
    });
  });
});
