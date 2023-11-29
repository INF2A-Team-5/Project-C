import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface TableProps {
  data: { [key: string]: any }[];
  displayColumns: string[];
  dataColumns: string[];
}

function NewTable({ data, displayColumns, dataColumns }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = () => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return [...data];
  };

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentData = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / 10);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  function handleButtonClick(id: number) {
    alert(id);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {displayColumns.map((column, index) => (
              <th key={index} onClick={() => handleSort(column)}>
                {column}{" "}
                {sortColumn === column &&
                  (sortDirection === "asc" ? (
                    <ArrowDownIcon />
                  ) : (
                    <ArrowUpIcon />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {dataColumns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column]}</td>
              ))}
              <td>
                <button onClick={() => handleButtonClick(row.ticketId)}>
                  Click me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NewTable;
