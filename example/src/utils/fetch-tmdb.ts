export const fetchTmdb = async ({ type, id }) => {
  const URL = `/api/fetch-tmdb?type=${type}&id=${id}`
  const res = await fetch(URL)
  return res.json()
}
