import { useSelector } from 'react-redux'
import { selectCurrentCamper } from '../../redux/campers/selectors.js'
import Details from '../Details/Details.jsx'

const CamperFeatures = () => {
  const camper = useSelector(selectCurrentCamper)
  return <Details camper={camper} />
}

export default CamperFeatures
