// Checks if a given value is either undefined or null.
export function isNil(value: any) {
  return typeof value === 'undefined' || value === null
}

// Extracts the ID and anchor tag from the given data source.
export function getIdAndAnchorTag(source: any) {
  const id = source?.rendering?.uid?.replace(/\W/gi, '')
  const tag = source?.fields?.anchorTag?.value

  return {
    [`id`]: tag || id,
    [`data-id`]: id,
  }
}

// This method will rename any property that does not adhere to the Camel Case
// naming convention, in accordance with what is expected in a standard JSON
// object. Example: From "User Name" to "userName".
export function fixPropertyNames<T = any>(source: T): any {
  if (source === null || typeof source !== 'object') return source

  if (Array.isArray(source)) {
    return source.map((item) => fixPropertyNames(item))
  }

  const target: any = {}

  for (const key in source) {
    if (!source.hasOwnProperty(key)) continue

    const name = key.replace(/\s+/g, '').replace(/(\w)(\w*)/, (_, first, rest) => `${first.toLowerCase()}${rest}`)

    target[name] = fixPropertyNames(source[key])
  }

  return target
}

// Recursively removes properties with undefined values from the given object.
export function fixUndefinedProperties<T = any>(source: T): any {
  if (typeof source !== 'object' || source === null) {
    return source
  }

  if (Array.isArray(source)) {
    return source.map((item) => fixUndefinedProperties(item))
  }

  const cleaned: { [key: string]: any } = {}

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const value = fixUndefinedProperties(source[key])

      if (value !== undefined) {
        cleaned[key] = value
      }
    }
  }

  return cleaned
}

// Replaces localhost URLs in the given source object with the public URL.
export function fixURLs<T = any>(source: T): any {
  try {
    const url = new URL('/', process.env.PUBLIC_URL)

    const json = JSON.stringify(source).replace(/http[s]?\:\/\/localhost(\:\d+)?\//gi, url.toString())

    return JSON.parse(json)
  } catch (error) {
    console.error('Root: Fix Localhost URLs Error', error)

    return source
  }
}

