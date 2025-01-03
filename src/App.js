import { useState, useEffect, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
// import {TextField, Button} from '@mui/material';

// import listReactFiles from 'list-react-files';
import Dropdown from 'react-dropdown';
import './dropdown.css';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/Entertainment" element={<Entertainment/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

const Landing = () => {
  return (
    <>
      <Nav></Nav>
      <Home></Home>
      <div className='spacer'></div>
      <Menus></Menus>
      <Footer></Footer>
    </>
  )
}


const Food = () => {
  return (
    <>
      <Nav></Nav>
      <Reservations></Reservations>
      <OrderFood></OrderFood>
      <Footer></Footer>
    </>
  )
}

const Entertainment = () => {
  return (
    <>
      <Nav></Nav>
      <div className='entertainment' id="Entertainment"></div>
      <Footer></Footer>
    </>
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
          <p><HashLink to="/Us">About Us</HashLink></p>
          <p><HashLink to="/Food#Reservations">Reservations</HashLink></p>
          <p><HashLink to="/Food#OrderFood">Order Food</HashLink></p>
        </div>
        <HashLink to="/#Home">
            <img alt="Bungalow lakehouse logo" src={require("./assets/logo2.png")}></img>
          </HashLink>
        <div>
        <p><HashLink to="/#Menus">Menus</HashLink></p>
        <p><HashLink to="/Entertainment">Entertainment</HashLink></p>
          <p><a href='http://comedybungalow.netlify.app'>Comedy Bungalow</a></p>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className='home' id="Home">
      <h1>Eat, drink, relax.</h1>
      <div className="bookNow"><HashLink to="/Food#Reservations">BOOK NOW</HashLink></div>
    </div>
  )
}

const AboutUs = () => {
  return (
    <>
      <Nav></Nav>
    <div className='aboutus' id='AboutUs'>
    </div>
      <Footer></Footer>
    </>
  )
}

const Reservations = () => {
  return (
    <div className='reservations' id="Reservations">
      {/* <LargePartyForm></LargePartyForm> */}
      {/* <img className="opentable" src={require("./assets/opentable.png")}></img> */}
    </div>
  )
}

// const LargePartyForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className='largePartyForm'>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>
//         <TextField label="Name" name="name" value={formData.name} onChange={handleChange}  margin="normal"/>

//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Submit
//       </Button>
//     </form>
//   )
// }

const OrderFood = () => {
  return (
    <div className='orderfood' id='OrderFood'></div>
  )
}

const Menus = () => {

  const canvasRef = useRef(null);
  const [clicked, setClicked] = useState(0)
  const menus = importAllMenus(require.context('../public/menus', false, /\.(pdf)$/));
  const [selectedMenu, setSelectedMenu] = useState(menus[0].value)
  var url = './menus/'+selectedMenu+'.pdf'

  function importAllMenus(r) {
    const items = r.keys().map(r);
    return items.map((item) => {
      const firstIndex = item.lastIndexOf("/") + 1
      const secondIndex = item.indexOf(".")
      const starIndex = item.lastIndexOf("*") + 1
      return {"value": item.substring(firstIndex, secondIndex), "label":item.substring(starIndex, secondIndex)}
    })
  }

  const { pdfDocument } = usePdf({
    file: url,
    canvasRef,
  });

  return (
    <div className='menus' id="Menus">
      <h1>Menus</h1>
      <Dropdown className="menuDropdown" options={menus} menuClassName='dropdownMenu'
      onChange={(object)=>{setSelectedMenu(object.value)}} value={selectedMenu}/>
      <div className='pdfContainer'>
        {Boolean(pdfDocument && pdfDocument.numPages) && Array.from({ length: pdfDocument.numPages }).map((_, index) => {
            return <PDFViewer fileName={url} page={index+1} clicked={clicked} setClicked={setClicked}/>
          })
        }
      </div>
    </div>
  )
}

const PDFViewer = ({page, fileName, clicked, setClicked}) => {
  const canvasRef = useRef(null);
  // const [wide, setWide] = useState("")

  usePdf({
    file: fileName,
    page,
    canvasRef,
  });

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const width = canvas.width;
  //     const height = canvas.height;
  //     setWide((height < width) ? "wideMenu" : "pdf")

  //     console.log('filename:', fileName + " "+page);
  //     console.log('Canvas width:', width);
  //     console.log('Canvas height:', height);
  //   }
  // }, [canvasRef.current]);

  var cls = (clicked == page) ? "bigCanvas" : ""

  return (
    <canvas onClick={()=>{(clicked == page)? setClicked(0) : setClicked(page)}} className={" pdf " + cls} ref={canvasRef} />
  )
}



const Footer = () => {
  return (
    <div>
    <div className='footer'>
        <div className='footercol'>
          <h1>Navigation</h1>
          <p><HashLink to="/#Home">Home</HashLink></p>
          <p><HashLink to="/Us">About Us</HashLink></p>
          <p><HashLink to="/Food#Reservations">Reservations</HashLink></p>
          <p><HashLink to="/Food#OrderFood">Order Food</HashLink></p>
          <p><HashLink to="/#Menus">Menus</HashLink></p>
          <p><HashLink to="/Entertainment">Entertainment</HashLink></p>
          <p><a href='http://comedybungalow.netlify.app'>Comedy Bungalow</a></p>
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
          <a target="_blank" href="https://www.instagram.com/bungalowlakehouse/?hl=en"><img alt="instagram" src={require("./assets/instagram.png")}></img></a>
          <a target="_blank" href="https://twitter.com/TheLakehouseCAS"><img alt="twitter" src={require("./assets/twitter.png")}></img></a>
        </div>
    </div>
    <div className='createdby'>
      {/* Website by <a href="onebytewonders.github.io">OneByteWonders</a> */}
      </div>
    </div>
  )
}


export default App;
