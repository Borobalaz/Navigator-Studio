import './App.css'
import { ViewSelector } from './components/ViewSelector'
import { ScreenContainer, Tab } from './screens/ScreenContainer'
import { HomeScreen } from './screens/HomeScreen';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

function App() {

  const tabs: Tab[] = [
    {
      label: "Home",
      component: HomeScreen,
      props: {text: "1111111111"},
    },
    {
      label: "ASD",
      component: HomeScreen,
      props: {text: "222222222222"},
    },
    {
      label: "ASD3",
      component: HomeScreen,
      props: {text: "444444444444"},
    },
  ];

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
