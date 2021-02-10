import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTable, usePagination } from 'react-table'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

// Create a default prop getter
const defaultPropGetter = () => ({})

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  body: {
    fontSize: 12,
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  sizeSmall: {
    padding: "8px 5px 8px 5px",
  },
}))(TableCell);

export default function ListingTable({ data, fetchData, loading, pageCount: controlledPageCount, getCellProps = defaultPropGetter }) {

  const classes = useStyles();

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
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ row }) => {
          return <span>{row.values.tags.join(', ')}</span>
        },
      },
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
      <TableContainer component={Paper}>
        <Table {...getTableProps()} className={classes.table} size="small">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <StyledTableCell {...column.getHeaderProps()}>{column.render('Header')}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <StyledTableCell {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style:
                          cell.column.id === 'symbol' ? {
                            fontWeight: `bold`,
                          } : cell.column.id === 'quote.USD.price' ? {
                            fontWeight: `bold`
                          } : cell.column.id === 'quote.USD.percent_change_1h' ? {
                            backgroundColor: cell.value >= 0 ? `hsl(135, 100%, 50%)` : `hsl(15, 100%, 50%)`
                          } : cell.column.id === 'quote.USD.percent_change_24h' ? {
                            backgroundColor: cell.value >= 0 ? `hsl(135, 100%, 50%)` : `hsl(15, 100%, 50%)`
                          } : cell.column.id === 'quote.USD.percent_change_7d' ? {
                            backgroundColor: cell.value >= 0 ? `hsl(135, 100%, 50%)` : `hsl(15, 100%, 50%)`
                          } : cell.column.style
                      },
                      getCellProps(cell),
                    ])}>{cell.render('Cell')}</StyledTableCell>
                  })}
                </TableRow>
              )
            })}
            <TableRow>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                  <td colSpan="10000">
                    Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                  </td>
                )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
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
      </div>
    </>
  )
}