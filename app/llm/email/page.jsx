"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function SendEmail() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await emailjs.send(
        "service_t8srnau",
        "template_dpsymob",
        {
          to_name: "Mazhar",
          to_email: "mk0906145@gmail.com",
        },
        "yD2XGJhCWpvQvaZIR"
      );
      alert("Email sent successfully!");
      console.log("Success:", response.status, response.text);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Send Email with EmailJS</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <button
          type="submit"
          disabled={isSending}
          style={{
            padding: "10px 20px",
            backgroundColor: isSending ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isSending ? "not-allowed" : "pointer",
          }}
        >
          {isSending ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
}
