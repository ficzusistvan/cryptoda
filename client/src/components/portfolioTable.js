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

let walletColors = new Map();
let symbolColors = new Map();
let walletIdx = 0;
let symbolIdx = 0;

export default function PortfolioTable({ data, loading, getCellProps = defaultPropGetter }) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Wallet',
        accessor: 'type'
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
        accessor: 'price_in_USD',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['price_in_USD']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        },
      },
      {
        Header: 'Value in USD',
        accessor: 'value_in_USD',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['value_in_USD']} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        },
      },
      {
        Header: 'Price in EUR',
        accessor: 'price_in_EUR',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['price_in_EUR']} displayType={'text'} thousandSeparator={true} suffix={' EUR'} decimalScale={2} />
        },
      },
      {
        Header: 'Value in EUR',
        accessor: 'value_in_EUR',
        Cell: ({ row }) => {
          return <NumberFormat value={row.values['value_in_EUR']} displayType={'text'} thousandSeparator={true} suffix={' EUR'} decimalScale={2} />
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
                          cell.column.id === 'type' ? (() => {
                            if (!walletColors.has(cell.value)) {
                              walletColors.set(cell.value, TEXT_COLORS[walletIdx++])
                              if (walletIdx > TEXT_COLORS.length - 1) {
                                walletIdx = 0;
                              }
                            }
                            return walletColors.get(cell.value);
                          })()
                            : cell.column.id === 'symbol' ? (() => {
                              if (!symbolColors.has(cell.value)) {
                                symbolColors.set(cell.value, TEXT_COLORS[symbolIdx++])
                                if (symbolIdx > TEXT_COLORS.length - 1) {
                                  symbolIdx = 0;
                                }
                              }
                              return symbolColors.get(cell.value);
                            })()
                              : cell.column.id === 'value_in_USD' ? "text-success"
                                : cell.column.id === 'value_in_EUR' ? "text-success"
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