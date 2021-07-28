import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function getDepartaments() {
  return request({
    url: '/departament/list',
    method: 'get'
  })
}

export function getDepartamentName(data) {
  return request({
    url: '/departament/filter/'.concat(data.name),
    method: 'get'
  })
}

export function deleteDepartament(id) {
  return request({
    url: '/departament/delete/'.concat(id.toString()),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function editDepartament(data) {
  return request({
    url: '/departament/update/'.concat(data.id),
    method: 'put',
    data,
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function addDepartament(data) {
  return request({
    url: '/departament/create',
    method: 'post',
    data
  })
}

export function reqValidatName(name) {
  return request({
    url: '/departament/exist/'.concat(name),
  })
}