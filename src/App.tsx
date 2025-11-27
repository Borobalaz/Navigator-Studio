import './App.css'
import { ViewSelector } from './components/ViewSelector'
import { ScreenContainer } from './screens/ScreenContainer'
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { Tab, tabManager } from './TabManager';
import { useEffect, useState } from 'react';

function App() {

  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const handleTabsChange = () => setTabs(tabManager.getTabs());

    setTabs(tabManager.getTabs());
    tabManager.on("tabsChange", handleTabsChange);

    return () => {
      tabManager.off("tabsChange", handleTabsChange);
    };
  }, []);

  return (
    <div id='app' className='theme-light'>
      <AppHeader />
      <ViewSelector />
      <ScreenContainer tabs={tabs} />
      <AppFooter />
    </div>
  )
}

export default App
