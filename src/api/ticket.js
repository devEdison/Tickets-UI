import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function reqUserInfo(userName) {
  return request({
    url: '/auth/profile/'.concat(userName),
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function getUsers() {
  return request({
    url: '/auth/list',
    method: 'get'
  })
}

export function deleteUser(id) {
  return request({
    url: '/auth/delete/'.concat(id),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`
  }
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function reqValidatUserID(data) {
  return request({
    url: '/user/validatUserID',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}