import sgMail from '@sendgrid/mail'

const {
  SEND_GRID_API_KEY,
  SEND_GRID_EMAIL
} = process.env

sgMail.setApiKey(SEND_GRID_API_KEY)

/**
 * Send email using sendgrid
 * @param {String} toEmail : email address
 * @param {String} templateID : Send Grid dynamic email template
 * @param {Object} dynamicData : Object of dynamic data
 * @returns email send response
 */
const sendEmail = async (toEmail, templateID, dynamicData = {}) => {
  const sendRes = await sgMail.send({
    to: toEmail,
    from: SEND_GRID_EMAIL,
    dynamic_template_data: dynamicData,
    template_id: templateID
  })

  return sendRes
}

export default sendEmail
