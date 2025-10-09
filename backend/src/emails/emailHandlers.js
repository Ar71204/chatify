import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, userName, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(userName, clientURL)
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
  } catch (err) {
    console.error("Error in sendWelcomeEmail:", err.message);
    throw err;
  }
};
