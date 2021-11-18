import React, { useState, useEffect } from 'react'

import {
  trash,
  trashHover,
  edit,
  editHover,
  downActive,
  upActive
} from '../../../Assets/index'

const Table = ({
  userData,
  currentID,
  setCurrentID,
  search,
  setSearch,
  showSearch,
  showSort
}) => {
  const initialUpdate = {
    updateCompanyName: '',
    updateRole: '',
    updateLocation: '',
    updateDateApplied: '',
    updateLinkedAccounts: '',
    updateStatus: ''
  }
  const [
    {
      updateCompanyName,
      updateRole,
      updateLocation,
      updateDateApplied,
      updateLinkedAccounts,
      updateStatus
    },
    setUpdateRow
  ] = useState(initialUpdate)

  const initialSort = {
    sortCompanyName: '',
    sortRole: '',
    sortLocation: '',
    sortDateApplied: '',
    sortLinkedAccounts: '',
    sortStatus: ''
  }
  const [sortCol, setSortCol] = useState(initialSort)
  const [refresh, setRefresh] = useState('')

  const onSearchChange = e => {
    const { name, value } = e.target
    setSearch(prev => ({ ...prev, [name]: value }))
  }
  // Used when editing rows
  const updateOnChange = e => {
    const { name, value } = e.target
    setUpdateRow(prev => ({ ...prev, [name]: value }))
  }
  // Remove Inputs when cancel or submit
  const handleCancel = () => {
    setCurrentID('')
    setUpdateRow(prev => ({
      ...prev,
      initialUpdate
    }))
    setRefresh(!refresh)
  }
  // Send updated data to backend
  const handleEdit = async id => {
    const updateData = {
      companyName: updateCompanyName,
      role: updateRole,
      location: updateLocation,
      dateApplied: updateDateApplied,
      linkedAccounts: updateLinkedAccounts,
      status: updateStatus
    }
    const req = await fetch(`http://localhost:8000/directory/contents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(updateData)
    })
    const data = await req.json()
    console.log(data)
    if (data.status === 'ok') {
      handleCancel()
    } else {
      alert(data.error)
    }
  }
  // Let backend know that delete the id
  const handleDelete = id => {
    fetch(`http://localhost:8000/directory/contents/${id}`, {
      method: 'DELETE'
    })
    setRefresh(!refresh)
  }

  useEffect(() => {}, [refresh])

  return (
    <div className='table-container'>
      <table className='table-dashboard'>
        <tr className='table-head'>
          <th>
            <span>Company Name</span>
            <br />
            <span className='table-sort'>
              {showSearch && (
                <input
                  name='searchCompanyName'
                  placeholder='Search'
                  type='search'
                  className='register-input search-input'
                  value={search.searchCompanyName}
                  onChange={onSearchChange}
                />
              )}
              {showSort && (
                <select
                  type='select'
                  value={sortCol.sortCompanyName}
                  className='register-input'
                  onChange={e =>
                    setSortCol(prev => ({
                      ...prev,
                      sortCompanyName: e.target.value
                    }))
                  }
                >
                  <option selected value=''></option>
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
                </select>
              )}
            </span>
          </th>
          <th>
            <span>Role</span>
            <br />
            <span className='table-sort'>
              <img
                src={upActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortCompanyName: 'asc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortCompanyName: '' }))
                }
              />
              <img
                src={downActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortCompanyName: 'desc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortCompanyName: '' }))
                }
              />
            </span>
          </th>
          <th>
            <span>Location</span>
            <br />
            <span className='table-sort'>
              <select name='' id=''></select>
              {/* <img
                src={upActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: 'asc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: '' }))
                }
              />
              <img
                src={downActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: 'desc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: '' }))
                }
              /> */}
            </span>
          </th>
          <th>
            <span>Date Applied</span>
            <span className='table-sort'>
              <img
                src={upActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: 'asc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: '' }))
                }
              />
              <img
                src={downActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: 'desc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortDateApplied: '' }))
                }
              />
            </span>
          </th>
          <th>
            <span>Linked Accounts</span>
            <span className='table-sort'>
              <img
                src={upActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: 'asc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: '' }))
                }
              />
              <img
                src={downActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: 'desc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: '' }))
                }
              />
            </span>
          </th>
          <th>
            <span>Status</span>
            <span className='table-sort'>
              <img
                src={upActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: 'asc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: '' }))
                }
              />
              <img
                src={downActive}
                alt=''
                width='10'
                onClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: 'desc' }))
                }
                onDoubleClick={() =>
                  setSortCol(prev => ({ ...prev, sortStatus: '' }))
                }
              />
            </span>
          </th>
          <th>Action</th>
        </tr>
        {userData &&
          userData
            // searching thru company name
            .filter((e, i) => {
              return e.companyName
                .toLowerCase()
                .includes(
                  search.searchCompanyName.replace(/\s+/g, '').toLowerCase()
                )
            })
            // searching thru role
            .filter((e, i) => {
              return e.role
                .toLowerCase()
                .includes(search.searchRole.replace(/\s+/g, '').toLowerCase())
            })
            // searching thru location
            .filter((e, i) => {
              return e.location
                .toLowerCase()
                .includes(
                  search.searchLocation.replace(/\s+/g, '').toLowerCase()
                )
            })
            .sort((firstelement, secondelement) => {
              if (sortCol.sortCompanyName === 'asc') {
                return firstelement.companyName > secondelement.companyName
                  ? 1
                  : -1
              } else if (sortCol.sortCompanyName === 'desc') {
                return firstelement.companyName < secondelement.companyName
                  ? 1
                  : -1
              }
              if (sortCol.sortRole === 'asc') {
                return firstelement.sortRole > secondelement.sortRole ? 1 : -1
              } else if (sortCol.sortRole === 'desc') {
                return firstelement.sortRole < secondelement.sortRole ? 1 : -1
              }
              if (sortCol.sortLocation === 'asc') {
                return firstelement.sortLocation > secondelement.sortLocation
                  ? 1
                  : -1
              } else if (sortCol.sortLocation === 'desc') {
                return firstelement.sortLocation < secondelement.sortLocation
                  ? 1
                  : -1
              }
              if (sortCol.sortDateApplied === 'asc') {
                return firstelement.dateApplied > secondelement.dateApplied
                  ? 1
                  : -1
              } else if (sortCol.sortDateApplied === 'desc') {
                return firstelement.dateApplied < secondelement.dateApplied
                  ? 1
                  : -1
              }
              if (sortCol.linkedAccounts === 'asc') {
                return firstelement.linkedAccounts >
                  secondelement.linkedAccounts
                  ? 1
                  : -1
              } else if (sortCol.linkedAccounts === 'desc') {
                return firstelement.linkedAccounts <
                  secondelement.linkedAccounts
                  ? 1
                  : -1
              }
              if (sortCol.sortStatus === 'asc') {
                return firstelement.status > secondelement.status ? 1 : -1
              } else if (sortCol.sortStatus === 'desc') {
                return firstelement.status < secondelement.status ? 1 : -1
              }
            })
            .map((e, i) => {
              return (
                <tr key={i}>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <input
                          name='updateCompanyName'
                          type='text'
                          placeholder={e.companyName}
                          value={updateCompanyName}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        />
                      </div>
                    ) : (
                      e.companyName
                    )}
                  </td>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <input
                          name='updateRole'
                          type='text'
                          placeholder={e.role}
                          value={updateRole}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        />
                      </div>
                    ) : (
                      e.role
                    )}
                  </td>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <input
                          name='updateLocation'
                          type='text'
                          placeholder={e.location}
                          value={updateLocation}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        />
                      </div>
                    ) : (
                      e.location
                    )}
                  </td>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <input
                          name='updateDateApplied'
                          type='date'
                          placeholder={e.dateApplied}
                          value={updateDateApplied}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        />
                      </div>
                    ) : (
                      e.dateApplied
                    )}
                  </td>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <input
                          name='updateLinkedAccounts'
                          type='text'
                          placeholder={e.linkedAccounts}
                          value={updateLinkedAccounts}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        />
                      </div>
                    ) : (
                      e.linkedAccounts
                    )}
                  </td>
                  <td className='dashboard-col'>
                    {currentID === i ? (
                      <div>
                        <select
                          name='updateStatus'
                          type='select'
                          placeholder={e.status}
                          value={updateStatus}
                          className='register-input'
                          style={{ width: '10rem' }}
                          onChange={updateOnChange}
                        >
                          <option selected value=''></option>
                          <option value='Applied'>Applied</option>
                          <option value='Interview'>Interview</option>
                          <option value='Technical Exam'>Technical Exam</option>
                          <option value='Offer'>Offer</option>
                          <option value='Rejected'>Rejected</option>
                        </select>
                      </div>
                    ) : (
                      e.status
                    )}
                  </td>
                  <td className={'table-action'}>
                    {currentID === i ? (
                      <>
                        <div style={{ textAlign: 'right' }}>
                          <input
                            type='submit'
                            value='Update'
                            className='custom-button'
                            onClick={() => handleEdit(e._id)}
                          />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <input
                            type='submit'
                            value='Cancel'
                            style={{ marginTop: '0.5rem' }}
                            className='custom-button'
                            onClick={handleCancel}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <span style={{ margin: '0px 2px' }}>
                          <img
                            src={edit}
                            alt=''
                            className='dashboard-edit'
                            onClick={() => setCurrentID(i)}
                            onMouseOver={e => (e.currentTarget.src = editHover)}
                            onMouseOut={e => (e.currentTarget.src = edit)}
                          />
                        </span>
                        <span style={{ margin: '0px 2px' }}>
                          <img
                            src={trash}
                            alt=''
                            className='dashboard-trash'
                            onClick={() => handleDelete(e._id)}
                            onMouseOver={e =>
                              (e.currentTarget.src = trashHover)
                            }
                            onMouseOut={e => (e.currentTarget.src = trash)}
                          />
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
      </table>
    </div>
  )
}

export default Table
