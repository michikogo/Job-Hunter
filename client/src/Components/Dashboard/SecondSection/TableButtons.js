import React from 'react'
import {
  trash,
  trashHover,
  edit,
  editHover,
  disabledEdit,
  disabledTrash
} from '../../../Assets/index'

const TableButtons = ({
  i,
  e,
  showModal,
  currentID,
  setCurrentID,
  handleEdit,
  handleCancel,
  handleDelete
}) => {
  return (
    <div>
      {showModal ? (
        <>
          <span className='table-icon-container'>
            <img src={disabledEdit} alt='' className='table-disable-icon' />
          </span>
          <span className='table-icon-container'>
            <img src={disabledTrash} alt='' className='table-disable-icon' />
          </span>
        </>
      ) : currentID === i ? (
        <div>
          <div className='table-update-button'>
            <input
              type='submit'
              value='Update'
              className='custom-button'
              onClick={() => handleEdit(e._id)}
            />
          </div>
          <div className='table-update-button'>
            <input
              type='submit'
              value='Cancel'
              style={{ marginTop: '0.5rem' }}
              className='custom-button'
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : (
        <div>
          <span className='table-icon-container'>
            <img
              src={edit}
              alt=''
              className='table-edit'
              onClick={() => setCurrentID(i)}
              onMouseOver={e => (e.currentTarget.src = editHover)}
              onMouseOut={e => (e.currentTarget.src = edit)}
            />
          </span>
          <span className='table-icon-container'>
            <img
              src={trash}
              alt=''
              className='table-trash'
              onClick={() => handleDelete(e._id)}
              onMouseOver={e => (e.currentTarget.src = trashHover)}
              onMouseOut={e => (e.currentTarget.src = trash)}
            />
          </span>
        </div>
      )}
    </div>
  )
}

export default TableButtons
