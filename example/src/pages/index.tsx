import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Tab, TabBig, TabList, TabPanel, Tabs } from "../components/tab-overview"
import Legend from "../components/legend"
import { primaryColorStyle, titleStyle, rowStyle, columnStyle } from "./index.css"
import Card from "../components/card"

type DataProps = {
  info: {
    username: string
  }
  favTV: {
    nodes: {
      name: string
      vote_average: number
      first_air_date: string
      poster_path: {
        path: string
      }
      next_episode_to_air?: {
        air_date: string
      }
      tmdbId: string
      status: "Returning Series" | "Ended" | "Canceled"
      number_of_episodes: number
      number_of_seasons: number
    }[]
    totalCount: number
  }
  favMovies: {
    nodes: {
      title: string
      release_date: string
      vote_average: number
      tmdbId: string
      poster_path: {
        path: string
      }
    }[]
    totalCount: number
  }
}

const Row: React.FC = ({ children }) => <section className={rowStyle}>{children}</section>
const Column: React.FC = ({ children }) => <div className={columnStyle}>{children}</div>

const Index: React.FC<PageProps<DataProps>> = ({ data: { info, favTV, favMovies } }) => (
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
            <Tab>Series ({favTV.totalCount})</Tab>
            <Tab>Movies ({favMovies.totalCount})</Tab>
          </TabList>
          <TabPanel>
            <Row>
              {favTV.nodes.map((tv) => {
                let airDate
                if (tv.next_episode_to_air) {
                  airDate = tv.next_episode_to_air.air_date
                }

                return (
                  <Column key={tv.tmdbId}>
                    <Card
                      name={tv.name}
                      cover={tv.poster_path.path}
                      next={airDate}
                      rating={tv.vote_average}
                      status={tv.status}
                      release={tv.first_air_date}
                      episodes={tv.number_of_episodes}
                      seasons={tv.number_of_seasons}
                    />
                  </Column>
                )
              })}
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              {favMovies.nodes.map((movie) => (
                <Column key={movie.tmdbId}>
                  <Card
                    cover={movie.poster_path.path}
                    name={movie.title}
                    rating={movie.vote_average}
                    release={movie.release_date}
                  />
                </Column>
              ))}
            </Row>
          </TabPanel>
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
    favTV: allTmdbAccountFavoriteTv(sort: { fields: vote_average, order: DESC }) {
      nodes {
        name
        vote_average
        first_air_date
        poster_path {
          path: w342
        }
        next_episode_to_air {
          air_date
        }
        tmdbId
        status
        number_of_episodes
        number_of_seasons
      }
      totalCount
    }
    favMovies: allTmdbAccountFavoriteMovies(sort: { fields: vote_average, order: DESC }) {
      nodes {
        title
        release_date
        vote_average
        tmdbId
        poster_path {
          path: w342
        }
      }
      totalCount
    }
  }
`
