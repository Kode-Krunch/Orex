import appConfig from "configs/app.config";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { openNotification } from "views/Controls/GLOBALFUNACTION";
const { apiPrefix } = appConfig;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const emailSend = async (fileBlob, isList, fileName, rows) => {
    console.log(rows[0].Address2);

    if (isList) {
        if (!(fileBlob instanceof Blob)) {
            console.error("❌ Error: Provided file is not a Blob.");
            return;
        }
        // Convert Blob to Base64
        const base64Data = await convertBlobToBase64(fileBlob);
        sendEmailRequest(base64Data, isList, fileName, rows);
    } else {
        sendEmailRequest(fileBlob, isList, fileName, rows);
    }
};

const sendEmailRequest = (fileData, isList, fileName, rows) => {
    fetch(`${apiPrefix}/globle/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: rows[0].Address2,
            subject: "Your PDF/ZIP Report",
            text: "Here is your file!",
            pdfName: fileName,
            isList,
            pdf: fileData, // Base64 for ZIP, or direct for PDF
        }),
    })
        .then((response) => response.text())
        .then((data) => openNotification("success", data))
        .catch((error) => openNotification("danger", error));
};

// Convert Blob to Base64 for ZIP files
const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        if (!(blob instanceof Blob)) {
            reject("Provided data is not a Blob.");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // Remove "data:application/zip;base64,"
        reader.onerror = reject;
    });
};

export { emailSend }