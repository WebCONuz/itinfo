const nodemailer = require("nodemailer");
const config = require("config");

class MailServices {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }
  async sendActivationMail(toEmail, link) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "ITINFO accountini faollashtirish",
      text: "",
      html: `
            <div> 
                <h1>Faollashtirish uchun bosing</h1>
                <a href="${link}">${link}</a>
            </div>
        `,
    });
  }
  async sendNewPass(toEmail, nPass) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: nPass,
      text: "",
      html: `
            <div> 
                <h1>Yangi Parolingiz: ${nPass}</h1>
            </div>
        `,
    });
  }
}

module.exports = new MailServices();
