import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function getCategories() {
  return request({
    url: '/category/list',
    method: 'get'
  })
}

export function getCategoryName(data) {
  return request({
    url: '/category/filter/'.concat(data.name),
    method: 'get'
  })
}

export function deleteCategory(id) {
  return request({
    url: '/category/delete/'.concat(id.toString()),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function editCategory(data) {
  return request({
    url: '/category/update/'.concat(data.id),
    method: 'put',
    data,
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function addCategory(data) {
  return request({
    url: '/category/create',
    method: 'post',
    data
  })
}

export function reqValidatCategory(name) {
  return request({
    url: '/category/exist/'.concat(name),
  })
}