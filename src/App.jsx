import { Html5QrcodeScanner } from "html5-qrcode";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [partNo, setPartNo] = useState("");
  const [serialNo, setSerialNo] = useState("");

  useEffect(() => {
    if (scanResult) return;

    const success = (result) => {
      scanner.clear();
      setScanResult(result);
      const splittedRes = result.split(" ");
      setPartNo(splittedRes[0]);
      setSerialNo(splittedRes[splittedRes.length - 1]);
    };

    const error = (err) => {
      console.warn(err);
    };

    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success, error);
  }, [scanResult]);

  return (
    <div>
      <h1>QR code scanner</h1>
      {scanResult ? (
        <div>
          <h3>Product Details</h3>
          <p>Part No: {partNo}</p>
          <p>Serial No: {serialNo}</p>
          <br />
          <button onClick={() => setScanResult(null)}>Refresh</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default App;
