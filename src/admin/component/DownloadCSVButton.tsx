import { Button } from "antd";
import { demoReadings } from "../../data";
import Papa from "papaparse";

export const DownloadCSVButton = () => {
  const handleDownload = () => {
    const csv = Papa.unparse(demoReadings);
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
