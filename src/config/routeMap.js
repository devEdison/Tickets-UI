import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Departaments = Loadable({loader: () => import(/*webpackChunkName:'Departaments'*/'@/views/catalogs/departaments'),loading: Loading});
const Category = Loadable({loader: () => import(/*webpackChunkName:'Category'*/'@/views/catalogs/category'),loading: Loading});
const Kind = Loadable({loader: () => import(/*webpackChunkName:'Kind'*/'@/views/catalogs/kind'),loading: Loading});
const Status = Loadable({loader: () => import(/*webpackChunkName:'Status'*/'@/views/catalogs/status'),loading: Loading});
const Priority = Loadable({loader: () => import(/*webpackChunkName:'Priority'*/'@/views/catalogs/priority'),loading: Loading});
const ExportExcel = Loadable({loader: () => import(/*webpackChunkName:'ExportExcel'*/'@/views/excel/exportExcel'),loading: Loading});
const UploadExcel = Loadable({ loader: () => import(/*webpackChunkName:'UploadExcel'*/'@/views/excel/uploadExcel'),loading: Loading });
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user'),loading: Loading});
const Assigned = Loadable({loader: () => import(/*webpackChunkName:'Assigned'*/'@/views/ticket/assigned'),loading: Loading});
const Create = Loadable({loader: () => import(/*webpackChunkName:'Create'*/'@/views/ticket/create'),loading: Loading});
const Assign = Loadable({loader: () => import(/*webpackChunkName:'Assign'*/'@/views/ticket/assign'),loading: Loading});
const About = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/about'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/catalogs/departaments", component: Departaments, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/catalogs/category", component: Category, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/catalogs/kind", component: Kind, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/catalogs/priority", component: Priority, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/catalogs/status", component: Status, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/ticket/assigned", component: Assigned, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/ticket/create", component: Create, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/ticket/assign", component: Assign, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/excel/export", component: ExportExcel, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/excel/upload", component: UploadExcel, roles: ["ROLE_ADMIN","ROLE_USER"] },
  { path: "/user", component: User, roles: ["ROLE_ADMIN"] },
  { path: "/about", component: About, roles: ["ROLE_ADMIN", "ROLE_USER"] },
  { path: "/error/404", component: Error404 },
];
