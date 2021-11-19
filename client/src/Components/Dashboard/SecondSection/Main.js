import React, { useState } from 'react'
import { inbox } from '../../../Assets'
import FilterButton from './FilterButton'
import Pagination from './Pagination'
import Table from './Table'

const Main = ({ regenerate, setRegenerate, showModal, userData, loading }) => {
  // state for search
  const initialSearch = {
    searchCompanyName: '',
    searchRole: '',
    searchLocation: '',
    searchDateApplied: '',
    searchLinkedAccounts: '',
    searchStatus: ''
  }
  const [search, setSearch] = useState(initialSearch)

  // storing the currentID when user clicks
  const [currentID, setCurrentID] = useState('')

  // to show the filter input field and
  const initialFilter = {
    showSearch: false,
    showSort: false
  }
  const [filter, setFilter] = useState(initialFilter)

  // state for initial sort
  const initialSort = {
    sortCompanyName: '',
    sortRole: '',
    sortLocation: '',
    sortDateApplied: '',
    sortLinkedAccounts: '',
    sortStatus: ''
  }
  const [sortCol, setSortCol] = useState(initialSort)

  // for pagination start from page 1 and up to 10 rows per page
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost)

  // Changing the page
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
  // Clear the updated sort array
  const handleClearSort = () => {
    setSortCol({ ...initialSort })
  }
  return (
    <div
      className={
        showModal ? 'section2-background modal-grey' : 'section2-background'
      }
    >
      <FilterButton
        showModal={showModal}
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
            regenerate={regenerate}
            setRegenerate={setRegenerate}
            showModal={showModal}
            userData={currentPosts}
            currentID={currentID}
            setCurrentID={setCurrentID}
            search={search}
            setSearch={setSearch}
            filter={filter}
            sortCol={sortCol}
            setSortCol={setSortCol}
            handleClearSort={handleClearSort}
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
