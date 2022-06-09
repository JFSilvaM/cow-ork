const {
  MAILJET_API_KEY,
  MAILJET_API_SECRET,
  MAILJET_SENDER_NAME,
  MAILJET_SENDER_EMAIL,
} = process.env;

const fs = require("fs").promises;
const mailjet = require("node-mailjet").connect(
  MAILJET_API_KEY,
  MAILJET_API_SECRET
);

const sendMail = async (subject, templateContent, template) => {
  try {
    const fileTemplate = await fs.readFile(
      `${__dirname}/../templates/${template}.html`,
      "utf8"
    );

    const htmlPart = Object.keys(templateContent).reduce(
      (acc, key) => acc.replace(`{{${key}}}`, templateContent[key]),
      fileTemplate
    );

    await mailjet.post("send").request({
      Messages: [
        {
          FromEmail: MAILJET_SENDER_EMAIL,
          FromName: MAILJET_SENDER_NAME,
          Subject: subject,
          "HTML-Part": htmlPart,
          Recipients: [{ Email: templateContent.email }],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
