import React, { useEffect, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { Input, Progress } from 'reactstrap';

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
export default function WalletsTable({ data, updateMyData, skipPageReset }) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'type'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Api Key',
        accessor: 'api_key', // accessor is the "key" in the data
      },
      {
        Header: 'Secret Key',
        accessor: 'secret_key'
      },
      {
        Header: 'Is CEX?',
        accessor: 'is_cex'
      },
    ],
    []
  )

  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="text-center">Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong></div>
        <Progress min={0} value={pageIndex + 1} max={pageOptions.length} />
      </div>

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{`<<`}</button>
        <button type="button" class="btn btn-secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>{`<`}</button>
        <button type="button" class="btn btn-secondary" onClick={() => nextPage()} disabled={!canNextPage}>{`>`}</button>
        <button type="button" class="btn btn-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{`>>`}</button>
      </div>
      <span>
        {' '}| Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </>
  )
}