import s from './HomePage.module.css'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const HomePage = () => {
  return (
    <>
      <section className={s.hero}>
        <div className="container">
          <h1 className={s.title}>Campers of your dreams</h1>
          <h2 className={s.text}>
            You can find everything you want in our catalog
          </h2>
          <Link to="/catalog">
            <Button text="View Now" className={s.button} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
