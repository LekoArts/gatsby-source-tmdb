import * as React from "react"
import { Icon } from "./icon"
import {
  legendStyle,
  titleStyle,
  wrapperStyle,
  legendItemStyle,
  greyLightFillStyle,
  legendIconStyle,
} from "./legend.css"

const Legend: React.FC = () => (
  <div className={legendStyle}>
    <div className={titleStyle}>Legend</div>
    <div className={wrapperStyle}>
      <div className={legendItemStyle}>
        <Icon name="star" className={`${greyLightFillStyle} ${legendIconStyle}`} /> Rating
      </div>
      <div className={legendItemStyle}>
        <Icon name="first" className={`${greyLightFillStyle} ${legendIconStyle}`} /> Release
      </div>
      <div className={legendItemStyle}>
        <Icon name="next" className={`${greyLightFillStyle} ${legendIconStyle}`} /> Next Episode
      </div>
      <div className={legendItemStyle}>
        <Icon name="episodes" className={`${greyLightFillStyle} ${legendIconStyle}`} /> Episodes
      </div>
      <div className={legendItemStyle}>
        <Icon name="seasons" className={`${greyLightFillStyle} ${legendIconStyle}`} /> Seasons
      </div>
      <div className={legendItemStyle}>
        <Icon name="running" className={legendIconStyle} /> Returning Series
      </div>
      <div className={legendItemStyle}>
        <Icon name="ended" className={legendIconStyle} /> Ended
      </div>
    </div>
  </div>
)

export default Legend
