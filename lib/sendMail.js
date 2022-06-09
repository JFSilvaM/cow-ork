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
    let fileTemplate = await fs.readFile(
      `${__dirname}/../templates/${template}.html`,
      "utf8"
    );

    for (const key in templateContent) {
      fileTemplate = fileTemplate.replace(`{{${key}}}`, templateContent[key]);
    }

    console.log(fileTemplate);

    return;

    await mailjet.post("send").request({
      Messages: [
        {
          FromEmail: MAILJET_SENDER_EMAIL,
          FromName: MAILJET_SENDER_NAME,
          Subject: subject,
          "HTML-Part": fileTemplate,
          Recipients: [{ Email: content.email }],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
