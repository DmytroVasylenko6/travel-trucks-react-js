import { useDispatch, useSelector } from 'react-redux'
import {
  selectCampers,
  selectIsLoading,
  selectPage,
  selectTotalCampers
} from '../../redux/campers/selectors.js'
import CampersListItem from '../CampersListItem/CampersListItem.jsx'
import s from './CampersList.module.css'
import { getCampers } from '../../redux/campers/operations.js'
import { setPage } from '../../redux/campers/slice.js'
import { useEffect } from 'react'
import Loader from '../Loader/Loader.jsx'
import Button from '../Button'

const CampersList = () => {
  const dispatch = useDispatch()
  const campers = useSelector(selectCampers)
  const totalCampers = useSelector(selectTotalCampers)
  const isLoading = useSelector(selectIsLoading)

  const page = useSelector(selectPage)
  const limit = 4
  const totalPages = Math.ceil(totalCampers / limit)
  const buttonIsActive = page < totalPages

  const filters = useSelector((state) => state.campers.filters)

  useEffect(() => {
    dispatch(getCampers({ page, limit, filterParams: filters }))
  }, [dispatch, page, filters])

  const loadMore = () => {
    if (buttonIsActive) {
      dispatch(setPage(page + 1))
    }
  }

  return (
    <>
      {isLoading && !campers.length ? (
        <div className={s.container}>
          <Loader />
        </div>
      ) : campers.length > 0 ? (
        <div className={s.container}>
          <ul className={s.campers_list}>
            {campers.map((camper) => (
              <CampersListItem key={camper.id} {...camper} />
            ))}
          </ul>
          {isLoading && <Loader />}

          {buttonIsActive && (
            <Button
              className={isLoading ? s.load_more_loading : s.load_more}
              text={isLoading ? 'Loading...' : 'Load more'}
              onClick={loadMore}
            />
          )}
        </div>
      ) : (
        <div className={s.container}>
          <p className={s.no_found}>No campers found</p>
        </div>
      )}
    </>
  )
}

export default CampersList
