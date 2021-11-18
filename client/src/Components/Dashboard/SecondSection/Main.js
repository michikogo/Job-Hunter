import React, { useState } from 'react'
import { inbox } from '../../../Assets'
import FilterButton from './FilterButton'
import Pagination from './Pagination'
import Table from './Table'

const Main = ({ showModal, userData, loading }) => {
  const initialSearch = {
    searchCompanyName: '',
    searchRole: '',
    searchLocation: '',
    searchDateApplied: '',
    searchLinkedAccounts: '',
    searchStatus: ''
  }
  const [search, setSearch] = useState(initialSearch)
  const [currentID, setCurrentID] = useState('')
  const initialFilter = {
    showSearch: false,
    showSort: false
  }
  const [filter, setFilter] = useState(initialFilter)
  const initialSort = {
    sortCompanyName: '',
    sortRole: '',
    sortLocation: '',
    sortDateApplied: '',
    sortLinkedAccounts: '',
    sortStatus: ''
  }
  const [sortCol, setSortCol] = useState(initialSort)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }
  // Clear data when hiding sort
  const handleHideSort = () => {
    setSortCol({ ...initialSort })
    setFilter(prev => ({ ...prev, showSort: false }))
  }
  // Clear data when hiding search
  const handleHideSearch = () => {
    setSearch({ ...initialSearch })
    setFilter(prev => ({ ...prev, showSearch: false }))
  }

  return (
    <div
      class={
        showModal ? 'section2-background modal-grey' : 'section2-background'
      }
    >
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        handleHideSort={handleHideSort}
        handleHideSearch={handleHideSearch}
      />
      {!loading ? (
        <div className='loading-container'>
          <img src={inbox} alt='' width='100' />
          <br />
          <h3>Fetching Data</h3>
        </div>
      ) : userData.length ? (
        <>
          <Table
            userData={currentPosts}
            currentID={currentID}
            setCurrentID={setCurrentID}
            search={search}
            setSearch={setSearch}
            filter={filter}
            sortCol={sortCol}
            setSortCol={setSortCol}
          />
          <Pagination
            showModal={showModal}
            currentID={currentID}
            postsPerPage={postsPerPage}
            totalPosts={userData.length}
            paginate={paginate}
          />
        </>
      ) : (
        <div className='loading-container'>
          <img src={inbox} alt='' width='100' />
          <br />
          <small>Start Applying</small>
        </div>
      )}
    </div>
  )
}

export default Main
