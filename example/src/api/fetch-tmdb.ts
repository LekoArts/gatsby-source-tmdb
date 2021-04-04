const BASE_URL = `https://api.themoviedb.org/3/`

export const fetchTmdb = async ({ type, id }) => {
  const URL = `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_API_KEY}&language=en-US&append_to_response=videos,similar,credits`
  // @ts-ignore
  const res = await fetch(URL)

  if (res.url !== URL) {
    throw new Error(`Couldn't load the information. Please try again later.`)
  }

  return res.json()
}
