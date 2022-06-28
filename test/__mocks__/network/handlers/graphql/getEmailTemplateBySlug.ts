import { graphql } from 'msw';

export const getEmailTemplateBySlug = graphql.query(
  'GetEmailTemplateBySlug',
  (_, res, ctx) => {
    return res(
      ctx.data({
        email_templates: [
          {
            template:
              '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width" />\n    <title>contact us</title>\n    <style></style>\n  </head>\n\n  <body>\n    <div id="email" style="width: 600px">\n      Hi,\n      <br />\n      <br />\n      Someone as reached out from\n      <a href="https://churchinsydney.org">churchinsydney.org</a>\n      <br />\n      <br />\n\n      <table role="presentation" border="0" cellspacing="0" width="100%">\n        <tr>\n          <td>Name</td>\n          <td>_NAME_</td>\n        </tr>\n        <tr>\n          <td>Phone</td>\n          <td>_PHONE_</td>\n        </tr>\n        <tr>\n          <td>Email</td>\n          <td>_EMAIL_</td>\n        </tr>\n      </table>\n\n      <table role="presentation" border="0" cellspacing="0" width="100%">\n        <tr>\n          <td>Message</td>\n        </tr>\n        <tr>\n          <td>_MESSAGE_</td>\n        </tr>\n      </table>\n    </div>\n  </body>\n</html>',
          },
        ],
        settings: [
          {
            toEmail: 'itsupport@churchinsydney.org',
          },
        ],
      })
    );
  }
);
