import * as React from "react"
import { PageProps } from "gatsby"
import Layout from "../../components/layout"
import Provider from "../../utils/provider"
import DetailView from "../../components/detail-view"

const TVDetail: React.FC<PageProps> = ({ params }) => (
  <Provider>
    <Layout>
      <DetailView id={params.id} type="tv" />
    </Layout>
  </Provider>
)

export default TVDetail
