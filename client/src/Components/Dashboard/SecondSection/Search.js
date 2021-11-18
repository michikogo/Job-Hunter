import React from 'react'

const Search = ({ search, setSearch }) => {
  const onSearchChange = e => {
    const { name, value } = e.target
    setSearch(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div className='search-container'>
      <div>
        <label className='register-label'>Search Company Name</label>
        <br />
        <input
          name='searchCompanyName'
          type='search'
          className='register-input search-input'
          value={search.searchCompanyName}
          onChange={onSearchChange}
        />
      </div>
      <div>
        <label className='register-label'>Search Role</label>
        <br />
        <input
          name='searchRole'
          type='search'
          className='register-input search-input'
          value={search.searchRole}
          onChange={onSearchChange}
        />
      </div>
      <div>
        <label className='register-label'>Search Location</label>
        <br />
        <input
          name='searchLocation'
          type='search'
          className='register-input search-input'
          value={search.searchLocation}
          onChange={onSearchChange}
        />
      </div>
    </div>
  )
}

export default Search
