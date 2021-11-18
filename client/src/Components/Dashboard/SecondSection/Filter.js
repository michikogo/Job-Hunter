import React from 'react'

const Filter = ({
  filter,
  search,
  setSearch,
  searchName,
  sortCol,
  setSortCol,
  sortName
}) => {
  const onSearchChange = e => {
    const { name, value } = e.target
    setSearch(prev => ({ ...prev, [name]: value }))
  }

  return (
    <span className='table-filter'>
      {filter.showSearch && (
        <input
          name={searchName}
          placeholder='Search'
          type='search'
          className='register-input search-input'
          value={search[searchName]}
          onChange={onSearchChange}
        />
      )}
      {filter.showSort && (
        <select
          type='select'
          value={sortCol[sortName]}
          className='register-input'
          onChange={e =>
            setSortCol(prev => ({
              ...prev,
              [sortName]: e.target.value
            }))
          }
        >
          <option selected value=''></option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      )}
    </span>
  )
}

export default Filter
