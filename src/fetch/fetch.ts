import { default as nodeFetch, Headers } from 'node-fetch'
import { isStatus } from './isStatus'
import { Method } from './Methods'

export async function fetch<T>(
  url: string,
  {
    body,
    headers,
    method,
    query,
    useNodeFetch=false,
  }: FetchOptions,
): Promise<FetchResponse<T>> {
  let _fetch = useNodeFetch ? nodeFetch : globalThis.fetch
  let _headers: [string, string][] | undefined = headers ? Object.entries(headers) : undefined
  let _body: string | undefined = body ? JSON.stringify(body) : undefined

  if (query) {
    let params = new URLSearchParams(query).toString()
    url += params ? '?' + params : ''
  }

  try {
    const res = await _fetch(
      url,
      {
        method,
        headers: _headers,
        body: _body,
      },
    )

    let data: any
    try {
      data = await res.json()
    } catch(e) {}

    let status = res.status
    let headers = res.headers
    
    if (
      isStatus('4xx', status) ||
      isStatus('5xx', status)
    ) {
      return {
        ok: false,
        data,
        status,
        headers,
      }
    } else {
      return {
        ok: true,
        data,
        status,
        headers,
      }
    }
  } catch(e) {
    return {
      ok: false,
      data: undefined,
      status: 400,
      headers: new Headers(),
    }
  }
}

export interface FetchOptions {
  method?: Method
  query?: {[k: string]: string}
  body?: {[k: string]: string}
  headers: {[k: string]: string}
  useNodeFetch?: boolean
}

export type FetchResponse<T> = {
  ok: true
  data: T
  status: number
  headers: globalThis.Headers | Headers
} | {
  ok: false
  data: unknown
  status: number
  headers: globalThis.Headers | Headers
}

export interface Response<T> {
  data: FetchResponse<T>['data']
  ok: FetchResponse<T>['ok']
}
