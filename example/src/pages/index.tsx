import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Tab, TabBig, TabList, TabPanel, Tabs } from "../components/tab-overview"
import Legend from "../components/legend"
import { primaryColorStyle, titleStyle } from "./index.css"

type DataProps = {
  info: {
    username: string
  }
}

const Index: React.FC<PageProps<DataProps>> = ({ data: { info } }) => (
  <Layout>
    <h1 className={titleStyle}>
      Series & Movies<span className={primaryColorStyle}>.</span> {info.username}
    </h1>
    <Legend />
    <Tabs forceRenderTabPanel>
      <TabList>
        <TabBig>Favorites</TabBig>
        <TabBig>Watchlist</TabBig>
        <TabBig>Lists</TabBig>
      </TabList>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>Series</Tab>
            <Tab>Movies</Tab>
          </TabList>
          <TabPanel>01</TabPanel>
          <TabPanel>02</TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>Series</Tab>
            <Tab>Movies</Tab>
          </TabList>
          <TabPanel>01</TabPanel>
          <TabPanel>02</TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>01</Tab>
          </TabList>
          <TabPanel>01</TabPanel>
        </Tabs>
      </TabPanel>
    </Tabs>
  </Layout>
)

export default Index

export const query = graphql`
  {
    info: tmdbAccount {
      username
    }
  }
`
