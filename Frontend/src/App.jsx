import React from 'react'
import Navbar from './components/Shared/Navbar'
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin_Panel/Companies.jsx'
import CreateCompanies from './components/admin_Panel/CreateCompanies'
import CompanySetUp from './components/admin_Panel/CompanySetUp'
import AdminJobs from './components/admin_Panel/AdminJobs'
import CreateJob from './components/admin_Panel/CreateJob'
import JobApplicants from './components/admin_Panel/JobApplicants'
import ProtectedRoute from './components/admin_Panel/ProtectedRoute'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/jobs' element={<Jobs/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/jobs/description/:id' element={<JobDescription/>}/>
          {/* Admin ki sites */}
          <Route path='/admin/companies' element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
          <Route path='/admin/companies/create' element={<ProtectedRoute><CreateCompanies/></ProtectedRoute>}/>
          <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetUp/></ProtectedRoute>}/>
          <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
          <Route path='/admin/jobs/create' element={<ProtectedRoute><CreateJob/></ProtectedRoute>}/>
          <Route path='/admin/job/:id/applicants' element={<ProtectedRoute><JobApplicants/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
