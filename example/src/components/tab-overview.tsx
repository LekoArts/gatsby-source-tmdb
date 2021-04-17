import * as React from "react"
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel,
} from "react-tabs"
import { tabsStyle, tabListStyle, tabStyle, tabBigStyle, tabPanelStyle } from "./tab-overview.css"

const Tabs = ({ children, ...rest }) => (
  <UnstyledTabs {...rest} className={tabsStyle}>
    {children}
  </UnstyledTabs>
)
const TabList = ({ children, ...rest }) => (
  <UnstyledTabList {...rest} className={tabListStyle}>
    {children}
  </UnstyledTabList>
)
const Tab = ({ children, ...rest }) => (
  <UnstyledTab selectedClassName="selected" disabledClassName="disabled" {...rest} className={tabStyle}>
    {children}
  </UnstyledTab>
)
const TabBig = ({ children, ...rest }) => (
  <UnstyledTab selectedClassName="selected" disabledClassName="disabled" {...rest} className={tabBigStyle}>
    {children}
  </UnstyledTab>
)
const TabPanel = ({ children, ...rest }) => (
  <UnstyledTabPanel selectedClassName="selected" {...rest} className={tabPanelStyle}>
    {children}
  </UnstyledTabPanel>
)

Tab.tabsRole = `Tab`
TabBig.tabsRole = `Tab`
Tabs.tabsRole = `Tabs`
TabPanel.tabsRole = `TabPanel`
TabList.tabsRole = `TabList`

export { Tabs, TabList, Tab, TabBig, TabPanel }
