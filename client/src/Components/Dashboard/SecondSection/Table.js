import React from 'react'

import Filter from './Filter'
import TableContents from './TableContents'

const Table = ({
  regenerate,
  setRegenerate,
  showModal,
  userData,
  currentID,
  setCurrentID,
  search,
  setSearch,
  filter,
  sortCol,
  setSortCol,
  handleClearSort
}) => {
  return (
    <div
      className={
        showModal ? 'table-container table-disabled ' : 'table-container'
      }
    >
      <table className='table-dashboard'>
        <thead>
          <tr className='table-head'>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Company Name</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchCompanyName'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortCompanyName'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Role</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchRole'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortRole'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Location</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchLocation'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortLocation'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Date Applied</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchDateApplied'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortDateApplied'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Linked Accounts</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchLinkedAccounts'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortLinkedAccounts'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              <span>Status</span>
              <br />
              <Filter
                showModal={showModal}
                filter={filter}
                search={search}
                setSearch={setSearch}
                searchName='searchStatus'
                sortCol={sortCol}
                setSortCol={setSortCol}
                sortName='sortStatus'
                handleClearSort={handleClearSort}
              />
            </th>
            <th className={showModal ? 'table-text-disabled' : undefined}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userData
            ? userData
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
                    .includes(
                      search.searchRole.replace(/\s+/g, '').toLowerCase()
                    )
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
                      search.searchLinkedAccounts
                        .replace(/\s+/g, '')
                        .toLowerCase()
                    )
                }) // searching thru status
                .filter((e, i) => {
                  return e.status
                    .toLowerCase()
                    .includes(
                      search.searchStatus.replace(/\s+/g, '').toLowerCase()
                    )
                })
                .sort((firstelement, secondelement) => {
                  // sort Company Name
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
                  } // sort Role
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
                  } // sort Location
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
                  } // sort Date Applied
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
                  } // sort Linked Accounts
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
                  } // sort Status
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
                  return undefined
                })
                .map((e, i) => {
                  return (
                    <tr
                      key={i}
                      className={
                        showModal ? 'table-contents-disabled' : undefined
                      }
                    >
                      <TableContents
                        regenerate={regenerate}
                        setRegenerate={setRegenerate}
                        e={e}
                        i={i}
                        showModal={showModal}
                        currentID={currentID}
                        setCurrentID={setCurrentID}
                      />
                    </tr>
                  )
                })
            : undefined}
        </tbody>
      </table>
    </div>
  )
}

export default Table
