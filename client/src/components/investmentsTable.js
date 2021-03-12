import React from 'react'
import { useTable } from 'react-table'
import NumberFormat from 'react-number-format';

// Create a default prop getter
const defaultPropGetter = () => ({})

const TEXT_COLORS = [
  //"text-muted",
  //"text-primary",
  "text-secondary",
  "text-warning",
  "text-danger",
  "text-success",
  "text-info"
];

let toColors = new Map();
let toIdx = 0;

export default function InvestmentsTable({ data, loading, getCellProps = defaultPropGetter }) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'To',
        accessor: 'to'
      },
      {
        Header: 'Amount',
        accessor: 'amount', // accessor is the "key" in the data
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['amount']} displayType={'text'} thousandSeparator={true} decimalScale={2} />
        },
      },
      {
        Header: 'Currency',
        accessor: 'currency'
      },
      {
        Header: 'in USD',
        accessor: 'inUSD', // accessor is the "key" in the data
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['inUSD']} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />
        },
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp'
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
    prepareRow
  } = useTable({
    columns,
    data
  })

  // Render the UI for your table
  return (
    <>
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
                        className: cell.column.id === 'to' ? (() => {
                          if (!toColors.has(cell.value)) {
                            toColors.set(cell.value, TEXT_COLORS[toIdx++])
                            if (toIdx > TEXT_COLORS.length - 1) {
                              toIdx = 0;
                            }
                          }
                          return toColors.get(cell.value);
                        })()
                          : cell.column.id === 'amount' ? "text-info"
                            : cell.column.id === 'inUSD' ? "text-success"
                              : cell.column.className
                      },
                      getCellProps(cell),
                    ])}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
            <tr>
              {loading && (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}