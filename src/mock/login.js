const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
  edison: "edison-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "Admin",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    description: "Posee todos los permisos del sistema de enrutamiento y menú",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "Editor",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"Puede ver todas las páginas excepto la página de administración de usuarios",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "Guest",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"Solo puede ver las cuatro páginas del Tablero, los documentos de desarrollo, la prueba de permisos y sobre el autor ",
  },
};

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    if (!token) {
      return {
        status: 1,
        message: "Nombre de usuario o contraseña incorrectos.",
      };
    }
    return {
      status: 0,
      token,
    };
  },
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        status: 1,
        message: "No se pudo obtener la información del usuario",
      };
    }
    return {
      status: 0,
      userInfo,
    };
  },
  getUsers: () => {
    return {
      status: 0,
      users: Object.values(users),
    };
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    const token = tokens[id];
    if (token) {
      delete tokens[id];
      delete users[token];
    }
    return {
      status: 0,
    };
  },
  editUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const token = tokens[id];
    if (token) {
      users[token] = { ...users[token], ...data };
    }
    return {
      status: 0,
    };
  },
  ValidatUserID: (config) => {
    const userID = config.body;
    const token = tokens[userID];
    if (token) {
      return {
        status: 1,
      };
    } else {
      return {
        status: 0
      };
    }
  },
  addUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    tokens[id] = `${id}-token`
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data
    }
    return {
      status: 0,
    };
  },
  logout: (_) => {
    return {
      status: 0,
      data: "success",
    };
  },
};
