// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addDict POST /api/dict/add */
export async function addDictUsingPOST(body: API.DictAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/dict/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDict POST /api/dict/delete */
export async function deleteDictUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dict/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editDict POST /api/dict/edit */
export async function editDictUsingPOST(
  body: API.DictEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dict/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** findFathers GET /api/dict/findFathers */
export async function findFathersUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDict_>('/api/dict/findFathers', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getDictById GET /api/dict/get */
export async function getDictByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDict_>('/api/dict/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getDictByDictType GET /api/dict/getDictByDictType */
export async function getDictByDictTypeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictByDictTypeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListDict_>('/api/dict/getDictByDictType', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listDictByPage POST /api/dict/list/page */
export async function listDictByPageUsingPOST(
  body: API.DictQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDict_>('/api/dict/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyDictByPage POST /api/dict/my/list/page */
export async function listMyDictByPageUsingPOST(
  body: API.DictQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDict_>('/api/dict/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDict POST /api/dict/update */
export async function updateDictUsingPOST(
  body: API.DictUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/dict/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
