import sgMail from '@sendgrid/mail'

const {
  SEND_GRID_API_KEY,
  SEND_GRID_EMAIL,
  SEND_GRID_TEMPLATE_WELCOME
} = process.env

sgMail.setApiKey(SEND_GRID_API_KEY)

const sendEmail = async (toEmail) => {
  const sendRes = await sgMail.send({
    to: toEmail,
    from: SEND_GRID_EMAIL,
    dynamic_template_data: {
      toEmail
    },
    template_id: SEND_GRID_TEMPLATE_WELCOME
  })

  console.log(`Email sent to ${toEmail}`)

  return sendRes
}

export default sendEmail
