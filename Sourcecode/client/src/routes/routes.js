import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import AddProduct from '~/pages/Add Product';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import ProductList from '~/pages/ProductList';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.addProduct, component: AddProduct },
    { path: config.routes.productList, component: ProductList },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
