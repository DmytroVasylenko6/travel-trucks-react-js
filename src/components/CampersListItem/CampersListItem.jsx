import { selectFavorite } from '../../redux/campers/selectors.js'
import Icon from '../Icon/Icon.jsx'
import s from './CampersListItem.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../redux/campers/slice.js'
import Button from '../Button'
const CampersListItem = ({
  id,
  name,
  price,
  rating,
  location,
  description,
  reviews,
  gallery,
  AC,
  bathroom,
  kitchen,
  TV,
  radio,
  refrigerator,
  microwave,
  gas,
  water,
  engine,
  transmission
}) => {
  const dispatch = useDispatch()
  const favoriteCampers = useSelector(selectFavorite)

  const handleClick = () => {
    dispatch(toggleFavorite(id))
  }

  const isFavorite = favoriteCampers.includes(id)

  return (
    <li className={s.item}>
      <img className={s.image} src={gallery[0].thumb} />
      <div className={s.info_container}>
        <div className={s.thumb}>
          <div className={s.thumb_1}>
            <h2 className={s.name}>{name}</h2>
            <span>
              {' '}
              <p className={s.price}>
                &#x20AC;{price ? Number(price).toFixed(2) : '0.00'}
              </p>
              <Icon
                id={'icon-heart'}
                size="24px"
                className={isFavorite ? s.heartIconFilled : s.heart_icon}
                onClick={handleClick}
              />
            </span>
          </div>

          <div className={s.thumb_2}>
            <Icon
              id="icon-star"
              className={s.rating_icon}
              stroke="none"
              fill="#FFC531"
              size="16px"
            />
            <div className={s.underline}>
              <p className={s.rating}>
                {rating}({reviews.length} Reviews)
              </p>
            </div>
            <div className={s.location_box}>
              {' '}
              <Icon
                className={s.rating_icon}
                id="icon-map"
                stroke="none"
                fill="inherit"
                size="16px"
              />
              <p className={s.location}>{location}</p>
            </div>
          </div>
        </div>

        <div className={s.thumb_3}>
          <p className={s.description}>{description}</p>
        </div>

        <div className={s.thumb_4}>
          {transmission === 'automatic' && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-diagram" size="20px" />
              <p className={s.option}>{transmission}</p>
            </div>
          )}
          <div className={s.box}>
            <Icon className={s.icon} id="icon-petrol" size="20px" />
            <p className={s.option}>{engine}</p>
          </div>
          {AC && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-wind" size="20px" />
              <p className={s.option}>AC</p>
            </div>
          )}
          {bathroom && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-shower" size="20px" />
              <p className={s.option}>Bathroom</p>
            </div>
          )}
          {kitchen && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-cup" size="20px" />
              <p className={s.option}>Kitchen</p>
            </div>
          )}
          {TV && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-tv" size="20px" />
              <p className={s.option}>TV</p>
            </div>
          )}
          {radio && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-radio" size="20px" />
              <p className={s.option}>Radio</p>
            </div>
          )}
          {refrigerator && (
            <div className={s.box}>
              <Icon className={s.icon} id="icon-refrigerator" size="20px" />
              <p className={s.option}>Refrigerator</p>
            </div>
          )}
          {microwave && (
            <div className={s.box}>
              <Icon
                className={s.icon}
                id="icon-microwave"
                size="20px"
                fill="none"
                stroke="#101828"
              />
              <p className={s.option}>Microwave</p>
            </div>
          )}
          {gas && (
            <div className={s.box}>
              <Icon
                className={s.icon}
                id="icon-gas"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={s.option}>Gas</p>
            </div>
          )}
          {water && (
            <div className={s.box}>
              <Icon
                className={s.icon}
                id="icon-water"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={s.option}>Water</p>
            </div>
          )}
        </div>
        <Link
          to={`/catalog/${id}/features`}
          target="_blank"
          rel="noopener noreferrer"
          replace
        >
          <Button text="Show more" className={s.button} />
        </Link>
      </div>
    </li>
  )
}

export default CampersListItem
