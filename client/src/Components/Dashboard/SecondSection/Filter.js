import React from 'react'

const Filter = ({
  showModal,
  filter,
  search,
  setSearch,
  searchName,
  sortCol,
  setSortCol,
  sortName,
  handleClearSort
}) => {
  // Append letters to create word to search
  const onSearchChange = e => {
    const { name, value } = e.target
    setSearch(prev => ({ ...prev, [name]: value }))
  }
  // Clear old sort and sort new one
  const onSortChange = e => {
    handleClearSort()
    setSortCol(prev => ({
      ...prev,
      [sortName]: e.target.value
    }))
  }
  return (
    <span className='filter-container'>
      {filter.showSearch &&
        (showModal ? (
          <input
            name={searchName}
            placeholder='Search'
            type='search'
            className='register-input search-input'
            disabled
          />
        ) : (
          <input
            name={searchName}
            placeholder='Search'
            type='search'
            className='register-input search-input'
            value={search[searchName]}
            onChange={onSearchChange}
          />
        ))}
      {filter.showSort &&
        (showModal ? (
          <input
            value={
              sortCol[sortName] === 'asc'
                ? 'Ascending'
                : sortCol[sortName] === 'desc'
                ? 'Descending'
                : ''
            }
            className='register-input search-input'
            disabled
          />
        ) : (
          <select
            type='select'
            value={sortCol[sortName]}
            className='register-input search-input'
            onChange={e => onSortChange(e)}
          >
            <option selected value=''></option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        ))}
    </span>
  )
}

export default Filter
