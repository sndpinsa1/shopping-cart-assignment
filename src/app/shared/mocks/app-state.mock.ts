import { AppState } from '../../store/reducers/app.reducer';
import { Cart } from '../../features/products/models/product';
import { mockBanners } from './banners.mock';
import { mockProducts } from './products.mock';

export const mockCart: Cart[] = [
  {
    product: {
      name: 'Johnson & Johnson Baby skincare wipes, 20 pcs',
      imageURL: 'assets/static/images/products/baby/wipes.jpg',
      description:
        'Johnsons Baby wipes gently cleanse and care for babys delicate skin. As mild as pure water, they can be used safely all over the body, even around eyes.',
      price: 70,
      stock: 50,
      category: '5b6899683d1a866534f516e0',
      sku: 'baby-wipes-20',
      id: '5b6c750701a7c38429530897',
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
    selectedCategoryId: '5b6899953d1a866534f516e2',
  },
};
