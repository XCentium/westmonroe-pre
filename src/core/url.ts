import { isNil } from '@/core/objects'

export function createURL(
  pathname: string,
  options?: {
    origin?: string
    search?: Record<string, string | number | boolean | string[] | number[] | boolean[] | null | undefined>
  },
): URL {
  let origin = options?.origin

  if (!origin) {
    origin = process.env.PUBLIC_URL
  }

  const url = new URL(pathname, origin)
  const search = options?.search ?? {}

  for (const [key, data] of Object.entries(search)) {
    if (Array.isArray(data)) {
      data.forEach((item) => (!isNil(item) ? url.searchParams.append(key, item as string) : null))
    } else {
      !isNil(data) ? url.searchParams.append(key, data as string) : null
    }
  }

  return url
}

export function getQueryParam(url: URL, name: string) {
  const entries = url.searchParams.entries()

  for (const [key, value] of entries as any) {
    if (key.toLowerCase() === name.toLowerCase()) {
      return value
    }
  }

  return null
}
