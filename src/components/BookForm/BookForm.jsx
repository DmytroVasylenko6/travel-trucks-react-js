import s from './BookForm.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import Button from '../Button'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const BookForm = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.date()
      .required('Booking date is required')
      .min(today, 'Booking date cannot be in the past'),
    comment: Yup.string()
  })

  const handleSubmit = (values, { resetForm }) => {
    toast.success(
      <div>
        Form submitted successfully!
        <br />
        <strong>Name:</strong> {values.name}
        <br />
        <strong>Email:</strong> {values.email}
        <br />
        <strong>Booking date:</strong>{' '}
        {values.bookingDate
          ? values.bookingDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'Not selected'}
        <br />
        <strong>Comment:</strong> {values.comment}
      </div>
    )
    resetForm()
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        bookingDate: null,
        comment: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className={s.form}>
          <div className={s.info}>
            <h3 className={s.title}>Book your campervan now</h3>
            <p className={s.text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className={s.formGroup}>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Name*"
              className={s.input}
            />
            <ErrorMessage name="name" component="div" className={s.error} />
          </div>
          <div className={s.formGroup}>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email*"
              className={s.input}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>
          <div className={s.formGroup}>
            <DatePicker
              id="bookingDate"
              className={s.input}
              placeholderText="Booking date*"
              selected={values.bookingDate}
              onChange={(date) => setFieldValue('bookingDate', date)}
              minDate={today}
              isClearable
              showPlaceholder
            />
            {errors.bookingDate && touched.bookingDate && (
              <div className={s.error}>{errors.bookingDate}</div>
            )}
          </div>
          <div className={s.formGroup}>
            <Field
              id="comment"
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={s.textarea}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </div>
          <Button type="submit" text="Send" className={s.submitButton} />
        </Form>
      )}
    </Formik>
  )
}

export default BookForm
