import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function getStatus() {
  return request({
    url: '/status/list',
    method: 'get'
  })
}

export function getStatusName(data) {
  return request({
    url: '/status/filter/'.concat(data.name),
    method: 'get'
  })
}

export function deleteStatus(id) {
  return request({
    url: '/status/delete/'.concat(id.toString()),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function editStatus(data) {
  return request({
    url: '/status/update/'.concat(data.id),
    method: 'put',
    data,
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function addStatus(data) {
  return request({
    url: '/status/create',
    method: 'post',
    data
  })
}

export function reqValidatStatus(name) {
  return request({
    url: '/status/exist/'.concat(name),
  })
}