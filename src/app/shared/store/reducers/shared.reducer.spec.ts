import * as sharedReducer from './shared.reducer';
import * as sharedActions from '../actions/shared.actions';
import { mockCategories } from '../../mocks/category.mock';
describe('Shared Reducter Test', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = sharedReducer;
      const action = {
        type: 'Unknown',
      };
      const state = sharedReducer.sharedReducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should fetch categries return intial value', () => {
      const { initialState } = sharedReducer;
      const action = sharedActions.fetchCategories();
      const state = sharedReducer.sharedReducer(initialState, action);
      expect(state).toEqual(initialState);
    });

    it('should set banners return setted value', () => {
      const { initialState } = sharedReducer;
      const action = sharedActions.setCategories({
        categories: mockCategories,
      });
      const state = sharedReducer.sharedReducer(initialState, action);
      expect(state.categories.length).toEqual(2);
    });

    it('should set error msg on loadfail', () => {
      const { initialState } = sharedReducer;
      const action = sharedActions.catLoadFail({ errorMessage: 'Failed' });
      const state = sharedReducer.sharedReducer(initialState, action);
      expect(state.errorMessage).toEqual('Failed');
    });
  });
});
