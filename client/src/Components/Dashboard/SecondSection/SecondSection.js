import React, { useState } from 'react'
import { inbox } from '../../../Assets'
import Pagination from './Pagination'
import Search from './Search'
import Table from './Table'

const SecondSection = ({ showModal, userData }) => {
  const initialSearch = {
    searchCompanyName: '',
    searchRole: '',
    searchLocation: ''
  }
  const [search, setSearch] = useState(initialSearch)
  const [currentID, setCurrentID] = useState('')
  const initialFilter = {
    showSearch: false,
    showSort: false
  }
  const [filter, setFilter] = useState(initialFilter)

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

  return (
    <div
      class={
        showModal ? 'dashboard-background modal-grey' : 'dashboard-background'
      }
    >
      {/* <Search search={search} setSearch={setSearch} /> */}
      <div style={{ textAlign: 'right', paddingRight: '4rem' }}>
        {filter.showSort === false ? (
          <button
            type='submit'
            className='custom-button'
            style={{ marginRight: '2rem' }}
            onClick={() => setFilter(prev => ({ ...prev, showSort: true }))}
          >
            Show Sort
          </button>
        ) : (
          <button
            type='submit'
            className='custom-button'
            style={{ marginRight: '2rem' }}
            onClick={() => setFilter(prev => ({ ...prev, showSort: false }))}
          >
            Hide Sort
          </button>
        )}
        {filter.showSearch === false ? (
          <button
            type='submit'
            className='custom-button'
            onClick={() => setFilter(prev => ({ ...prev, showSearch: true }))}
          >
            Show Search
          </button>
        ) : (
          <button
            type='submit'
            className='custom-button'
            onClick={() => setFilter(prev => ({ ...prev, showSearch: false }))}
          >
            Hide Search
          </button>
        )}
      </div>
      {userData.length ? (
        <>
          <Table
            userData={currentPosts}
            currentID={currentID}
            setCurrentID={setCurrentID}
            search={search}
            setSearch={setSearch}
            showSearch={filter.showSearch}
            showSort={filter.showSort}
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
        <div style={{ padding: '10rem 0rem' }}>
          <img src={inbox} alt='' width='100' />
          <br />
          <small>Start Applying</small>
        </div>
      )}
    </div>
  )
}

export default SecondSection
