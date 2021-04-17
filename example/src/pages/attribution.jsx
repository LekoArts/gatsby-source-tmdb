import * as React from "react"
import Layout from "../components/layout"
import Link from "../components/link"

const Attribution = () => (
  <Layout>
    <h1>Attribution</h1>
    <p>
      <Link to="https://www.themoviedb.org/">The Movie Database</Link> for providing all the data via its API.
    </p>
    <p>
      <Link to="https://github.com/grantholle/moviedb-promise">moviedb-promise</Link> for helping with the TS types and
      some general concepts around effectively fetching the data.
    </p>
    <p>
      Star by laris icon from the Noun Project, Calendar by Thengakola from the Noun Project, movie ticket by Three Six
      Five from the Noun Project.
    </p>
  </Layout>
)

export default Attribution
