import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function getKinds() {
  return request({
    url: '/kind/list',
    method: 'get'
  })
}

export function getKindName(data) {
  return request({
    url: '/kind/filter/'.concat(data.name),
    method: 'get'
  })
}

export function deleteKind(id) {
  return request({
    url: '/kind/delete/'.concat(id.toString()),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function editKind(data) {
  return request({
    url: '/kind/update/'.concat(data.id),
    method: 'put',
    data,
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function addKind(data) {
  return request({
    url: '/kind/create',
    method: 'post',
    data
  })
}

export function reqValidatKind(name) {
  return request({
    url: '/kind/exist/'.concat(name),
  })
}