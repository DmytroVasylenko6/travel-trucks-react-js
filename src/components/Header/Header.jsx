import { NavLink, Link } from 'react-router-dom'
import cn from 'classnames'

import s from './Header.module.css'
import logo from '../../img/logo.svg'
const Header = () => {
  return (
    <>
      <header className={s.header}>
        <div className={cn(s.container, 'container')}>
          <Link to="/">
            <img src={logo} alt="Logo" className={s.logo} />
          </Link>
          <nav className={s.nav}>
            <NavLink
              className={({ isActive }) => (isActive ? s.active : s.link)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? s.active : s.link)}
              to="/catalog"
            >
              Catalog
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
