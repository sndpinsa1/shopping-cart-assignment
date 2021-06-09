import { AppState } from '../../store/reducers/app.reducer';
import { Cart } from '../../features/products/models/product';
import { mockBanners } from './banners.mock';
import { mockProducts } from './products.mock';

export const mockCart: Cart[] = [
  {
    product: {
      category: 'Fruits',
      imageURL: 'abc.jpg',
      name: 'Apple',
      sku: 'apple',
      stock: 40,
      price: 45,
      description: 'American apple',
    },
    qty: 2,
  },
  {
    product: {
      name: 'Epigamia Greek Yogurt - Strawberry, 90 gm',
      imageURL:
        'assets/static/images/products/bakery-cakes-dairy/yogurt-red.jpg',
      description: 'Low Fat and High protein delicious and thick Greek Yogurt.',
      price: 40,
      stock: 50,
      category: '5b6899123d1a866534f516de',
      sku: 'bcd-yogurt-red',
      id: '5b6c6dd701a7c3842953088b',
    },
    qty: 1,
  },
];
export const appState: AppState = {
  auth: {
    user: { email: '', password: '' },
  },
  global: {
    categories: [],
    errorMessage: '',
  },
  home: {
    banners: mockBanners,
    categories: [],
    errorMessage: '',
  },
  products: {
    items: mockCart,
    errorMsg: '',
    products: mockProducts,
    selectedCategoryId: '5b6899123d1a866534f516de',
  },
};
