import React, { useState, useEffect } from 'react'

import {
  trash,
  trashHover,
  edit,
  editHover,
  downActive,
  upActive
} from '../../../Assets/index'
import Filter from './Filter'

const Table = ({
  userData,
  currentID,
  setCurrentID,
  search,
  setSearch,
  filter,
  sortCol,
  setSortCol
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

  const [refresh, setRefresh] = useState('')

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
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchCompanyName'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortCompanyName'
            />
          </th>
          <th>
            <span>Role</span>
            <br />
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchRole'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortRole'
            />
          </th>
          <th>
            <span>Location</span>
            <br />
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchLocation'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortLocation'
            />
          </th>
          <th>
            <span>Date Applied</span>
            <br />
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchDateApplied'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortDateApplied'
            />
          </th>
          <th>
            <span>Linked Accounts</span>
            <br />
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchLinkedAccounts'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortLinkedAccounts'
            />
          </th>
          <th>
            <span>Status</span>
            <br />
            <Filter
              filter={filter}
              search={search}
              setSearch={setSearch}
              searchName='searchStatus'
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortName='sortStatus'
            />
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
            }) // searching thru date applied
            .filter((e, i) => {
              return e.dateApplied
                .toLowerCase()
                .includes(
                  search.searchDateApplied.replace(/\s+/g, '').toLowerCase()
                )
            }) // searching thru linked Accounts
            .filter((e, i) => {
              return e.linkedAccounts
                .toLowerCase()
                .includes(
                  search.searchLinkedAccounts.replace(/\s+/g, '').toLowerCase()
                )
            }) // searching thru status
            .filter((e, i) => {
              return e.status
                .toLowerCase()
                .includes(search.searchStatus.replace(/\s+/g, '').toLowerCase())
            })
            .sort((firstelement, secondelement) => {
              if (sortCol.sortCompanyName === 'asc') {
                return firstelement.companyName.toLowerCase() >
                  secondelement.companyName.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.sortCompanyName === 'desc') {
                return firstelement.companyName.toLowerCase() <
                  secondelement.companyName.toLowerCase()
                  ? 1
                  : -1
              }
            })
            .sort((firstelement, secondelement) => {
              if (sortCol.sortRole === 'asc') {
                return firstelement.role.toLowerCase() >
                  secondelement.role.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.sortRole === 'desc') {
                return firstelement.role.toLowerCase() <
                  secondelement.role.toLowerCase()
                  ? 1
                  : -1
              }
              if (sortCol.sortLocation === 'asc') {
                return firstelement.location.toLowerCase() >
                  secondelement.location.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.sortLocation === 'desc') {
                return firstelement.location.toLowerCase() <
                  secondelement.location.toLowerCase()
                  ? 1
                  : -1
              }
              if (sortCol.sortDateApplied === 'asc') {
                return firstelement.dateApplied.toLowerCase() >
                  secondelement.dateApplied.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.sortDateApplied === 'desc') {
                return firstelement.dateApplied.toLowerCase() <
                  secondelement.dateApplied.toLowerCase()
                  ? 1
                  : -1
              }
              if (sortCol.sortLinkedAccounts === 'asc') {
                return firstelement.linkedAccounts.toLowerCase() >
                  secondelement.linkedAccounts.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.linkedAccounts === 'desc') {
                return firstelement.linkedAccounts.toLowerCase() <
                  secondelement.linkedAccounts.toLowerCase()
                  ? 1
                  : -1
              }
              if (sortCol.sortStatus === 'asc') {
                return firstelement.status.toLowerCase() >
                  secondelement.status.toLowerCase()
                  ? 1
                  : -1
              } else if (sortCol.sortStatus === 'desc') {
                return firstelement.status.toLowerCase() <
                  secondelement.status.toLowerCase()
                  ? 1
                  : -1
              }
            })
            .map((e, i) => {
              return (
                <tr key={i}>
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                  <td className='table-action'>
                    {currentID === i ? (
                      <>
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
                      </>
                    ) : (
                      <>
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
