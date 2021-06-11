import * as homeReducer from './home.reducer';
import * as homeActions from '../actions/home.action';
import { mockBanners } from '../../../../shared/mocks/banners.mock';
describe('Home Reducter Test', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = homeReducer;
      const action = {
        type: 'Unknown',
      };
      const state = homeReducer.homeReducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should fetch banners return intial value', () => {
      const { initialState } = homeReducer;
      const action = homeActions.fetchBanners();
      const state = homeReducer.homeReducer(initialState, action);
      expect(state).toEqual(initialState);
    });

    it('should set banners return setted value', () => {
      const { initialState } = homeReducer;
      const action = homeActions.setBanners({ banners: mockBanners });
      const state = homeReducer.homeReducer(initialState, action);
      expect(state.banners.length).toEqual(2);
    });

    it('should set error msg on loadfail', () => {
      const { initialState } = homeReducer;
      const action = homeActions.loadingFail({ errorMessage: 'Failed' });
      const state = homeReducer.homeReducer(initialState, action);
      expect(state.errorMessage).toEqual('Failed');
    });
  });
});
