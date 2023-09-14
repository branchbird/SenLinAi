// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addAssistant POST /api/assistant/add */
export async function addAssistantUsingPOST(
  body: API.AssistantAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/assistant/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** aiAssistant POST /api/assistant/aiAssistant */
export async function aiAssistantUsingPOST(
  body: API.GetChartByAIRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/assistant/aiAssistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAssistant POST /api/assistant/delete */
export async function deleteAssistantUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/assistant/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editAssistant POST /api/assistant/edit */
export async function editAssistantUsingPOST(
  body: API.AssistantEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/assistant/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAssistantById GET /api/assistant/get */
export async function getAssistantByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssistantByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAssistant_>('/api/assistant/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listAssistantByPage POST /api/assistant/list/page */
export async function listAssistantByPageUsingPOST(
  body: API.AssistantQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAssistant_>('/api/assistant/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyAssistantByPage POST /api/assistant/my/list/page */
export async function listMyAssistantByPageUsingPOST(
  body: API.AssistantQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAssistant_>('/api/assistant/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAssistant POST /api/assistant/update */
export async function updateAssistantUsingPOST(
  body: API.AssistantUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/assistant/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
