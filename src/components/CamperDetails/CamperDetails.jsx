import { useState } from 'react'
import { useSelector } from 'react-redux'
import MoreInfo from '../MoreInfo/MoreInfo.jsx'
import s from './CamperDetails.module.css'
import { selectCurrentCamper } from '../../redux/campers/selectors.js'
import Icon from '../Icon/Icon.jsx'
import Loader from '../Loader/Loader.jsx'
import cn from 'classnames'
const CamperDetails = () => {
  const camper = useSelector(selectCurrentCamper)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState('')

  if (!camper) {
    return <Loader />
  }

  const { name, location, rating, price, reviews, gallery, description } =
    camper

  const openModal = (image) => {
    setModalImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalImage('')
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal()
  }

  return (
    <div
      className={cn(s.container, 'container')}
      onKeyDown={isModalOpen ? handleKeyDown : null}
      tabIndex={-1}
    >
      <div className={s.info_box}>
        <h2 className={s.name}>{name}</h2>
        <div className={s.thumb_2}>
          <Icon
            id="icon-star"
            className={s.rating_icon}
            stroke="none"
            fill="#FFC531"
            size="16px"
          />
          <p className={s.rating}>
            {rating} ({reviews.length} Reviews)
          </p>
          <Icon
            className={s.rating_icon}
            id="icon-map"
            stroke="none"
            fill="inherit"
            size="16px"
          />
          <p className={s.location}>{location}</p>
        </div>
        <span>
          <p className={s.price}>
            &#x20AC;{price ? Number(price).toFixed(2) : '0.00'}
          </p>
        </span>
      </div>
      <div className={s.gallery_box}>
        <ul className={s.gallery}>
          {gallery.map((img, index) => (
            <li
              className={s.item}
              key={index}
              onClick={() => openModal(img.original)}
            >
              <img
                className={s.image}
                width="292px"
                height="312px"
                src={img.thumb}
                alt={`${name} - ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <p className={s.description}>{description}</p>

      <MoreInfo />

      {isModalOpen && (
        <div className={s.backdrop} onClick={handleBackdropClick}>
          <div className={s.modal}>
            <button className={s.closeButton} onClick={closeModal}>
              &times;
            </button>
            <img
              src={modalImage}
              alt="Enlarged View"
              className={s.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CamperDetails
