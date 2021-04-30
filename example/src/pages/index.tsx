import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { Globals } from "react-spring"
import { IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { Tab, TabBig, TabList, TabPanel, Tabs } from "../components/tab-overview"
import Legend from "../components/legend"
import { primaryColorStyle, titleStyle, descStyle, spacerStyle } from "../index.css"
import Card from "../components/card"
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion"

const Index: React.FC<PageProps<DataProps>> = ({
  data: { info, favTV, favMovies, lists, watchedMovies, watchedTV },
  location,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  React.useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    })
  }, [prefersReducedMotion])

  return (
    <Layout location={location}>
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
        <TabPanel isNavigation>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Series ({favTV.totalCount})</Tab>
              <Tab>Movies ({favMovies.totalCount})</Tab>
            </TabList>
            <div className={spacerStyle} />
            <TabPanel>
              {favTV.nodes.map((tv) => {
                let airDate
                if (tv.next_episode_to_air) {
                  airDate = tv.next_episode_to_air.air_date
                }

                return (
                  <Card
                    key={tv.tmdbId}
                    name={tv.name}
                    link={`/tv/${tv.tmdbId}`}
                    cover={tv.poster_path.localFile}
                    next={airDate}
                    rating={tv.vote_average}
                    status={tv.status}
                    release={tv.first_air_date}
                    episodes={tv.number_of_episodes}
                    seasons={tv.number_of_seasons}
                  />
                )
              })}
            </TabPanel>
            <TabPanel>
              {favMovies.nodes.map((movie) => (
                <Card
                  key={movie.tmdbId}
                  cover={movie.poster_path.path}
                  link={`/movie/${movie.tmdbId}`}
                  name={movie.title}
                  rating={movie.vote_average}
                  release={movie.release_date}
                />
              ))}
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel isNavigation>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Series ({watchedTV.totalCount})</Tab>
              <Tab>Movies ({watchedMovies.totalCount})</Tab>
            </TabList>
            <div className={spacerStyle} />
            <TabPanel>
              {watchedTV.nodes.map((tv) => {
                let airDate
                if (tv.next_episode_to_air) {
                  airDate = tv.next_episode_to_air.air_date
                }
                return (
                  <Card
                    key={tv.name}
                    cover={tv.poster_path.path}
                    link={`/tv/${tv.tmdbId}`}
                    name={tv.name}
                    next={airDate}
                    rating={tv.vote_average}
                    status={tv.status}
                    release={tv.first_air_date}
                    episodes={tv.number_of_episodes}
                    seasons={tv.number_of_seasons}
                  />
                )
              })}
            </TabPanel>
            <TabPanel>
              {watchedMovies.nodes.map((movie) => (
                <Card
                  key={movie.title}
                  cover={movie.poster_path.path}
                  link={`/movie/${movie.tmdbId}`}
                  name={movie.title}
                  rating={movie.vote_average}
                  release={movie.release_date}
                />
              ))}
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel isNavigation>
          <Tabs forceRenderTabPanel>
            <TabList>
              {lists.nodes.map((list) => (
                <Tab key={list.name}>{list.name}</Tab>
              ))}
            </TabList>
            <div className={spacerStyle} />
            {lists.nodes.map((list) => (
              <TabPanel key={list.name}>
                <div className={descStyle}>{list.description}</div>
                {list.items.map((item) => (
                  <Card
                    key={item.name}
                    cover={item.poster_path.path}
                    link={`/${item.media_type}/${item.id}`}
                    name={item.name}
                    rating={item.vote_average}
                    release={item.first_air_date}
                  />
                ))}
              </TabPanel>
            ))}
          </Tabs>
        </TabPanel>
      </Tabs>
    </Layout>
  )
}

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
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
                width: 600
                breakpoints: [360, 450, 600]
              )
            }
          }
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

/* eslint-disable camelcase */
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
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
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
