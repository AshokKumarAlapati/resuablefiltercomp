import React, * as react from 'react';
import { Table } from 'reactstrap';
import ColumnDropdown from './ColumnDropdown';
import { data } from '../util/Data';
import { fetchColumnValues } from '../util/util';
import { NoRecordsFound } from './NoRecordsFound';
import { columns } from '../util/Data'
const Example = (props) => {
    const [filterData, setFilterData] = react.useState({ isFilterApplied: false, filteredData: {} })
    const [filterResults, setFilterResults] = react.useState({ filterResult: [] })
    const handleFilter = (columnName, columnValue) => {
        let existFilterData = filterData.filteredData;
        if (existFilterData[columnName]) {
            existFilterData[columnName].push(columnValue)
        } else {
            existFilterData[columnName] = [columnValue]
        }
        let existingData = data.slice();
        if (Object.keys(existFilterData).length > 0) {
            Object.keys(existFilterData).forEach(columnName => {
                existFilterData[columnName].forEach(columnValue => {
                    existingData = existingData.filter(sourceData => {
                        if (sourceData && sourceData[columnName] == columnValue) {
                            return sourceData
                        }
                    })
                })
            })
            setFilterData({ isFilterApplied: true, filteredData: existFilterData })
            setFilterResults({ filterResult: existingData })
        } else {
            setFilterData({ isFilterApplied: false, filteredData: {} })
            setFilterResults({ filterResult: [] })
        }

    }
    const handleReset = () => {
        setFilterData({ isFilterApplied: false, filteredData: {} })
    }
    let renderData = filterData.isFilterApplied ? filterResults.filterResult : data;
    return (
        <React.Fragment>
            <div>
                <input type="button" value="Reset" onClick={handleReset} />
            </div>
            <Table striped>
                <thead>
                    <tr>
                        {
                            columns.map(column => {
                                return <th>
                                    <ColumnDropdown columnList={fetchColumnValues(column, data)} handleFilter={handleFilter} isFilterApplied={filterData.isFilterApplied} columnName={column} />
                                </th>
                            })
                        }
                    </tr>
                    <tr>
                        {
                            columns.map(column => {
                                return <th>{column}
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {renderData.length > 0 ? renderData.map(row => {
                        return <tr>
                            <td>{row.column1}</td>
                            <td>{row.column2}</td>
                            <td>{row.column3}</td>
                            <td>{row.column4}</td>
                            <td>{row.column5}</td>
                        </tr>
                    }) : null}
                </tbody>
                {
                    renderData.length == 0 ? <NoRecordsFound /> : null
                }
            </Table>


        </React.Fragment>
    );
}

export default Example;