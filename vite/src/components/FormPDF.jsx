// vite/src/components/FormPDF.jsx
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

// Set the workerSrc for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FormPDF = ({ match }) => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        // Correctly format the URL string
        const response = await axios.get(`http://localhost:5000/api/forms/${match.params.id}/pdf`, {
          responseType: 'blob',
        });
        const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        setPdfData(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPDF();
  }, [match.params.id]);

  return (
    <div>
      {pdfData ? (
        <Document file={pdfData}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FormPDF;
