import React from 'react'
import Navbar from '../../components/Navbar'
import Table from './components/Table'

const ProjectsPage = () => {
  return (
    <div>
      <Navbar/>
      <div style={{padding:20}}>
        <Table/>
      </div>
      
    </div>
  )
}

export default ProjectsPage