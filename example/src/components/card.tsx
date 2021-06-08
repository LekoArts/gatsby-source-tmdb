import * as React from "react"
import { useSpring, animated } from "react-spring"
import { Link } from "gatsby"
import { IGatsbyImageData, getImage, GatsbyImage, ImageDataLike } from "gatsby-plugin-image"
import { format, parseISO } from "date-fns"
import { Icon } from "./icon"
import {
  wrapperStyle,
  linkStyle,
  imageStyle,
  contentStyle,
  titleStyle,
  itemStyle,
  itemIconStyle,
  itemTextStyle,
} from "./card.css"

type CardProps = {
  name: string
  link: string
  cover:
    | string
    | {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
  next?: string
  rating: number
  status?: "Returning Series" | "Ended" | "Canceled"
  release: string
  episodes?: number
  seasons?: number
}

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Card: React.FC<CardProps> = ({ name, link, cover, next, rating, status, release, episodes, seasons }) => {
  const ref = React.useRef()
  const [animatedProps, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 400, friction: 30, precision: 0.00001 },
  }))
  const isGatsbyImage = typeof cover !== `string`

  return (
    <animated.div
      className={wrapperStyle}
      data-item="card"
      ref={ref}
      onMouseMove={({ clientX, clientY }) => {
        const x =
          // @ts-ignore
          clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft))
        // @ts-ignore
        const y = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop))
        const dampen = 80 // Higher number => less rotation
        const xys = [
          // @ts-ignore
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          // @ts-ignore
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.05, // Scale
        ]
        api.start({ xys })
      }}
      onMouseLeave={() => {
        api.start({ xys: [0, 0, 1] })
      }}
      style={{ transform: animatedProps.xys.to(trans) }}
    >
      <Link to={link} className={linkStyle}>
        <div className={contentStyle}>
          <h2 className={titleStyle}>
            {name}
            {` `}
            {status &&
              (status === `Returning Series` ? (
                <Icon style={{ verticalAlign: `super` }} name="running" />
              ) : (
                <Icon style={{ verticalAlign: `super` }} name="ended" />
              ))}
          </h2>
          <div style={{ display: `flex` }}>
            <div className={itemStyle}>
              <Icon className={itemIconStyle} name="star" /> <div className={itemTextStyle}>{rating}</div>
            </div>
            <div className={itemStyle}>
              <Icon className={itemIconStyle} name="first" />
              {` `}
              <div className={itemTextStyle}>{format(parseISO(release), `yyyy`)}</div>
            </div>
            {next && (
              <div className={itemStyle}>
                <Icon className={itemIconStyle} name="next" />
                {` `}
                <div className={itemTextStyle}>{format(parseISO(next), `dd.MM.yy`)}</div>
              </div>
            )}
            {episodes && (
              <div className={itemStyle}>
                <Icon className={itemIconStyle} name="episodes" /> <div className={itemTextStyle}>{episodes}</div>
              </div>
            )}
            {seasons && (
              <div className={itemStyle}>
                <Icon className={itemIconStyle} name="seasons" /> <div className={itemTextStyle}>{seasons}</div>
              </div>
            )}
          </div>
        </div>
        {isGatsbyImage ? (
          <GatsbyImage alt="" image={getImage(cover as ImageDataLike)} />
        ) : (
          <img alt="" loading="lazy" src={cover as string} className={imageStyle} />
        )}
      </Link>
    </animated.div>
  )
}

export default Card
