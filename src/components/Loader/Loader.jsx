import css from './Loader.module.css'
import { ThreeDots } from 'react-loader-spinner'

const Loader = ({ type }) => {
  return (
    <div className={type === 'page loader' ? css.loader : ''}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#e44848"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
