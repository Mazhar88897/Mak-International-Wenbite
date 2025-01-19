"use client";

import React from "react";
import AWS from "aws-sdk";

const TestPage = () => {
  const handleSendEmail = async () => {
    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: "AKIAVIMMZLH3BTHFTKMK", // Replace with env vars in production
      secretAccessKey: "BDsJw26hIA6Bm6QBX7xk+vQdAc1ZODMOYtpADd4HDUKv",
      region: "us-east-1", // Ensure this matches your SES setup
    });

    const ses = new AWS.SES({ apiVersion: "2010-12-01" });

    const recipientEmail = "mk0906145@gmail.com"; // Replace with your recipient
    const subject = "Test Email from React";
    const body =
      "Hello! This is a test email sent from a React application using AWS SES.";

    const params = {
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },
        Subject: { Data: subject },
      },
      Source: "no-reply@traino.ai", // Must be a verified email
    };

    try {
      const data = await ses.sendEmail(params).promise();
      console.log("Email sent successfully:", data);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  return (
    <div>
      <h1>Send Email with AWS SES</h1>
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default TestPage;

//   region: "us-east-1",
