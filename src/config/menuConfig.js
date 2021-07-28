/**
 * icon:Ícono de elemento de menú
 * roles:Indique la función en la que se puede mostrar el elemento del menú actual. Si no escribe esta opción, significa que el elemento del menú es completamente público y se mostrará en cualquier función.
 */
const menuList = [
  {
    title: "Inicio",
    path: "/dashboard",
    icon: "home",
    roles:["ROLE_ADMIN","ROLE_USER"]
  },
  {
    title: "Catalogos",
    path: "/catalogs",
    icon: "appstore",
    roles:["ROLE_ADMIN","ROLE_USER"],
    children: [
      {
        title: "Departamentos",
        path: "/catalogs/departaments",
        roles:["ROLE_ADMIN","ROLE_USER"],
      },
      {
        title: "Categorias",
        path: "/catalogs/category",
        roles:["ROLE_ADMIN","ROLE_USER"],
      },
      {
        title: "Tipos",
        path: "/catalogs/kind",
        roles:["ROLE_ADMIN","ROLE_USER"],
      },
      {
        title: "Prioridad",
        path: "/catalogs/priority",
        roles:["ROLE_ADMIN","ROLE_USER"],
      },
      {
        title: "Estado",
        path: "/catalogs/status",
        roles:["ROLE_ADMIN","ROLE_USER"],
      }
    ],
  },
  {
    title: "Ticket",
    path: "/ticket",
    icon: "file-excel",
    roles:["ROLE_ADMIN","ROLE_USER"],
    children: [
      {
        title: "Crear ticket",
        path: "/ticket/create",
        roles:["ROLE_ADMIN","ROLE_USER"]
      },
      {
        title: "Ticket asignados",
        path: "/ticket/assigned",
        roles:["ROLE_ADMIN"]
      },
      {
        title: "Asignar Ticket",
        path: "/ticket/assign",
        roles:["ROLE_ADMIN"]
      }
    ],
  },
  {
    title: "Usuarios",
    path: "/user",
    icon: "usergroup-add",
    roles:["ROLE_ADMIN"]
  },
  {
    title: "About",
    path: "/about",
    icon: "user",
    roles:["ROLE_ADMIN","ROLE_USER"]
  },
];
export default menuList;
