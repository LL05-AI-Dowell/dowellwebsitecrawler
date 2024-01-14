/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { LuMailCheck } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";

const WebInfo = ({ data, page, email,formValues }) => {
  const EMAIL_FROM_WEBSITE = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DoWell Website Crawler</title>
    </head>
    <body
      style="
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
      "
    >
      <div style="width: 100%; background-color: #ffffff;">
        <header
          style="
            color: #fff;
            display: flex;
            text-align: center;
            justify-content: center;
            padding: 5px;
          "
        >
          <img
            src="https://dowellfileuploader.uxlivinglab.online/hr/logo-2-min-min.png"
            height="140px"
            width="140px"
            style="display: block; margin: 0 auto;"
          />
        </header>
        <article style="margin-top: 20px; text-align: center;">
          <h2>DoWell Web Crawler</h2>
        </article>

        <main style="padding: 20px;">
          <section style="margin: 20px;">
            <p style="font-weight: bold; font-size: 14px;">Detailed information</p>
            <ul style="font-size: 14px;">
              ${formValues.name ? `<li>Company Name: ${
                data?.company_name ? data.company_name : "None Found"
              }</li>`:''}
              <li>Website Url: <a href="${data?.website_url}">${
    data?.website_url
  }</a></li>
  ${formValues.phone_numbers ?`<li>
                Phone Numbers:<br />
                ${
                  data?.meta_data?.phone_numbers?.length > 0
                    ? `<ol>${data?.meta_data?.phone_numbers
                        .map((no, index) => `<li key=${index}>${no}</li>`)
                        .join("")}</ol>`
                    : "None Found"
                }
              </li>`:''}
              
       ${formValues.emails ?`<li>
                Emails:<br />
                ${
                  data?.meta_data?.emails?.length > 0
                    ? `<ol>${data?.meta_data?.emails
                        .map((email, index) => `<li key=${index}>${email}</li>`)
                        .join("")}</ol>`
                    : "None Found"
                }
              </li>`:''}
              ${formValues.addresses ?`<li>
                Addresses:<br />
                ${
                  data?.meta_data?.addresses != null
                    ? `<ol>${data?.meta_data?.addresses
                        .map(
                          (address, index) => `<li key=${index}>${address}</li>`
                        )
                        .join("")}</ol>`
                    : "None Found"
                }
              </li>`:''}

             ${formValues.social_media_all ? `<li>
                Social Media Links:<br />
                ${
                  data?.meta_data?.social_media_links &&
                  Object?.keys(data?.meta_data?.social_media_links)
                    ?.map(
                      (socialMedia, index) =>
                        data?.meta_data?.social_media_links[socialMedia] &&
                        `<p key=${index}>${
                          socialMedia.charAt(0).toUpperCase() +
                          socialMedia.slice(1)
                        }: <a href="${
                          data?.meta_data?.social_media_links[socialMedia]
                        }">${
                          data?.meta_data?.social_media_links[socialMedia]
                        }</a></p>`
                    )
                    .join("")
                }
              </li>`:''}
            ${formValues.links ? `<li>
                Other Links:<br />
                ${
                  data?.meta_data?.links > 0
                    ? `<ol>${data?.meta_data?.links
                        .map(
                          (link, index) =>
                            `<li key=${index}><a href="${link}">${link}</a></li>`
                        )
                        .join("")}</ol>`
                    : "None Found"
                }
              </li>`:''}
           ${formValues.logos ? `<li>
                Logos:<br />
                ${
                  data?.logos?.length > 0
                    ? `<ol>${data?.logos
                        .map(
                          (logo, index) =>
                            `<li><a href="${logo}" key=${index}>${logo}</a></li>`
                        )
                        .join("")}</ol>`
                    : "No Logos Found"
                }
              </li>`:''}
            </ul>
            <div style="margin: 20px;">
              <p>DoWell UX Living Lab Team</p>
            </div>
          </section>
        </main>

        <footer
          style="
            background-color: #005733;
            color: #fff;
            text-align: center;
            padding: 10px;
          "
        >
          <a
            href="https://www.uxlivinglab.org/"
            style="
              text-align: center;
              color: white;
              margin-bottom: 20px;
              padding-bottom: 10px;
            "
          >DoWell UX Living Lab</a>
          <p style="margin-top: 10px; font-size: 13px;">
            &copy; 2023-All rights reserved.
          </p>
        </footer>
      </div>
    </body>
  </html>
