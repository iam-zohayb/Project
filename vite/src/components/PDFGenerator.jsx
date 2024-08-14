import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = ({ formData, passengers }) => {
  const pdfRef = React.createRef();

  const generatePDF = async () => {
    const doc = new jsPDF();
    const content = pdfRef.current;

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');

    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('form_data.pdf');
  };

  return (
    <div>
      <div ref={pdfRef}>
        <h1 className="centered-heading">تفاصيل برنامج التشغيل</h1>
        {/* Add other form details here */}
      </div>
      <button onClick={generatePDF}>تحميل PDF</button>
    </div>
  );
};

export default PDFGenerator;
