/**
 (The MIT License)

 Copyright (c) 2017 Grant Holle

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 'Software'), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { RequestParams } from "./types"

/**
 * Is something an object?
 * @param arg
 */
const isObject = (arg: unknown): boolean => typeof arg === `object` && arg !== null

/**
 * Compiles the endpoint based on the params
 * @param endpoint
 * @param params
 */
export const getEndpoint = (endpoint: string, params: RequestParams = {}): string =>
  Object.keys(params).reduce((compiled, key) => compiled.replace(`:${key}`, params[key]), endpoint)

export const normalizeParams = (
  endpoint: string,
  params: string | number | RequestParams = {}
): string | number | RequestParams => {
  if (isObject(params)) {
    return params
  }

  const matches = endpoint.match(/:[a-z]*/g) || []

  if (matches.length === 1) {
    return matches.reduce((obj, match) => {
      obj[match.substr(1)] = params

      return obj
    }, {})
  }

  return {}
}

export const getParams = (
  endpoint: string,
  params: RequestParams = {},
  apiKey: string,
  sessionId?: string
): RequestParams => {
  // Merge default parameters with the ones passed in
  const compiledParams: RequestParams = { api_key: apiKey, ...(sessionId && { session_id: sessionId }), ...params }

  // Some endpoints have an optional account_id parameter (when there's a session).
  // If it's not included, assume we want the current user's id,
  // which is setting it to '{account_id}'
  if (endpoint.includes(`:id`) && !compiledParams.id && sessionId) {
    compiledParams.id = `{account_id}`
  }

  return compiledParams
}
