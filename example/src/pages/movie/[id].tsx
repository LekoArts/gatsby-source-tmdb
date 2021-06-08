import * as React from "react"
import { PageProps } from "gatsby"
import Layout from "../../components/layout"
import Provider from "../../utils/provider"
import DetailView from "../../components/detail-view"

const MovieDetail: React.FC<PageProps> = ({ params }) => (
  <Provider>
    <Layout>
      <DetailView id={params.id} type="movie" />
    </Layout>
  </Provider>
)

export default MovieDetail
