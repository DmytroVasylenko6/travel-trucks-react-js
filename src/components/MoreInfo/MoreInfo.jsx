import { NavLink, Outlet } from 'react-router-dom'
import css from './MoreInfo.module.css'
import BookForm from '../BookForm/BookForm.jsx'

const MoreInfo = () => {
  return (
    <>
      <div>
        <nav className={css.nav}>
          <NavLink
            to="features"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Features
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Reviews
          </NavLink>
        </nav>
      </div>
      <div className={css.container}>
        <Outlet />
        <BookForm />
      </div>
    </>
  )
}

export default MoreInfo
