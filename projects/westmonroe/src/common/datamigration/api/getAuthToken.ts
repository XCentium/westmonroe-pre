import Result from '@/core/result'
import { createURL } from '@/core/url'
import http from '@/core/http'
import { LOGIN_TO_ACCOUNT_FAILED } from '@/core/errors'

export type AuthToken = {
  auth_token?: string
}

export default async function getAuthToken(): Promise<Result<AuthToken>> {
  const url = createURL('/v3/user-session', {
    origin: settings.contentstack.apiHost
  })
  const payload = new URLSearchParams()

  payload.append('email', '')
  payload.append('password', '')

  const result = await http.post<AuthToken>(url, payload, {
    json: false,
    headers: {
      [`content-type`]: 'application/json',
    },
  })

  if (!result.ok) {
    console.error('Content Stack API (getAuthToken)', result)
  }

  if (!result.ok || !result.data) {
    return Result.fail(LOGIN_TO_ACCOUNT_FAILED)
  }

  return Result.success(result.data)
}
