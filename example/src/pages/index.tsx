import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Tab, TabBig, TabList, TabPanel, Tabs } from "../components/tab-overview"
import Legend from "../components/legend"
import { primaryColorStyle, titleStyle, rowStyle, columnStyle, descStyle } from "./index.css"
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
  lists: {
    totalCount: number
    nodes: {
      name: string
      description: string
      items: {
        name: string
        vote_average: number
        first_air_date: string
        media_type: string
        id: number
        poster_path: {
          path: string
        }
      }[]
    }[]
  }
  watchedTV: {
    totalCount: number
    nodes: {
      first_air_date: string
      next_episode_to_air: {
        air_date: string
      }
      vote_average: number
      status: "Returning Series" | "Ended" | "Canceled"
      tmdbId: string
      name: string
      number_of_episodes: number
      number_of_seasons: number
      poster_path: {
        path: string
      }
    }[]
  }
  watchedMovies: {
    totalCount: number
    nodes: {
      release_date: string
      vote_average: number
      tmdbId: string
      title: string
      poster_path: {
        path: string
      }
    }[]
  }
}

const Row: React.FC = ({ children }) => <section className={rowStyle}>{children}</section>
const Column: React.FC = ({ children }) => <div className={columnStyle}>{children}</div>

const Index: React.FC<PageProps<DataProps>> = ({
  data: { info, favTV, favMovies, lists, watchedMovies, watchedTV },
}) => (
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
            <Tab>Series ({watchedTV.totalCount})</Tab>
            <Tab>Movies ({watchedMovies.totalCount})</Tab>
          </TabList>
          <TabPanel>
            <Row>
              {watchedTV.nodes.map((tv) => {
                let airDate
                if (tv.next_episode_to_air) {
                  airDate = tv.next_episode_to_air.air_date
                }
                return (
                  <Column key={tv.name}>
                    <Card
                      cover={tv.poster_path.path}
                      name={tv.name}
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
              {watchedMovies.nodes.map((movie) => (
                <Column key={movie.title}>
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
            {lists.nodes.map((list) => (
              <Tab key={list.name}>{list.name}</Tab>
            ))}
          </TabList>
          {lists.nodes.map((list) => (
            <TabPanel key={list.name}>
              <div className={descStyle}>{list.description}</div>
              <Row>
                {list.items.map((item) => (
                  <Column key={item.name}>
                    <Card
                      cover={item.poster_path.path}
                      name={item.name}
                      rating={item.vote_average}
                      release={item.first_air_date}
                    />
                  </Column>
                ))}
              </Row>
            </TabPanel>
          ))}
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
    lists: allTmdbAccountLists {
      totalCount
      nodes {
        name
        description
        items {
          name
          vote_average
          first_air_date
          media_type
          id
          poster_path {
            path: w342
          }
        }
      }
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
    watchedTV: allTmdbAccountWatchlistTv(sort: { fields: first_air_date, order: DESC }) {
      totalCount
      nodes {
        first_air_date
        next_episode_to_air {
          air_date
        }
        vote_average
        status
        tmdbId
        name
        number_of_episodes
        number_of_seasons
        poster_path {
          path: w342
        }
      }
    }
    watchedMovies: allTmdbAccountWatchlistMovies(sort: { fields: release_date, order: DESC }) {
      totalCount
      nodes {
        release_date
        vote_average
        tmdbId
        title
        poster_path {
          path: w342
        }
      }
    }
  }
`
