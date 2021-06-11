// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AppApi : {
    GET_CATEGORIES:'/assets/server/categories/categories.json',
    GET_BANNERS:'/assets/server/banners/banners.json',
    GET_PRODUCTS:'/assets/server/products/products.json',
    ADD_TO_CART:'/assets/server/addToCart/addtocart.json'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

