import { NavLink } from 'react-router-dom'
import logo from '../assets/arkcitylogo.png'
import { FlatButton } from './FlatButton'
function Navbar() {

  return (
  <>
  <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">
      <img src={logo} alt='logo'/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/arkcitygas">Home</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/#about">About us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/#service">Services</a>
        </li>
        

        <li className="nav-item">
          <a href='https://wa.link/6hbzdj' target='_blank'><FlatButton  onClick={()=>{}} title='Contact Us' className='btndark'/></a>
        </li>

        
       

      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar