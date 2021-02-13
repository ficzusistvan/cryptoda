import React from 'react'
import { useTable } from 'react-table'
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
    fontWeight: "bold"
  },
  body: {
    fontSize: 12,
    border: "1px solid rgba(224, 224, 224, 1)",
    width: "20%"
  },
  sizeSmall: {
    padding: "8px 5px 8px 5px",
  },
}))(TableCell);

export default function PortfolioTable({ data, loading, getCellProps = defaultPropGetter }) {

  const classes = useStyles();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Wallet',
        accessor: 'wallet'
      },
      {
        Header: 'Symbol',
        accessor: 'symbol'
      },
      {
        Header: 'Balance',
        accessor: 'balance', // accessor is the "key" in the data
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['balance']} displayType={'text'} thousandSeparator={true} />
        },
      },
      {
        Header: 'Price in USD',
        accessor: 'price',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['price']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        },
      },
      {
        Header: 'Value in USD',
        accessor: 'value',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['value']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
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
    prepareRow
  } = useTable({
    columns,
    data
  })

  // Render the UI for your table
  return (
    <>
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
                          cell.column.id === 'wallet' ? {
                            fontWeight: `bold`,
                            fontSize: '16px',
                          } : cell.column.id === 'symbol' ? {
                            fontWeight: `bold`,
                          } : cell.column.id === 'value' ? {
                            fontWeight: `bold`,
                            backgroundColor: `hsl(50, 50%, 50%)`
                          } : cell.column.style
                      },
                      getCellProps(cell),
                    ])}>{cell.render('Cell')}</StyledTableCell>
                  })}
                </TableRow>
              )
            })}
            <TableRow>
              {loading && (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}