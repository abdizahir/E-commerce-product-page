import Header from "./components/Header"
import Menu from "./components/Menu"
import Products from "./components/Products"
import ImgOverlay from "./components/ImgOverlay"


function App() {

  return (
    <main className="sm:w-[608px] sm:h-[803px] md:w-[1110px] md:h-[744px] sm:m-auto md:my-9">
      <Header />
      <Products />
      <Menu />
      <ImgOverlay />
    </main>
  )
}

export default App
