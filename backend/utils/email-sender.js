const nodemailer = require("nodemailer");

const SendEmail = async (email, password, url) => {
  // Generate test SMTP service account from ethereal.email
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sandra78@ethereal.email",
      pass: "J8vWQMtvjNT36D3AkM",
    },
  });

  const mailOptions = {
    from: "adithya@interview.com",
    to: email,
    subject: "TEMPORARY LOGIN CREDENTIALS FOR ABC SYSTEM",
    text: "Hello,",
    html: `<h2>ABC System Registration</h2>
            <br>
            <p>Your account registration has partially completed.</p>
            <p>Please use below credentials to complete the registration process.</p>
            <h5> Email : ${email} </h5>
            <h5> Temporary Password : ${password} </h5>
            <h5> Login URL : <a href=${url}>Click here to login!</a></h5>`,
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = SendEmail;
