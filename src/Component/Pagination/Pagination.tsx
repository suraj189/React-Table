import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Previous from '../../image/CaretCircleLeft.png'
import Next from '../../image/CaretCircleRight.png'
import Last from '../../image/CaretCircleDoubleRight.png'
import First from '../../image/CaretCircleDoubleLeft.png'
import './Pagination.css'

interface PaginationProps {
  length: number;
  currentPage: number;
  totalPages: number;
  onEntriesPerPageChange: (entriesPerPage: number) => void;
  handlePagechange: (currentPage: number, entriesPerPage: number) => void
}

const Pagination: React.FC<PaginationProps> = React.memo(({
  length,
  currentPage,
  totalPages,
  onEntriesPerPageChange,
  handlePagechange
}) => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [page,setPage]=useState<number>(1)

  useEffect(() => {
    onEntriesPerPageChange(entriesPerPage);
  }, [entriesPerPage, onEntriesPerPageChange]);

  const handleEntriesPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
  }, []);

  const handlePageChange = useCallback((newPage: number, entriesPerPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePagechange(newPage, entriesPerPage)
      setPage(newPage)
    }
  },[handlePagechange,totalPages])

  const handleSelectPage = useCallback(((e: ChangeEvent<HTMLSelectElement> | any) => {
    handlePagechange(e.target.value, entriesPerPage)
    setPage(e.target.value)
  }),[handlePagechange,entriesPerPage])


  const totalPageOptions = [5, 10, 15, 20]; // Add more options as needed

  const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="pagination-container" data-testid='pagination-container'>
      <div className="entries-per-page">
        <span className='showing'>Showing</span>
        <select value={entriesPerPage} onChange={handleEntriesPerPageChange} data-testid='select'> 
          {totalPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {length > 0 && (
          <span className='length'>
             of {length} records
          </span>
        )}
      </div>
      <div className="pagination-controls">
        <div className='leftSection'>
          <div role='button'>
          <img src={First}
            onClick={() => handlePageChange(1, entriesPerPage)}
            alt='First' 
            data-testid='First' />
          </div>
          <div  role='button'>
          <img src={Previous}
            onClick={() => handlePageChange(currentPage - 1, entriesPerPage)}
            alt='Previous'
            data-testid='Previous' />
        </div>
        </div>
      <select
        onChange={handleSelectPage}
        disabled={currentPage === totalPages}
      >
        {totalPagesArray.map((pages) => (
          <option key={pages} value={pages}>
            {pages}
          </option>
        ))}
      </select>
      <div className='rightSection'>
        <div role='button' >
          <img src={Next}
            onClick={() => handlePageChange(currentPage+1, entriesPerPage)}
            alt='Next'
            data-testid='Next' />
        </div>
        <div role='button' >
          <img src={Last}
            onClick={() => handlePageChange(Math.floor(length/entriesPerPage), entriesPerPage)}
            alt='Last'
            data-testid='Last' />
        </div>
      </div>
      </div>
    </div>
  );
});

export default Pagination;
