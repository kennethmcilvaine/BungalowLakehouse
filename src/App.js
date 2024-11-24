import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <>
      <Nav></Nav>
      <HomePage></HomePage>
      <ReservationPage></ReservationPage>
      {/* add footer with address, links, social media, me */}
      </>
  );
}

const ReservationPage = () => {
  return (
    <div className='reservations' id="reservations">
    </div>
  )
}

const Nav = () => {
  const [navSize, setNavSize] = useState("")
  useEffect(()=> {
      const handleScroll = () => {
         let p = window.scrollY
          setNavSize((p > 40) ? "wide" : (navSize === "wide" || navSize === "thin") ? "thin" : "")
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
         window.removeEventListener("scroll", handleScroll);
      })
  })

  var cls = navSize
  console.log(navSize)

  return (
    <div className={"navContainer " + cls}>
      <div className="nav">
        <div>
          <a href="#reservations">Reservations</a>
          <a href="">Order Food</a>
          <a href="">Menus</a>
        </div>
          <a href="#home">
            <img alt="Bungalow lakehouse logo" src={require("./assets/oldlogo.png")}></img>
          </a>
        <div>
          <a href="">Live Entertainment</a>
          <a href="">About Us</a>
          <a href="">Comedy Bungalow</a>
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <div className='homepage' id="home">
      <h1>Eat, drink, relax.</h1>
      <div className="bookNow"><a href="#reservations">BOOK NOW</a></div>
    </div>
  )
}

export default App;
