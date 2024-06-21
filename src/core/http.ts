import Result from '@/core/result'
import { getHTTPStatusByCode } from '@/core/http-status-codes'

import { WOOPS } from '@/core/errors'

export type HTTPClientOptions = Omit<RequestInit, 'method' | 'body'> & {
  json?: boolean
  authorization?: string
}

export class HTTPClient {
  async get<T = any>(url: URL, options: HTTPClientOptions = {}): Promise<Result<T>> {
    return this.fetch<T>(url, {
      ...options,
      method: 'GET',
    })
  }

  async post<T = any>(url: URL, data: any, options: HTTPClientOptions = {}): Promise<Result<T>> {
    return this.fetch<T>(url, {
      ...options,
      method: 'POST',
      body: this.toBody(data, options),
    })
  }

  async patch<T = any>(url: URL, data: any, options: HTTPClientOptions = {}): Promise<Result<T>> {
    return this.fetch<T>(url, {
      ...options,
      method: 'PATCH',
      body: this.toBody(data, options),
    })
  }

  async put<T = any>(url: URL, data: any, options: HTTPClientOptions = {}): Promise<Result<T>> {
    return this.fetch<T>(url, {
      ...options,
      method: 'PUT',
      body: this.toBody(data, options),
    })
  }

  async delete<T = any>(url: URL, options: HTTPClientOptions = {}): Promise<Result<T>> {
    return this.fetch<T>(url, {
      ...options,
      method: 'DELETE',
      body: this.toBody({}, options),
    })
  }

  private toBody(data: any, options: HTTPClientOptions) {
    return options.json === false ? data : JSON.stringify(data)
  }

  private setDefaultOptions(options: HTTPClientOptions) {
    if (typeof options.json === 'undefined') {
      options.json = true
    }
  }

  private setDefaultHeaders(options: HTTPClientOptions) {
    const headers: Record<string, string> = {}

    if (options.json) {
      headers[`content-type`] = 'application/json'
    }

    if (options.authorization) {
      headers[`authorization`] = options.authorization
    }

    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers[key.toLowerCase()] = value
      }
    }

    options.headers = headers
  }

  private async parse(response: Response) {
    const text = await response.text()
    const type = response.headers.get('content-type')?.toLowerCase()

    if (!text) {
      return { ok: true }
    }

    if (!type?.toLowerCase().includes('application/json')) {
      return { ok: true, value: text }
    }

    try {
      return { ok: true, value: JSON.parse(text) }
    } catch {
      return { ok: false, value: 'Invalid JSON Input' }
    }
  }

  private async fetch<T = any>(url: URL, options: RequestInit) {
    let response: Response | undefined

    this.setDefaultOptions(options)
    this.setDefaultHeaders(options)

    try {
      response = await fetch(url, options)
    } catch (error: any) {
      return Result.fail<T>(WOOPS, {
        url: url.toString(),
        message: error?.cause?.reason ?? error?.message,
      })
    }

    const parsed = await this.parse(response)

    if (response.ok && parsed.ok && Result.is(parsed.value)) {
      return Result.from<T>(parsed.value, true)
    }

    if (response.ok && parsed.ok) {
      return Result.success<T>(parsed.value)
    }

    let result: Result<T>

    if (Result.is(parsed.value)) {
      result = Result.from<T>(parsed.value)
    } else {
      result = Result.fail(getHTTPStatusByCode(response.status), { origin: parsed.value })
    }

    const metadata = { url: url.toString(), status: response.status }

    if (result.metadata) {
      result.metadata = { ...result.metadata, ...metadata }
    } else {
      result.metadata = { ...metadata }
    }

    return result
  }
}

const http = new HTTPClient()

export default http
