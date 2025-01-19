import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CamperDetails from '../../components/CamperDetails/CamperDetails.jsx'
import { getCamperById } from '../../redux/campers/operations.js'

const CamperDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { error, currentCamper } = useSelector((state) => state.campers)

  useEffect(() => {
    if (id) {
      dispatch(getCamperById(id))
    }
  }, [dispatch, id])

  return (
    <>
      {error && <p>Error: {error}</p>}
      {currentCamper && <CamperDetails />}
    </>
  )
}

export default CamperDetailsPage
