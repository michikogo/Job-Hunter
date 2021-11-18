import React from 'react'

const FilterButton = ({
  filter,
  setFilter,
  handleHideSort,
  handleHideSearch
}) => {
  return (
    <div className='filter-button-container'>
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
          onClick={handleHideSort}
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
          onClick={handleHideSearch}
        >
          Hide Search
        </button>
      )}
    </div>
  )
}

export default FilterButton
