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
    <ul
      className={
        showModal ? 'pagination modal-hide modal-background' : 'pagination'
      }
    >
      {pageNumbers.map(number => (
        <li
          key={number}
          className={currentNumber === number && 'pagination-active'}
          // className={showModal && "modal-hide modal-background"}
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
            className={currentNumber === number && 'pagination-active'}
            className={showModal && 'modal-hide modal-background'}
          >
            {number}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Pagination
