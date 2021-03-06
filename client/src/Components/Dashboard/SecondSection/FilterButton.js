import React from 'react'

const FilterButton = ({
  showModal,
  filter,
  setFilter,
  handleHideSort,
  handleHideSearch
}) => {
  return (
    <div className='filter-button-container'>
      {filter.showSort === false ? (
        showModal ? (
          <button
            type='submit'
            className='dashboard-button-disabled'
            style={{ marginRight: '2rem' }}
          >
            Show Sort
          </button>
        ) : (
          <button
            type='submit'
            className='custom-button'
            style={{ marginRight: '2rem' }}
            onClick={() => setFilter(prev => ({ ...prev, showSort: true }))}
          >
            Show Sort
          </button>
        )
      ) : showModal ? (
        <button
          type='submit'
          className='dashboard-button-disabled'
          style={{ marginRight: '2rem' }}
        >
          Hide Sort
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
        showModal ? (
          <button type='submit' className='dashboard-button-disabled'>
            Show Search
          </button>
        ) : (
          <button
            type='submit'
            className='custom-button'
            onClick={() => setFilter(prev => ({ ...prev, showSearch: true }))}
          >
            Show Search
          </button>
        )
      ) : showModal ? (
        <button type='submit' className='dashboard-button-disabled'>
          Hide Search
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
