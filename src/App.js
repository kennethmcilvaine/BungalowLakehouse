import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <>
      <Nav></Nav>
      <Home></Home>
      <AboutUs></AboutUs>
      <Reservations></Reservations>
      <OrderFood></OrderFood>
      <Menus></Menus>
      <Entertainment></Entertainment>
      <Footer></Footer>
      </>
  );
}

const Entertainment = () => {
  return (
    <div className='entertainment' id="entertainment"></div>
  )
}

const Menus = () => {
  return (
    <div className='menus' id='menus'></div>
  )
}

const OrderFood = () => {
  return (
    <div className='orderfood' id='orderfood'></div>
  )
}

const Reservations = () => {
  return (
    <div className='reservations' id="reservations">
    </div>
  )
}

const AboutUs = () => {
  return (
    <div className='aboutus' id='aboutus'></div>
  )
}

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footercol'>
          <h1>Navigation</h1>
          <p><a href="#aboutus">About Us</a></p>
          <p><a href="#reservations">Reservations</a></p>
          <p><a href="#orderfood">Order Food</a></p>
          <p><a href="#menus">Menus</a></p>
          <p><a href="#entertainment">Live Entertainment</a></p>
          <p><a>Comedy Bungalow</a></p>
        </div>
        <div className='footercol location'>
          <h1>Location</h1>
          <a target="_blank" href="http://maps.google.com/?q=The Bungalow Lakehouse 46116 Lake Center Plaza, Sterling, VA 20165">
            <p>The Bungalow Lakehouse</p>
            <p>46116 Lake Center Plaza</p>
            <p>Sterling, VA 20165</p>
          </a>
          <p><a target="_blank" href="tel:703-430-7625">703-430-7625</a></p>
        </div>
        <div className='footercol social'>
          <h1>Social Media</h1>
          <a target="_blank" href="https://www.facebook.com/BungalowLakehouse/?ref=hl"><img alt="facebook" src={require("./assets/facebook.png")}></img></a>
          <a target="_blank" href="https://twitter.com/TheLakehouseCAS"><img alt="instagram" src={require("./assets/instagram.png")}></img></a>
          <a target="_blank" href="https://www.instagram.com/bungalowlakehouse/?hl=en"><img alt="twitter" src={require("./assets/twitter.png")}></img></a>
        </div>
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


  return (
    <div className={"navContainer " + navSize}>
      <div className="nav">
        <div>
        <a href="#aboutus">About Us</a>
          <a href="#reservations">Reservations</a>
          <a href="#orderfood">Order Food</a>
        </div>
          <a href="#home">
            <img alt="Bungalow lakehouse logo" src={require("./assets/oldlogo.png")}></img>
          </a>
        <div>
        <a href="#menus">Menus</a>
          <a href="#entertainment">Live Entertainment</a>
          <a>Comedy Bungalow</a>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className='home' id="home">
      <h1>Eat, drink, relax.</h1>
      <div className="bookNow"><a href="#reservations">BOOK NOW</a></div>
    </div>
  )
}

export default App;
