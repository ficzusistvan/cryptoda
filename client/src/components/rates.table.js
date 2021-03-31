import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTable, usePagination } from 'react-table'
import NumberFormat from 'react-number-format';
import { Progress } from 'reactstrap';

// Create a default prop getter
const defaultPropGetter = () => ({})

export default function ListingTable({ data, fetchData, loading, pageCount: controlledPageCount, getCellProps = defaultPropGetter }) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'cmc_rank'
      },
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
        Cell: ({ row }) => (
          <Link href={`/cryptos/${row.values.symbol}`}>
            <a>{row.values.name}</a>
          </Link>
        ),
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Market capitalization',
        accessor: 'quote.USD.market_cap',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.market_cap']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        },
      },
      {
        Header: 'Circulating supply',
        accessor: 'circulating_supply',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values.circulating_supply} displayType={'text'} thousandSeparator={true} />
        },
      },
      {
        Header: 'Total supply',
        accessor: 'total_supply',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values.total_supply} displayType={'text'} thousandSeparator={true} />
        },
      },
      {
        Header: 'Max supply',
        accessor: 'max_supply',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values.max_supply} displayType={'text'} thousandSeparator={true} />
        },
      },
      {
        Header: 'Price',
        accessor: 'quote.USD.price',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.price']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        },
      },
      {
        Header: 'Volume 24h',
        accessor: 'quote.USD.volume_24h',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.volume_24h']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        },
      },
      {
        Header: '%1h',
        accessor: 'quote.USD.percent_change_1h',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.percent_change_1h']} displayType={'text'} thousandSeparator={true} suffix={'%'} decimalScale={2} />
        },
      },
      {
        Header: '%24h',
        accessor: 'quote.USD.percent_change_24h',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.percent_change_24h']} displayType={'text'} thousandSeparator={true} prefix={'%'} decimalScale={2} />
        },
      },
      {
        Header: '%7d',
        accessor: 'quote.USD.percent_change_7d',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['quote.USD.percent_change_7d']} displayType={'text'} thousandSeparator={true} prefix={'%'} decimalScale={2} />
        },
      }
    ],
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 }, // Pass our hoisted table state
    manualPagination: true, // Tell the usePagination
    // hook that we'll handle our own data fetching
    // This means we'll also have to provide our own
    // pageCount.
    pageCount: controlledPageCount,
  },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>
      {/*<pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
          </pre>*/}
      <div>
        <table {...getTableProps()} className="table table-hover" size="small">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th scope="col" {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr className="table-primary" {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps([
                      {
                        className:
                          cell.column.id === 'symbol' ? "text-info"
                            : cell.column.id === 'quote.USD.price' ? "text-info"
                              : cell.column.id === 'quote.USD.percent_change_1h' ? cell.value >= 0 ? "text-success" : "text-danger"
                                : cell.column.id === 'quote.USD.percent_change_24h' ? cell.value >= 0 ? "text-success" : "text-danger"
                                  : cell.column.id === 'quote.USD.percent_change_7d' ? cell.value >= 0 ? "text-success" : "text-danger"
                                    : cell.column.className
                      },
                      getCellProps(cell),
                    ])}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                </td>
              )}
            </tr>
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