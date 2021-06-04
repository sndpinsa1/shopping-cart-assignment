import { Category } from '../../../shared/shared/models/category';
import { Banner } from '../../../shared/shared/models/banner';
import { createAction, props } from '@ngrx/store';

export const fetchBanners = createAction(
    '[Home] fetch banners'
)

export const setBanners = createAction(
    '[Home] set banners',
    props<{banners:Banner[]}>()
)

export const loadingFail = createAction(
    '[Home] loading fail',
    props<{errorMessage:string}>()
)
export const loadHomePageData = createAction(
    '[Home] Load home page data'
)
