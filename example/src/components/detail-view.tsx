import * as React from "react"
import { useQuery } from "react-query"
import ContentLoader from "react-content-loader"
import { format, parseISO } from "date-fns"
import { fetchTmdb } from "../utils/fetch-tmdb"
import { Icon } from "./icon"
import * as styles from "./detail-view.css"

const IMAGE_URL = `https://image.tmdb.org/t/p/`

const convertMinsToHrsMins = (mins: number) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60

  if (m === 0) {
    return `${h} Hours`
  }

  return `${h} Hours ${m} Minutes`
}

const calculateTime = ({ episodes, runTime }: { episodes: number; runTime: number | number[] }) => {
  let time
  if (Array.isArray(runTime)) {
    // eslint-disable-next-line prefer-destructuring
    time = runTime[0]
  } else {
    time = runTime
  }
  return convertMinsToHrsMins(episodes * time)
}

const DetailView: React.FC<{ id: string; type: "tv" | "movie" }> = function ({ id, type }) {
  const { status, data, error } = useQuery([`${type}-detail`, id], async () => fetchTmdb({ id, type }))

  if (status === `loading`) {
    return (
      <div className={styles.detailViewWrapperStyle}>
        <ContentLoader
          viewBox="0 0 590 700"
          style={{ width: `100%` }}
          speed={3}
          backgroundColor="#9faeac"
          foregroundColor="#dfe8e7"
        >
          <rect x="0" y="0" rx="0" ry="0" width="276" height="421" />
          <rect x="0" y="460" rx="0" ry="0" width="116" height="116" />
          <rect x="125" y="460" rx="0" ry="0" width="116" height="116" />
          <rect x="250" y="460" rx="0" ry="0" width="116" height="116" />
          <rect x="375" y="460" rx="0" ry="0" width="116" height="116" />
          <rect x="500" y="460" rx="0" ry="0" width="116" height="116" />
          <rect x="310" y="0" rx="0" ry="0" width="358" height="43" />
          <circle cx="335" cy="90" r="25" />
          <circle cx="410" cy="90" r="25" />
          <rect x="310" y="142.67" rx="0" ry="0" width="180" height="12" />
          <rect x="310" y="167.67" rx="0" ry="0" width="240" height="16" />
          <rect x="310" y="198.67" rx="0" ry="0" width="160" height="16" />
          <rect x="310" y="256.67" rx="0" ry="0" width="185" height="26" />
          <rect x="310" y="299.67" rx="0" ry="0" width="340" height="11" />
          <rect x="310" y="320.67" rx="0" ry="0" width="340" height="11" />
          <rect x="310" y="340.67" rx="0" ry="0" width="340" height="11" />
        </ContentLoader>
      </div>
    )
  }

  if (status === `error` && error instanceof Error) {
    return <div className={styles.detailViewWrapperStyle}>Error: {error.message}</div>
  }

  return (
    <div className={styles.detailViewWrapperStyle}>
      <section className={styles.informationStyle}>
        <div className={styles.posterWrapperStyle}>
          <img alt="" className={styles.posterImageStyle} src={`${IMAGE_URL}w500${data.poster_path}`} />
        </div>
        <div data-item="detail-view-details" className={styles.mainWrapper}>
          <h1 className={styles.h1Style}>
            {data.title || data.name} ({format(parseISO(data.release_date || data.first_air_date), `yyyy`)})
          </h1>
          {(data.title !== data.original_title || data.name !== data.original_name) && (
            <div className={styles.originalNameStyle}>Original: {data.original_title || data.original_name}</div>
          )}
          <div className={`statistics-01 ${styles.statistics1Style}`}>
            <Icon name="star" className={styles.primaryFillStyle} /> {data.vote_average}
            {data.status &&
              type === `tv` &&
              (data.status === `Returning Series` ? (
                <span style={{ marginLeft: `2rem` }}>
                  <Icon name="running" /> {data.status}
                </span>
              ) : (
                <span style={{ marginLeft: `2rem` }}>
                  <Icon name="ended" /> {data.status}
                </span>
              ))}
          </div>
          <div className={`statistics-02 ${styles.statistics2Style}`}>
            {data.number_of_episodes && (
              <div>
                <Icon name="episodes" /> {data.number_of_episodes}
              </div>
            )}
            {data.number_of_seasons && (
              <div>
                <Icon name="seasons" /> {data.number_of_seasons}
              </div>
            )}
            {data.next_episode_to_air && (
              <div>
                <Icon name="next" className={styles.whiteFillStyle} />
                {` `}
                {format(parseISO(data.next_episode_to_air.air_date), `dd.MM.yy`)}
              </div>
            )}
          </div>
          {data.runtime && <div>Runtime: {data.runtime} Minutes</div>}
          {data.episode_run_time && (
            <div className={styles.totalRuntimeStyle}>
              Total Runtime:{` `}
              {calculateTime({
                episodes: data.number_of_episodes,
                runTime: data.episode_run_time,
              })}
            </div>
          )}
          <div className={styles.genresStyle}>
            {data.genres.map((genre) => (
              <div className={styles.genreStyle} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          <div className={styles.overviewStyle}>
            <h2 className={styles.h2Style}>Overview</h2>
            <p className={styles.paragraphStyle}>{data.overview}</p>
          </div>
        </div>
      </section>
      <section className={styles.secondaryInformationStyle}>
        {data.credits.cast.length > 0 && (
          <>
            <h2>Top Billed Cast</h2>
            <div className={styles.castOverviewStyle}>
              {data.credits.cast.slice(0, 12).map((member) => (
                <div className={styles.castStyle} key={member.name}>
                  <div className={styles.castImageWrapperStyle}>
                    <img alt="" className={styles.castImageStyle} src={`${IMAGE_URL}w185${member.profile_path}`} />
                  </div>
                  <div className={styles.castNamesStyle}>
                    <span className={styles.castNamesDetailStyle}>{member.name}</span>
                    <span>{member.character}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {data.videos.results.length > 0 && (
          <>
            <h2>Trailer</h2>
            <div className={styles.trailerStyle}>
              <iframe
                className={styles.iframeStyle}
                width="560"
                title="Trailer"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${data.videos.results[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </>
        )}
        <h2>Similar {type === `tv` ? `Shows` : `Movies`}</h2>
        <div className={styles.similarStyle}>
          {data.similar.results.slice(0, 10).map((item) => (
            <a key={item.id} className={styles.similarLinkStyle} href={`/${type}/${item.id}`}>
              {item.name || item.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DetailView
