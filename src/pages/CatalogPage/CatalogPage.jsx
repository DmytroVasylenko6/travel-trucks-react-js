import { useEffect } from 'react'
import CampersList from '../../components/CampersList/CampersList.jsx'
import Filters from '../../components/Filters'
import s from './CatalogPage.module.css'
import { useDispatch } from 'react-redux'
import { clearCampers, resetPage } from '../../redux/campers/slice.js'
import { getCampers, getLocations } from '../../redux/campers/operations.js'
import cn from 'classnames'

const CatalogPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetPage())
    dispatch(clearCampers())
    dispatch(getCampers())
    dispatch(getLocations())
  }, [dispatch])

  return (
    <div className={cn(s.container, 'container')}>
      <Filters />
      <CampersList />
    </div>
  )
}

export default CatalogPage
