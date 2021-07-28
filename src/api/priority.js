import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function getPriorities() {
  return request({
    url: '/priority/list',
    method: 'get'
  })
}

export function getPriorityName(data) {
  return request({
    url: '/priority/filter/'.concat(data.name),
    method: 'get'
  })
}

export function deletePriority(id) {
  return request({
    url: '/priority/delete/'.concat(id.toString()),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function editPriority(data) {
  return request({
    url: '/priority/update/'.concat(data.id),
    method: 'put',
    data,
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function addPriority(data) {
  return request({
    url: '/priority/create',
    method: 'post',
    data
  })
}

export function reqValidatPriority(name) {
  return request({
    url: '/priority/exist/'.concat(name),
  })
}