import * as authReducer from './auth.reducer';
import * as authActions from '../actions/auth.action';
describe('Auth Reducter Test', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = authReducer;
      const action = {
        type: 'Unknown',
      };
      const state = authReducer.authReducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should return login state', () => {
      const { initialState } = authReducer;
      const newState = {
        user: {
          email: 'abc@gmail.com',
          password: '123456789',
          firstName: 'sandeep',
        },
      };
      const action = authActions.login(newState);
      const state = authReducer.authReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should state become blank', () => {
      const { initialState } = authReducer;
      const newState = {
        user: {
          email: 'abc@gmail.com',
          password: '123456789',
          firstName: 'sandeep',
        },
      };
      const action = authActions.login(newState);
      const state = authReducer.authReducer(initialState, action);
      expect(state).toEqual(newState);

      const logoutAction = authActions.logout();
      const logoutState = authReducer.authReducer(initialState, logoutAction);
      expect(state).not.toEqual(logoutState);
    });
  });
});
