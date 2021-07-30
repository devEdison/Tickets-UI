import request from '@/utils/request'
import { getToken} from "@/utils/auth";

export function reqCreateInfo(token, userName) {
  return request({
    url: '/ticket/profile/'.concat(userName),
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${token}`,
  },
  })
}

export function getCreate(userName) {
  return request({
    url: '/ticket/detail/user/'.concat(userName),
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function getTicketUser(id) {
  return request({
    url: '/ticket/detail/user/'.concat(id),
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`,
  },
  })
}

export function deleteCreate(id) {
  return request({
    url: '/ticket/delete/'.concat(id),
    method: 'delete',
    headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${getToken()}`
  }
  })
}

export function editCreate(data) {
  return request({
    url: '/ticket/edit',
    method: 'post',
    data
  })
}

export function reqValidatCreateID(data) {
  return request({
    url: '/ticket/validatCreateID',
    method: 'post',
    data
  })
}

export function addCreate(data) {
  return request({
    url: '/ticket/add',
    method: 'post',
    data
  })
}