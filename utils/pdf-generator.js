/**
 * Utility function to generate a PDF receipt with static data hardcoded
 * and downloads it directly without opening a print dialog
 *
 * @param {Object} transaction - The transaction data (will be expanded in the future)
 * @param {string} transaction.date - The payment date
 * @param {string} transaction.paymentMethod - The payment method used
 * @param {string} transaction.transactionId - The transaction ID
 * @param {number} transaction.amount - The transaction amount
 */
export function generateReceiptPDF(transaction) {
  // Static data - hardcoded for now
  const staticData = {
    // Sender information
    sender: {
      name: "Adtech Agency FZ - LLC",
      address1: "DMC-BLD05-VD-G00-667, Ground Floor, DMC5, Dubai",
      address2: "Media City, Dubai, United Arab Emirates",
      vatNumber: "100489163400003",
    },
    // Recipient information
    recipient: {
      name: "String Fintech HK Limited",
      address1: "UNIT 1307A, 13/F, TWO HARBOURFRONT, 22 TAK",
      address2: "FUNG STREET, HUNG HOM, HONG KONG, Hong Kong",
      vatNumber: "",
    },
    // Service description
    service: "Online advertising services",
    // Account information
    accountInfo: "*****************************TpJsP",
  }

  // Create a canvas element to draw our PDF content
  const canvas = document.createElement("canvas")
  canvas.width = 595 // A4 width in pixels at 72 DPI
  canvas.height = 842 // A4 height in pixels at 72 DPI
  const ctx = canvas.getContext("2d")

  // Set white background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set text styles
  ctx.fillStyle = "#000000"
  ctx.font = "bold 16px Arial"

  // Draw header
  ctx.fillText("Payment Receipt", 40, 50)

  // Draw logo
  ctx.fillStyle = "#333366"
  ctx.font = "bold 20px Arial"
  ctx.fillText("mon", 500, 50)
  ctx.fillStyle = "#99cc33"
  ctx.fillText("$", 535, 50)
  ctx.fillStyle = "#333366"
  ctx.fillText("tag", 545, 50)

  // Reset font
  ctx.font = "12px Arial"
  ctx.fillStyle = "#000000"

  // Draw payment details (right-aligned)
  ctx.textAlign = "right"
  ctx.fillText(`Payment date: ${transaction.date}`, 555, 80)
  ctx.fillText(`Payment method: ${transaction.paymentMethod}`, 555, 100)
  ctx.fillText(`Payment number: ${transaction.transactionId}`, 555, 120)

  // Reset text alignment
  ctx.textAlign = "left"

  // Draw FROM section
  ctx.font = "bold 12px Arial"
  ctx.fillText("FROM:", 40, 150)
  ctx.font = "12px Arial"
  ctx.fillText(`Name: ${staticData.sender.name}`, 40, 170)
  ctx.fillText(`Address: ${staticData.sender.address1}`, 40, 190)
  ctx.fillText(staticData.sender.address2, 40, 210)
  ctx.fillText(`VAT Number: ${staticData.sender.vatNumber}`, 40, 230)

  // Draw TO section
  ctx.font = "bold 12px Arial"
  ctx.fillText("TO:", 40, 260)
  ctx.font = "12px Arial"
  ctx.fillText(`Name: ${staticData.recipient.name}`, 40, 280)
  ctx.fillText(`Address: ${staticData.recipient.address1}`, 40, 300)
  ctx.fillText(staticData.recipient.address2, 40, 320)
  ctx.fillText(`VAT Number: ${staticData.recipient.vatNumber}`, 40, 340)

  // Draw table
  // Table header
  ctx.strokeStyle = "#000000"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.rect(40, 370, 360, 30) // Description cell
  ctx.rect(400, 370, 155, 30) // Amount cell
  ctx.stroke()

  // Fill header background
  ctx.fillStyle = "#f2f2f2"
  ctx.fillRect(40, 370, 360, 30)
  ctx.fillRect(400, 370, 155, 30)

  // Header text
  ctx.fillStyle = "#000000"
  ctx.font = "bold 12px Arial"
  ctx.fillText("Description", 50, 390)
  ctx.textAlign = "right"
  ctx.fillText("SUM, USD", 545, 390)
  ctx.textAlign = "left"

  // Table row
  ctx.beginPath()
  ctx.rect(40, 400, 360, 30) // Description cell
  ctx.rect(400, 400, 155, 30) // Amount cell
  ctx.stroke()

  // Row text
  ctx.font = "12px Arial"
  ctx.fillText(staticData.service, 50, 420)
  ctx.textAlign = "right"
  ctx.fillText(transaction.amount.toFixed(2), 545, 420)
  ctx.textAlign = "left"

  // Total row
  ctx.beginPath()
  ctx.rect(40, 430, 360, 30) // Description cell
  ctx.rect(400, 430, 155, 30) // Amount cell
  ctx.stroke()

  // Total text
  ctx.font = "bold 12px Arial"
  ctx.fillText("Total:", 50, 450)
  ctx.textAlign = "right"
  ctx.fillText(transaction.amount.toFixed(2), 545, 450)
  ctx.textAlign = "left"

  // Payment details
  ctx.font = "bold 12px Arial"
  ctx.fillText("Payment details:", 40, 490)
  ctx.font = "12px Arial"
  ctx.fillText(`Account: ${staticData.accountInfo}`, 40, 510)

  // Convert canvas to image data URL
  const imageData = canvas.toDataURL("image/jpeg", 1.0)

  // Create PDF using minimal PDF structure with embedded JPEG
  const pdfContent = createPDFWithImage(imageData)

  // Create a Blob with the PDF content
  const blob = new Blob([pdfContent], { type: "application/pdf" })

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob)

  // Create a temporary link element
  const link = document.createElement("a")
  link.href = url
  link.download = `receipt-${transaction.transactionId}.pdf`

  // Append the link to the body
  document.body.appendChild(link)

  // Trigger the download
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Helper function to create a PDF with an embedded image
function createPDFWithImage(imageData) {
  // Remove the data URL prefix
  const jpegData = atob(imageData.split(",")[1])

  // Convert JPEG data to binary
  const jpegLength = jpegData.length
  const bytes = new Uint8Array(jpegLength)
  for (let i = 0; i < jpegLength; i++) {
    bytes[i] = jpegData.charCodeAt(i)
  }

  // Create a minimal PDF structure with the JPEG image
  const pdfHeader = "%PDF-1.4\n"

  // Object 1: Catalog
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"

  // Object 2: Pages
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"

  // Object 3: Page
  const obj3 =
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /XObject << /Im0 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>\nendobj\n"

  // Object 4: Image
  const obj4 = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width 595 /Height 842 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`

  // Object 5: Content stream
  const obj5 = "5 0 obj\n<< /Length 44 >>\nstream\nq\n595 0 0 842 0 0 cm\n/Im0 Do\nQ\nendstream\nendobj\n"

  // Create xref table
  const xrefPosition =
    pdfHeader.length + obj1.length + obj2.length + obj3.length + obj4.length + bytes.length + 10 + obj5.length
  const xref = `xref\n0 6\n0000000000 65535 f\n0000000010 00000 n\n0000000074 00000 n\n0000000139 00000 n\n0000000262 00000 n\n${(pdfHeader.length + obj1.length + obj2.length + obj3.length + obj4.length + bytes.length + 10).toString().padStart(10, "0")} 00000 n\n`

  // Create trailer
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`

  // Combine all parts
  const pdfContent = pdfHeader + obj1 + obj2 + obj3 + obj4

  // Create a Uint8Array for the final PDF
  const finalPdfArray = new Uint8Array(
    pdfContent.length + bytes.length + 10 + obj5.length + xref.length + trailer.length,
  )

  // Fill the array with the PDF content
  for (let i = 0; i < pdfContent.length; i++) {
    finalPdfArray[i] = pdfContent.charCodeAt(i)
  }

  // Add the JPEG data
  for (let i = 0; i < bytes.length; i++) {
    finalPdfArray[pdfContent.length + i] = bytes[i]
  }

  // Add the stream end and object 5
  const streamEnd = "\nendstream\nendobj\n"
  for (let i = 0; i < streamEnd.length; i++) {
    finalPdfArray[pdfContent.length + bytes.length + i] = streamEnd.charCodeAt(i)
  }

  // Add object 5
  for (let i = 0; i < obj5.length; i++) {
    finalPdfArray[pdfContent.length + bytes.length + streamEnd.length + i] = obj5.charCodeAt(i)
  }

  // Add xref and trailer
  const xrefAndTrailer = xref + trailer
  for (let i = 0; i < xrefAndTrailer.length; i++) {
    finalPdfArray[pdfContent.length + bytes.length + streamEnd.length + obj5.length + i] = xrefAndTrailer.charCodeAt(i)
  }

  return finalPdfArray
}
