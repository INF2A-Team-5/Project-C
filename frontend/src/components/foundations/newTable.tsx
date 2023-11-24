
interface TableProps {
    data: { [key: string]: any }[];
    displayColumns: string[];
    dataColumns: string[];
}

function NewTable({ data, displayColumns, dataColumns }: TableProps) {

    function handleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        alert(id)
    }

    return (
        <table>
            <thead>
                <tr>
                    {displayColumns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {dataColumns.map((column, columnIndex) => (
                            <td key={columnIndex}>{row[column]}</td>
                        ))}
                        <td>
                            <button onClick={(e) => handleButtonClick(e, row.ticketId)}>Click me</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default NewTable;