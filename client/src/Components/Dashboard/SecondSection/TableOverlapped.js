import React, { useState, useEffect } from 'react'

import {
  trash,
  trashHover,
  edit,
  editHover,
  disabledEdit,
  disabledTrash
} from '../../../Assets/index'
import Filter from './Filter'

const TableOverlapped = ({
  userData,
  currentID,
  setCurrentID,
  search,
  setSearch,
  filter,
  sortCol,
  setSortCol
}) => {
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
          userData.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.companyName}</td>
                <td>{e.role}</td>
                <td>{e.location}</td>
                <td>{e.dateApplied}</td>
                <td>{e.linkedAccounts}</td>
                <td>{e.status}</td>
                <td className='table-action'>
                  <>
                    <span className='table-icon-container'>
                      <img
                        src={disabledEdit}
                        alt=''
                        className='table-disable-icon'
                      />
                    </span>
                    <span className='table-icon-container'>
                      <img
                        src={disabledTrash}
                        alt=''
                        className='table-disable-icon'
                      />
                    </span>
                  </>
                </td>
              </tr>
            )
          })}
      </table>
    </div>
  )
}

export default TableOverlapped
