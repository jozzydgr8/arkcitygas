import { Button } from "antd";
import Papa from "papaparse";
import { UseDataContext } from "../../context/UseDataContext";
import { formatDateHook } from "../Hooks/FormatDateHook";

export const DownloadCSVButton = () => {
  const { combined, total } = UseDataContext();

  const handleDownload = () => {
    if (!combined || combined.length === 0) {
      alert("No readings available to export.");
      return;
    }

    // Map your combined data to a clean CSV format
    const csvData = combined.map((item) => ({
      Date: formatDateHook(item.date),
      Type: item.type,
      "Units Sold": item.unitSold ?? "-",
      "Amount Added": item.amountAdded ?? "-",
      "Balance After": item.balanceAfter,
    }));

    // ✅ Append total row at the end
    const totalBalance = total?.[0]?.currentBalance ?? 0;

    csvData.push({
      Date: "TOTAL",
      Type: "" as any,
      "Units Sold": "",
      "Amount Added": "",
      "Balance After": totalBalance,
    });

    // Convert to CSV string
    const csv = Papa.unparse(csvData);

    // Create blob + link for download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "reading-history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} type="primary" style={{ marginTop: 20 }}>
      Download as CSV
    </Button>
  );
};
