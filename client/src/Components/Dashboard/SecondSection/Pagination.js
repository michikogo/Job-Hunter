import { useState } from 'react'

const Pagination = ({
  showModal,
  currentID,
  postsPerPage,
  totalPosts,
  paginate
}) => {
  const pageNumbers = []
  const [currentNumber, setCurrentNumber] = useState(1)

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul className='pagination'>
      {showModal
        ? pageNumbers.map(number => (
            <li
              key={number}
              style={{
                color: 'grey',
                border: '1px solid grey',
                cursor: 'default',
                background: 'rgba(150, 150, 150, 0.8)'
              }}
              className={
                currentNumber === number ? 'pagination-active' : undefined
              }
            >
              {number}
            </li>
          ))
        : pageNumbers.map(number => (
            <li
              key={number}
              className={
                currentNumber === number ? 'pagination-active' : undefined
              }
              onClick={() => {
                if (currentID === '') {
                  paginate(number)
                  setCurrentNumber(number)
                } else {
                  alert('Update or Cancel before moving to the next page')
                }
              }}
            >
              <a
                href='/dashboard/!#'
                className={
                  currentNumber === number ? 'pagination-active' : undefined
                }
              >
                {number}
              </a>
            </li>
          ))}
    </ul>
  )
}

export default Pagination
