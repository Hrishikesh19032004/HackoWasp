import React, { useRef } from "react";
import logo from "./globe.png";
import "./certificate.css";
import html2pdf from "html2pdf.js"; // Ensure html2pdf.js is correctly imported

export const MyPlugin = ({ organizationName }) => {
  const certificateRef = useRef(); // Create a ref for the certificate container

  const handleDownload = () => {
    if (certificateRef.current) {
      console.log("Certificate ref is set, generating PDF...");

      const options = {
        margin: 10,
        filename: `${organizationName}_Donation_Certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Generate the PDF from the ref content
      html2pdf()
        .from(certificateRef.current)
        .set(options)
        .save()
        .then(() => {
          console.log("PDF saved!");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error("Certificate ref is not set!");
    }
  };

  return (
    <div id="webcrumbs" ref={certificateRef}>
      <div className="w-[800px] bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="font-title text-5xl font-bold text-[#197b3e] mb-2">
            CERTIFICATE
          </h1>
          <h2 className="font-title text-2xl font-bold tracking-wide text-[#197b3e]">
            OF DONATION
          </h2>
          <p className="text-neutral-700 mt-4">WE WOULD LIKE TO ACKNOWLEDGE</p>
          <h2 className="text-2xl font-bold italic text-[#1aa14b] my-2">
            Donors Name
          </h2>
          <hr className="border-[#197b3e] w-2/3 mx-auto my-4" />
          <p className="text-neutral-700">
            ON BEHALF OF   (<span className="italic">{organizationName}</span>)   FOR
            DONATING FOOD TO THE FOLLOWING ORGANIZATION
          </p>
          <h3 className="text-lg font-bold mt-4 text-[#197b3e]">
          {organizationName}
          </h3>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-700">MAY 12/22</p>
          </div>

          <div>
            <img
              src={logo}
              alt="Seal"
              className="w-[80px] h-[80px] object-contain"
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-neutral-700">AaherSetu</p>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "16px",
          backgroundColor: "#4caf50",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};