`;

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/email/`,
        {
          toname: "Dowell UX Living Lab",
          toemail: email,
          subject: `${email} result from DoWell Website Crawler on ${new Date()}`,
          email_content: EMAIL_FROM_WEBSITE
        }
      );

      setEmailSent(true);
      // Set the emailSent state to true when the email is sent
      console.log("success", response.success);
      console.log("success", response.message);

      if (response.success == true) {
        setEmailSent(true);
        setLoading(false);
        toast.success(response?.message);
      }

      if (response.success == false) {
        setEmailSent(false);
        toast.error(response?.message);
      }

      setLoading(false);
      console.log(response);
    } catch (error) {
      setEmailSent(false);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="1">
        <Accordion.Header>{page} page web Information</Accordion.Header>
        <Accordion.Body>
          <Card>
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>

             {formValues.name && 
              <>
             <Card.Subtitle>Company Name</Card.Subtitle>
              <Card.Text>
                {data?.company_name ? data?.company_name : "None Found"}
              </Card.Text>
              </>
              }
              {formValues.web_url && <>
                <Card.Subtitle>Website</Card.Subtitle>
                 <Card.Text>
                    <a href={data?.website_url}>{data?.website_url}</a>
               </Card.Text>
              
              </>}
             
              {formValues.phone_numbers && <>

              <Card.Subtitle>Phone Numbers</Card.Subtitle>
              <Card.Text>
                {data?.meta_data?.phone_numbers?.length > 0 ? (
                  <ol>
                    {data?.meta_data?.phone_numbers?.map((no, index) => (
                      <li key={index}>{no}</li>
                    ))}
                  </ol>
                ) : (
                  "None Found"
                )}
              </Card.Text>   

              </>}
           

              {formValues.emails &&
               <>
              <Card.Subtitle>Emails</Card.Subtitle>
              <Card.Text>
                {data?.meta_data?.emails?.length > 0 ? (
                  <ol>
                    {data?.meta_data?.emails?.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ol>
                ) : (
                  "None Found"
                )}
              </Card.Text>  
              
              </>}
            
            {formValues.addresses &&
               <>
             <Card.Subtitle>Addresses</Card.Subtitle>
              <Card.Text>
                {data?.meta_data?.addresses != null ? (
                  <ol>
                    {data?.meta_data?.addresses?.map((address, index) => (
                      <li key={index}>{address}</li>
                    ))}
                  </ol>
                ) : (
                  "None Found"
                )}
              </Card.Text>
               </>}
              
            </Card.Body>
            <Card.Body>
            {formValues.social_media_all &&
               <>
              <Card.Subtitle>Social Media Links</Card.Subtitle>
              <Card.Text>
                {data?.meta_data?.social_media_links &&
                  Object?.keys(data?.meta_data?.social_media_links)?.map(
                    (socialMedia, index) =>
                      data?.meta_data?.social_media_links[socialMedia] && (
                        <p key={index}>
                          {socialMedia.charAt(0).toUpperCase() +
                            socialMedia.slice(1)}
                          :{" "}
                          <a
                            href={
                              data?.meta_data?.social_media_links[socialMedia]
                            }
                          >
                            {data?.meta_data?.social_media_links[socialMedia]}
                          </a>
                        </p>
                      )
                  )}
              </Card.Text>
              </>}
            </Card.Body>
            <Card.Body>
            {formValues.links &&
               <>
              <Card.Subtitle>Other Links</Card.Subtitle>
              <Card.Text>
                {data?.meta_data?.link?.length > 0 ? (
                  <ol>
                    {data?.meta_data?.links?.map((link, index) => (
                      <li key={index}>
                        <a href={link}>{link}</a>
                      </li>
                    ))}
                  </ol>
                ) : (
                  "None Found"
                )}
              </Card.Text>
              </>
             }
            </Card.Body>
            <Card.Body>
            {formValues.logos &&
               <>
              <Card.Subtitle>Logos</Card.Subtitle>
              <Card.Text>
                {data?.logos?.length > 0 ? (
                  <ol>
                    {data?.logos?.map((logo, index) => (
                      <li key={index}>
                        <a href={logo} key={index}>
                          {logo}
                        </a>
                      </li>
                    ))}
                  </ol>
                ) : (
                  "No Logos Found"
                )}
              </Card.Text>
               </>
               }
             
              <button
                type="button"
                className="btn mt-3"
                style={{
                  color: "#fff",
                  backgroundColor: "#005734",
                  display: "flex",
                  alignItems: "center"
                }}
                onClick={handleSendEmail}
                disabled={!email || loading}
              >
                {emailSent ? (
                  <LuMailCheck style={{ marginRight: "0.5rem" }} />
                ) : (
                  <IoPaperPlaneOutline style={{ marginRight: "0.5rem" }} />
                )}
                {loading
                  ? "Sending Email.."
                  : emailSent
                  ? "Email Sent"
                  : "Send Email"}
              </button>
            </Card.Body>
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default WebInfo;
