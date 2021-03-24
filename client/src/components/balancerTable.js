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

let colors = new Map();
let idx = 0;

export default function BalancerTable({ data, loading, getCellProps = defaultPropGetter }) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Quantity to buy',
        accessor: 'quantityToBuy'
      },
      {
        Header: 'Current price',
        accessor: 'currentPrice', // accessor is the "key" in the data
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['currentPrice']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        },
      },
      {
        Header: 'Adjusted percent',
        accessor: 'percent',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['percent']} displayType={'text'} thousandSeparator={true} decimalScale={3} />
        }
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
                        className:
                          cell.column.id === 'name' ? (() => {
                            if (!colors.has(cell.value)) {
                              colors.set(cell.value, TEXT_COLORS[idx++])
                              if (idx > TEXT_COLORS.length - 1) {
                                idx = 0;
                              }
                            }
                            return colors.get(cell.value);
                          })()
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