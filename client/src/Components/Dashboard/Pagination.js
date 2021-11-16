import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [currentNumber, setCurrentNumber] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentNumber === number && "pagination-active"}
          >
            <a
              onClick={() => {
                paginate(number);
                setCurrentNumber(number);
              }}
              href="/dashboard/!#"
              className={currentNumber === number && "pagination-active"}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
