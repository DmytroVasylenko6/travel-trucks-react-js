import { selectCurrentCamper } from '../../redux/campers/selectors.js'
import Icon from '../Icon/Icon.jsx'
import s from './CamperReviews.module.css'
import { useSelector } from 'react-redux'

const CamperReviews = () => {
  const camper = useSelector(selectCurrentCamper)
  const reviews = camper?.reviews || []

  const renderStars = (rating, reviewId) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Icon
            key={`${reviewId}-${i}`}
            id="icon-star"
            size="16px"
            className={s.yellow_star}
          />
        ) : (
          <Icon
            key={`${reviewId}-${i}`}
            id="icon-star"
            size="16px"
            className={s.gray_star}
          />
        )
      )
    }
    return stars
  }

  return (
    <div className={s.container}>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review, index) => (
            <li key={index} className={s.item}>
              <div className={s.title_container}>
                <div className={s.logo_container}>
                  <div className={s.logo}>
                    <span className={s.letter}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className={s.rating}>
                  <h4 className={s.name}>{review.reviewer_name}</h4>
                  <div className={s.stars}>
                    {renderStars(review.reviewer_rating, index)}
                  </div>
                </div>
              </div>
              <p className={s.text}>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.no_reviews}>No reviews available</p>
      )}
    </div>
  )
}

export default CamperReviews
