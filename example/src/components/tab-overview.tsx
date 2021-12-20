import * as React from "react"
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel,
} from "react-tabs"
import * as styles from "./tab-overview.css"

const Tabs = function ({ children, ...rest }) {
  return (
    <UnstyledTabs {...rest} className={styles.tabsStyle}>
      {children}
    </UnstyledTabs>
  )
}
const TabList = function ({ children, ...rest }) {
  return (
    <UnstyledTabList {...rest} className={styles.tabListStyle}>
      {children}
    </UnstyledTabList>
  )
}
const Tab = function ({ children, ...rest }) {
  return (
    <UnstyledTab selectedClassName="selected" disabledClassName="disabled" {...rest} className={styles.tabStyle}>
      {children}
    </UnstyledTab>
  )
}
const TabBig = function ({ children, ...rest }) {
  return (
    <UnstyledTab selectedClassName="selected" disabledClassName="disabled" {...rest} className={styles.tabBigStyle}>
      {children}
    </UnstyledTab>
  )
}
const TabPanel = function ({ children, isNavigation = false, ...rest }) {
  return (
    <UnstyledTabPanel
      selectedClassName="selected"
      {...rest}
      className={isNavigation ? styles.tabPanelNavigationStyle : styles.tabPanelGridStyle}
    >
      {children}
    </UnstyledTabPanel>
  )
}

Tab.tabsRole = `Tab`
TabBig.tabsRole = `Tab`
Tabs.tabsRole = `Tabs`
TabPanel.tabsRole = `TabPanel`
TabList.tabsRole = `TabList`

export { Tabs, TabList, Tab, TabBig, TabPanel }
