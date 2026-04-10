import "./HomeScreen.css"

interface HomeScreenProps {
  text: string,
}

export function HomeScreen({ text }: HomeScreenProps) {

  return (
    <div className="screen-base home-screen">
      {text}
    </div>
  )
}