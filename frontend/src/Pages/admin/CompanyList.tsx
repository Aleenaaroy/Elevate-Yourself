
import TopBar from '../../Components/admin/TopBar'
import CompanyTable from '../../Components/admin/CompanyTable'
import { Helmet } from 'react-helmet-async'

const CompanyList = () => {
  return (
    <>
      <Helmet>
        <title>Recruiter Management - Elevate Admin</title>
      </Helmet>
        <TopBar />
        <CompanyTable />
    </>
  )
}

export default CompanyList