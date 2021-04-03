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

  // All parameters should be passed as :param (the API docs denote this as {par_am})
  arr.forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    url = url.replace(`:${key}`, value.toString())
  })

  return url
}

const getParamRegex = /:(.*)/

/**
 * Parse the endpoint URL and get the parameter that is used
 * @param url
 * @return Parameter without colon
 */
export const getParam = (url: string): string => url.match(getParamRegex)[1]
