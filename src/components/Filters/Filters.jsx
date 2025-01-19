import s from './Filters.module.css'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../redux/campers/operations.js'
import { clearCampers, resetPage } from '../../redux/campers/slice.js'
import Icon from '../Icon/Icon.jsx'
import Button from '../Button'
import Select from 'react-select'
import { components } from 'react-select'
import { selectUniqueLocations } from '../../redux/campers/selectors.js'

const CustomPlaceholder = (props) => {
  return (
    <components.Placeholder {...props}>
      <span style={{ color: '#aaa', fontSize: '14px' }}>{props.children}</span>
    </components.Placeholder>
  )
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    paddingLeft: '40px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#333',
    boxSizing: 'border-box',
    cursor: 'pointer'
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '14px',
    cursor: 'pointer'
  })
}

const filterOptions = [
  {
    id: 'AC',
    label: 'AC',
    icon: <Icon className={s.icon} id="icon-wind" size="32px" />
  },
  {
    id: 'transmission',
    label: 'Automatic',
    value: 'automatic',
    icon: <Icon className={s.icon} id="icon-diagram" size="32px" />
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <Icon className={s.icon} id="icon-cup" size="32px" />
  },
  {
    id: 'TV',
    label: 'TV',
    icon: <Icon className={s.icon} id="icon-tv" size="32px" />
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Icon className={s.icon} id="icon-shower" size="32px" />
  }
]

const form = [
  {
    id: 'panelTruck',
    label: 'Van',
    icon: <Icon className={s.icon} id="icon-bi_grid_1x2" size="32px" />
  },
  {
    id: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: <Icon className={s.icon} id="icon-bi_grid" size="32px" />
  },
  {
    id: 'alcove',
    label: 'Alcove',
    icon: <Icon className={s.icon} id="icon-bi_grid_3x3" size="32px" />
  }
]

const checkbox = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon

  return (
    <div
      className={`${s.checkboxButton} ${
        field.value.includes(id) ? s.active : ''
      }`}
      onClick={() => {
        const newValue = field.value.includes(id)
          ? field.value.filter((f) => f !== id)
          : [...field.value, id]
        field.onChange({ target: { name: field.name, value: newValue } })
      }}
    >
      {IconComponent}
      <span className={s.checkboxLabel}>{label}</span>
    </div>
  )
}

const radio = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon

  return (
    <div
      className={`${s.radioButton} ${field.value === id ? s.active : ''}`}
      onClick={() => {
        field.onChange({ target: { name: field.name, value: id } })
      }}
    >
      {IconComponent}
      <span className={s.radioLabel}>{label}</span>
    </div>
  )
}

const Filters = () => {
  const dispatch = useDispatch()

  const locations = useSelector(selectUniqueLocations)
  const locationOptions = locations.map((location) => {
    const [country, city] = location.split(', ')
    return {
      value: `${country}, ${city}`,
      label: `${country}, ${city}`
    }
  })

  const handleApplyFilters = (values) => {
    const filters = {}
    if (values.location && values.location !== '') {
      filters['location'] = values.location.value
    }
    if (values.form) filters['form'] = values.form

    values.filters.forEach((filter) => {
      if (filter === 'AC') filters['AC'] = true
      if (filter === 'transmission') filters['transmission'] = 'automatic'
      if (filter === 'kitchen') filters['kitchen'] = true
      if (filter === 'TV') filters['TV'] = true
      if (filter === 'bathroom') filters['bathroom'] = true
    })

    dispatch(clearCampers())
    dispatch(setFilters(filters))
  }

  return (
    <Formik
      initialValues={{
        filters: [],
        form: null,
        location: null
      }}
      onSubmit={handleApplyFilters}
    >
      {({ handleSubmit, handleReset, values, setFieldValue }) => (
        <Form
          className={s.form_container}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className={s.location_container}>
            <h3 className={s.title_location}>Location</h3>
            <div className={s.input_container}>
              <Icon id="icon-map" className={s.icon_map} size="20px" />
              <div className={s.input}>
                <Select
                  name="location"
                  options={locationOptions}
                  className={s.select}
                  classNamePrefix="select"
                  styles={customStyles}
                  placeholder="Select location"
                  components={{ Placeholder: CustomPlaceholder }}
                  value={values.location}
                  onChange={(option) => setFieldValue('location', option)}
                  isClearable
                />
              </div>
            </div>
          </div>

          <h3 className={s.filters_title}>Filters</h3>
          <h3 className={s.title}>Vehicle Equipment</h3>
          <div className={s.container}>
            {filterOptions.map((option) => (
              <Field
                key={option.id}
                name="filters"
                icon={option}
                component={checkbox}
              />
            ))}
          </div>

          <h3 className={s.title}>Vehicle Type</h3>
          <div className={s.container}>
            {form.map((type) => (
              <Field key={type.id} name="form" icon={type} component={radio} />
            ))}
          </div>
          <div className={s.btn_box}>
            <Button type="submit" text="Search" className={s.submit_button} />
            <Button
              onClick={() => {
                dispatch(resetPage())
              }}
              type="reset"
              text="Reset"
              className={s.reset_button}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Filters
