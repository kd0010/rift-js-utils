import {Headers} from 'node-fetch'
import {isStatus} from './isStatus'
import {Method} from './Methods'

export async function fetch<S, F>(
  url: string,
  {
    body,
    headers,
    method,
    query,
    useNodeFetch=false,
  }: FetchOptions,
): Promise<FetchResponse<S, F>> {
  let _fetch = useNodeFetch ? (await import('node-fetch')).default : globalThis.fetch
  let _headers: [string, string][] | undefined = headers != null ? Object.entries(headers) : undefined
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
    try {data = await res.json()} catch (err) {}

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
  } catch (err) {
    return {
      ok: false,
      data: null as F,
      status: 400,
      headers: new globalThis.Headers(),
    }
  }
}

export interface FetchOptions {
  method?: Method
  query?: {[key: string]: string}
  body?: {[key: string]: string}
  headers?: {[key: string]: string}
  /** @default false */
  useNodeFetch?: boolean
}

interface FetchResponseSuccess<D> {
  ok: true
  data: D
  status: number
  headers: globalThis.Headers | Headers
}

interface FetchResponseFail<D> {
  ok: false
  data: D
  status: number
  headers: globalThis.Headers | Headers
}

export type FetchResponse<S, F> =
  | FetchResponseSuccess<S>
  | FetchResponseFail<F>

/**
 * Developer friendly interface
 * for building classes that utilize `fetch`.
 */
export type Response<D> = {
  ok: FetchResponseSuccess<D>['ok']
  data: FetchResponseSuccess<D>['data']
} | {
  ok: FetchResponseFail<D>['ok']
  data: FetchResponseFail<D>['data']
}
