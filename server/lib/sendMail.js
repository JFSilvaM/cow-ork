const {
  MAILJET_API_KEY,
  MAILJET_API_SECRET,
  MAILJET_SENDER_NAME,
  MAILJET_SENDER_EMAIL,
} = process.env;

const fs = require("fs").promises;
const Mailjet = require("node-mailjet");

const sendMail = async (subject, templateContent, template) => {
  try {
    const mailjetTransporter = new Mailjet({
      apiKey: MAILJET_API_KEY,
      apiSecret: MAILJET_API_SECRET,
    });

    const fileTemplate = await fs.readFile(
      `${__dirname}/../templates/${template}.html`,
      "utf8"
    );

    const htmlPart = Object.keys(templateContent).reduce(
      (acc, key) => acc.replace(`{{${key}}}`, templateContent[key]),
      fileTemplate
    );

    await mailjetTransporter.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: MAILJET_SENDER_EMAIL,
            Name: MAILJET_SENDER_NAME,
          },
          To: [
            {
              Email: templateContent.email,
              Name: templateContent.fullName,
            },
          ],
          Subject: subject,
          TextPart: subject,
          HTMLPart: htmlPart,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
