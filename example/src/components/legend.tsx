import * as React from "react"
import { Icon } from "./icon"
import * as styles from "./legend.css"

const Legend: React.FC = () => (
  <div className={styles.legendStyle}>
    <div className={styles.titleStyle}>Legend</div>
    <div className={styles.wrapperStyle}>
      <div className={styles.legendItemStyle}>
        <Icon name="star" className={`${styles.greyLightFillStyle} ${styles.legendIconStyle}`} /> Rating
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="first" className={`${styles.greyLightFillStyle} ${styles.legendIconStyle}`} /> Release
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="next" className={`${styles.greyLightFillStyle} ${styles.legendIconStyle}`} /> Next Episode
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="episodes" className={`${styles.greyLightFillStyle} ${styles.legendIconStyle}`} /> Episodes
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="seasons" className={`${styles.greyLightFillStyle} ${styles.legendIconStyle}`} /> Seasons
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="running" className={styles.legendIconStyle} /> Returning Series
      </div>
      <div className={styles.legendItemStyle}>
        <Icon name="ended" className={styles.legendIconStyle} /> Ended
      </div>
    </div>
  </div>
)

export default Legend
