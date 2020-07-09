export const fetchColumnValues =(columnName, data) =>{
    let columnData = [];
    data.forEach(row =>{
        columnData.push(row[columnName])
    })
    return columnData;
}