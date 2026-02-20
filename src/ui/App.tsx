import './App.css'
import { ViewSelector } from './ViewSelector'
import { ScreenContainer } from './ScreenContainer'
import { AppFooter } from './AppFooter';
import { Tab, tabManager } from '../managers/TabManager';
import { useEffect, useState } from 'react';
import { globalSettings } from '../settings';
import { AppHeader } from './AppHeader';

function App() {

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleTabsChange = () => setTabs(tabManager.getTabs());

    setTabs(tabManager.getTabs());
    tabManager.on("tabsChange", handleTabsChange);

    globalSettings.onChange("darkMode", (value) => {
      setDarkMode(value);
    });

    return () => {
      tabManager.off("tabsChange", handleTabsChange);
      globalSettings.offChange("darkMode", (value) => {
        setDarkMode(value);
      });
    };
  }, []);

  return (
    <div id='app' className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <AppHeader />
      <ViewSelector />
      <ScreenContainer tabs={tabs} />
      <AppFooter />
    </div>
  )
}

export default App
