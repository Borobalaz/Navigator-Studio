import "./HomeScreen.css"

interface HomeScreenProps {
  text: string,
}

export function HomeScreen({ text }: HomeScreenProps) {

  return (
    <div className="home-screen">
      {text}
    </div>
  )
}