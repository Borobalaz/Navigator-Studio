import "./HomeScreen.css"
import Logo from '../assets/balazslogo.svg'

export function HomeScreen() {
  return (
    <div className="screen-base home-screen">
      <img src={Logo} alt="" className="home-screen-logo" />
      <h2>Navigator Studio</h2>
      <p>Válassz egy eszközt a bal oldali sávból a kezdéshez.</p>
    </div>
  )
}
