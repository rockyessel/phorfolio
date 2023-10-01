import { AboutMe, User } from '@/interface';

export const contactTemp = (
  message: string,
  receiver: User,
  sender: { name: string; email: string },
  aboutMeData: AboutMe | undefined,
  baseURL: string
) => {
  const { name } = receiver;
  const instagram_url = aboutMeData?.instagram_url;
  const x_url = aboutMeData?.x_url;
  const youtube_url = aboutMeData?.youtube_url;
  const facebook_url = aboutMeData?.facebook_url;
  const linkedin_url = aboutMeData?.linkedin_url;

  return `
    <!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      <style type="text/css">
         @media only screen and (min-width: 620px) {
         .u-row {
         width: 600px !important;
         }
         .u-row .u-col {
         vertical-align: top;
         }
         .u-row .u-col-100 {
         width: 600px !important;
         }
         }
         @media (max-width: 620px) {
         .u-row-container {
         max-width: 100% !important;
         padding-left: 0px !important;
         padding-right: 0px !important;
         }
         .u-row .u-col {
         min-width: 320px !important;
         max-width: 100% !important;
         display: block !important;
         }
         .u-row {
         width: 100% !important;
         }
         .u-col {
         width: 100% !important;
         }
         .u-col > div {
         margin: 0 auto;
         }
         }
         body {
         margin: 0;
         padding: 0;
         }
         table,
         tr,
         td {
         vertical-align: top;
         border-collapse: collapse;
         }
         p {
         margin: 0;
         }
         .ie-container table,
         .mso-container table {
         table-layout: fixed;
         }
         * {
         line-height: inherit;
         }
         a[x-apple-data-detectors='true'] {
         color: inherit !important;
         text-decoration: none !important;
         }
         @media (max-width: 480px) {
         .hide-mobile {
         max-height: 0px;
         overflow: hidden;
         display: none !important;
         }
         }
         table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_text_2 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_menu_1 .v-padding { padding: 5px 10px !important; } }
      </style>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
      <!--<![endif]-->
   </head>
   <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
            <tr style="vertical-align: top">
               <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                     <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                           <div style="background-color: #f7f7f8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                 <!--<![endif]-->
                                 <table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                       <tr>
                                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 50px 30px;font-family:'Raleway',sans-serif;" align="left">
                                             <div style="font-size: 14px; color: #212131; line-height: 140%; text-align: justify; word-wrap: break-word;">
                                                <p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 22.4px;"><strong>Hello ${name}</strong></span></p>
                                                <p style="line-height: 140%; font-size: 14px;"> </p>
                                                <p style="line-height: 140%; font-size: 14px;">${message}</p>
                                                <p style="line-height: 140%; font-size: 14px;"> </p>
                                                <p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px; font-family: 'Open Sans', sans-serif;"><strong><span style="font-size: 14px; line-height: 19.6px;">Date: {{date}}</span></strong></span></p>
                                             </div>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                                 <table id="u_content_text_3" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tbody>
                                       <tr>
                                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 40px 50px;font-family:'Raleway',sans-serif;" align="left">
                                             <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><strong>Sender Information:</strong></span></p>
                                                <p style="font-size: 14px; line-height: 140%;">Name: ${sender.name}</p>
                                                <p style="font-size: 14px; line-height: 140%;">E-mail: ${sender.email}</p>
                                             </div>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                           <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                 <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                    <!--<![endif]-->
                                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Raleway',sans-serif;" align="left">
                                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                   <tbody>
                                                      <tr style="vertical-align: top">
                                                         <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <span>&#160;</span>
                                                         </td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
                                                <div align="center">
                                                   <div style="display: table; max-width:140px;">
                                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                         <tbody>
                                                            <tr style="vertical-align: top">
                                                               <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                  <a href="${facebook_url}" title="Facebook" target="_blank">
                                                                  <img src="https://filestourl.vercel.app/socials/facebook.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                  </a>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                         <tbody>
                                                            <tr style="vertical-align: top">
                                                               <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                  <a href="${youtube_url}" title="YouTube" target="_blank">
                                                                  <img src="https://filestourl.vercel.app/socials/youtube.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                  </a>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                         <tbody>
                                                            <tr style="vertical-align: top">
                                                               <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                  <a href="${linkedin_url}" title="LinkedIn" target="_blank">
                                                                  <img src="https://filestourl.vercel.app/socials/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                  </a>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                         <tbody>
                                                            <tr style="vertical-align: top">
                                                               <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                  <a href="${instagram_url}" title="Instagram" target="_blank">
                                                                  <img src="https://filestourl.vercel.app/socials/instagram.avif" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                  </a>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                         <tbody>
                                                            <tr style="vertical-align: top">
                                                               <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                  <a href="${x_url}" title="X" target="_blank">
                                                                  <img src="https://filestourl.vercel.app/socials/twitter.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                  </a>
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <table id="u_content_menu_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
                                                <div class="menu" style="text-align:center">
                                                   <a href="https://${baseURL}" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding">
                                                   Home
                                                   </a>
                                                   <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding hide-mobile">
                                                   |
                                                   </span>
                                                   <a href="https://${baseURL}/proejcts" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding">
                                                   Projects
                                                   </a>
                                                   <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding hide-mobile">
                                                   |
                                                   </span>
                                                   <a href="https://${baseURL}/articles" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding">
                                                   Articles
                                                   </a>
                                                   <span style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;" class="v-padding hide-mobile">
                                                   |
                                                   </span>
                                                   <a href="https://${baseURL}/resume" target="_blank" style="padding:5px 15px;display:inline-block;color:#000000;font-size:14px;text-decoration:none"  class="v-padding">
                                                   Resume
                                                   </a>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>
    `;
};