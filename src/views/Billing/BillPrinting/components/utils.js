import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import appConfig from 'configs/app.config';
import { formatDateToDDMMMYYYY, openNotification } from "views/Controls/GLOBALFUNACTION";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { apiPrefix } = appConfig;

const emailSend = async (fileBlob, isList, fileName, rows, channel) => {
    try {
        if (!(fileBlob instanceof Blob || fileBlob instanceof File)) {
            console.error("❌ Provided file is not a valid Blob or File.");
            openNotification("error", "Invalid file format. Cannot send email.");
            return;
        }

        await sendEmailRequest(fileBlob, isList, fileName, rows, channel);
    } catch (error) {
        console.error("❌ Email send failed:", error);
        openNotification("error", error.message || "Unexpected error occurred.");
    }
};

const sendEmailRequest = async (fileBlob, isList, fileName, rows, channel) => {
    try {
        const formData = new FormData();

        formData.append("to", rows[0].Address2);
        formData.append(
            "subject",
            `${channel.label} - Ads Sales Invoices - ${formatDateToDDMMMYYYY(new Date())}`
        );
        formData.append("channel", JSON.stringify(channel));

        // Determine MIME type from extension
        const fileExt = fileName.split(".").pop().toLowerCase();
        let mimeType = "application/octet-stream";
        if (fileExt === "pdf") mimeType = "application/pdf";
        else if (fileExt === "zip") mimeType = "application/zip";

        const file = new File([fileBlob], fileName, { type: mimeType });
        formData.append("file", file);

        const response = await fetch(`${apiPrefix}/globle/send-email`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            openNotification("success", result.status || "Email sent successfully");
        } else {
            openNotification("error", result.detail || "Failed to send email");
        }
    } catch (error) {
        console.error("❌ Error sending email request:", error);
        openNotification("error", error.message || "Unexpected error occurred");
    }
};

export { emailSend }