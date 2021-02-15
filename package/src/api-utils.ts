/**
 * Compiles the endpoint based on the params
 * @param url
 * @param params
 * @return Modified url
 */
export const modifyURL = (url: string, params?: Record<string, unknown>): string => {
  if (!params) {
    return url
  }

  const arr = Object.entries(params)

  arr.forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    url = url.replace(`:${key}`, value as string)
  })

  return url
}
