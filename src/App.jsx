import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader/Loader.jsx'

const HomePage = lazy(() => import('./pages/HomePage'))
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const CamperDetailsPage = lazy(() => import('./pages/CamperDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const CamperFeatures = lazy(() => import('./components/CamperFeatures'))
const CamperReviews = lazy(() => import('./components/CamperReviews'))

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader type="page loader" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />}>
              <Route path="features" element={<CamperFeatures />} />
              <Route path="reviews" element={<CamperReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster />
    </>
  )
}

export default App
