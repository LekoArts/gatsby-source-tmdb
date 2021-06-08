import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import fetch from "node-fetch"

const BASE_URL = `https://api.themoviedb.org/3/`

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  const { type, id } = req.query

  const URL = `${BASE_URL}${type}/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos,similar,credits`
  const response = await fetch(URL)

  if (response.url !== URL) {
    res.status(500).json({ error: `Couldn't load the information from the api` })
  }

  const result = await response.json()

  res.status(200).json(result)
}
