import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import menuList from "@/config/menuConfig";
import "./index.less";
/**
 * De acuerdo con la dirección de enrutamiento en la barra de direcciones del navegador actual, busque la ruta de redirección de ruta en menuConfig
 * Si la dirección de enrutamiento es / charts / keyboard, la ruta encontrada es [{title: "chart", ...}, {title: "keyboard chart", ...}]
 */
const getPath = (menuList, pathname) => {
  let temppath = [];
  try {
    function getNodePath(node) {
      temppath.push(node);
      //Encuentre un nodo que cumpla con las condiciones y finalice la recursividad lanzando
      if (node.path === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        temppath.pop();
      } else {
        temppath.pop();
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return temppath;
  }
};

const BreadCrumb = (props) => {
  const { location } = props;
  const { pathname } = location;
  let path = getPath(menuList, pathname);
  const first = path && path[0];
  if (first && first.title.trim() !== "Inicio") {
    path = [{ title: "Inicio", path: "/dashboard" }].concat(path);
  }
  return (
    <div className="Breadcrumb-container">
      <Breadcrumb>
        {path &&
          path.map((item) =>
            item.title === "Inicio" ? (
              <Breadcrumb.Item key={item.path}>
                <a href={`#${item.path}`}>{item.title}</a>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
            )
          )}
      </Breadcrumb>
    </div>
  );
};

export default withRouter(BreadCrumb);
