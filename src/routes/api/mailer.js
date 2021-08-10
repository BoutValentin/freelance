import { UserEmail } from "/src/utils/mailvalidator";
import nodemailer from 'nodemailer';
import { MAILERSEND_API_KEY, MAILERSEND_FROM_EMAIL_REP, MAILER_FROM_EMAIL, MAILER_TO_EMAIL, STMP_AUTH_MDP, STMP_AUTH_USER, STMP_HOST, STMP_PORT } from "$lib/env";

export async function post(request) {
    const {name, email, subject, content, nh, lang} = request.body;
    const user = new UserEmail(name, email, subject, content, nh);

    let status = 200;
    let success = true;
    let msg = "OK";
    let error = [];

    if (user.as_empty_value() || user.check_honeypot()) {
        status = 401;
        success = false;
        msg = 'Bad request',
        error = [...error, ...user.retrieve_error_message(), ...user.check_email_error()];
    }

    if (success) {
        const transporter = nodemailer.createTransport({
            host: STMP_HOST,
            port: STMP_PORT,
            secure: false, 
            auth: {
              user: STMP_AUTH_USER,
              pass: STMP_AUTH_MDP,
            },
          });
        const pr = await transporter.sendMail({
            from: `${user.email.replace('@', '.at.')}.${MAILER_FROM_EMAIL}`,
            to: MAILER_TO_EMAIL,
            subject: `FREELANCE: Demande de renseignement`,
            text: `from: ${user.email}, subject: ${user.subject}, content: ${user.content}`,
            html: `from: ${user.email}, subject: ${user.subject}, content: <pre>${user.content}</pre>`
        })
        // We check if any error append when we deliver the email
        if (pr.err) {
            status = 500,
            success = false;
            msg = 'Mailer service unavailable'
            error = [ ...error, "mailer_unavailable"]
        } else {
            fetch('https://api.mailersend.com/v1/email', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: {
                        email: MAILERSEND_FROM_EMAIL_REP
                    },
                    to: [
                        {
                            email: user.email
                        }
                    ],
                    subject: lang == 'en' ? "From Valentin BOUT: Thanks for the contact !" : "De Valentin BOUT: Merci de m'avoir contacté",
                    personalization: [
                        {
                        email: user.email,
                        data: {
                            lang: lang,
                            email: user.email,
                            name: name,
                            subject: user.subject,
                            content: user.content
                        }
                    }
                      ],
                      template_id: "351ndgwyeqlzqx8k",

                })
            })
        }
    }
   
    return {
        status,
        body: {
            success,
            msg,
            error
        }
    }
}