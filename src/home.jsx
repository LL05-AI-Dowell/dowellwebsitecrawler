/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "./pageCard";
import { FaSpider } from "react-icons/fa";

const Home = () => {
  const [pagesUrl, setPagesUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [formValues, setFormValues] = useState({
    web_url: "",
    info_request: {
      pages_url: ["about", "contact", "careers", "services", "products", "faq"]
    },
    email: ""
  });

  const handleSendEmail = async (htmlContent) => {
    try {
      // setLoading(true);
      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/email/`,
        {
          toname: "Dowell UX Living Lab",
          toemail: formValues.email,
          subject: `${
            formValues.email
          } result from DoWell Website Crawler on ${new Date()}`,
          email_content: htmlContent
        }
      );
      // Set the emailSent state to true when the email is sent
      setEmailSent(true);
      console.log(response);
    } catch (error) {
      setEmailSent(false);
      console.log(error?.response?.data?.web_url);
    }
  };

  const handleScrapeWebsiteInfo = (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const formDataToSend = {
      web_url: `https://${formValues.web_url}`,
      info_request: formValues.info_request
    };
    setLoading(true);
    axios
      .post(`https://www.uxlive.me/api/website-info-extractor/`, formDataToSend)
      .then((response) => {
        setLoading(false);

        setPagesUrl(response?.data?.meta_data?.pages_url);

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Dowell Website Crawler</title>
            </head>
            <body>
              <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                  <div style="border-bottom: 1px solid #eee">
                    <a href="#" style="font-size: 1.2em; color: #00466a; text-decoration: none; font-weight: 600">Dowell UX Living Lab</a>
                  </div>
                  <p style="font-size: 1.1em">Email : ${formValues.email}</p>
                  <p style="font-size: 1.1em">Website Link : ${
                    formValues.web_url
                  }</p>
                  <p style="font-size: 1.1em">Pages</p> ${" "}
                  <ul>
                    ${Object.entries(response?.data?.meta_data?.pages_url)
                      .map(
                        ([page, link]) =>
                          `<li key=${page}>${page} : ${
                            link
                              ? `<a href=${link}>${link}</a>`
                              : "No link available"
                          }</li>`
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </body>
          </html>
        `;

        handleSendEmail(htmlContent);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.response?.data?.web_url);
        if (error?.response?.data?.web_url) {
          toast.error("Enter a valid URL");
        } else {
          toast.error(error?.message);
        }
      });
  };

  const urlsData = pagesUrl
    ? Object.entries(pagesUrl).map(([name, url]) => ({ name, url }))
    : [];

  const handleClearFields = () => {
    setFormValues({
      web_url: ""
    });
  };

  return (
    <div className="page-container">
      <div style={{ width: "100%", height: "100%" }}>
        <div>
          <div className="container ">
            <div className="row justify-content-center mt-2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem 0"
                }}
              >
                <img
                  src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
                  alt="Dowell Logo"
                />
              </div>

              <div className="col-md-12" style={{ textAlign: "center" }}>
                <h1 className="w-full mb-4 justify-content-center align-items-center">
                  Welcome to Dowell Website Crawler
                </h1>

                <p className="subTitle">
                  {" "}
                  The ultimate tool for effortlessly extracting valuable data
                  from any website with our user-friendly interface and advanced
                  web scraping techniques.{" "}
                </p>

                <form onSubmit={handleScrapeWebsiteInfo}>
                  <div className="input-group mb-3">
                    <span style={{
                        fontWeight: "bold"
                      }}className="input-group-text">
                        https://
                      </span>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.web_url}
                      
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          web_url: e.target.value.toLowerCase()
                        })
                      }
                      placeholder="Enter Website Url"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      style={{
                        marginBottom: "1rem"
                      }}
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          email: e.target.value
                        })
                      }
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="mb-3 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        color: "#fff",
                        backgroundColor: "#d9bf18",
                        marginRight: "0.5rem" // Add some right margin for spacing
                      }}
                      onClick={handleClearFields}
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="btn"
                      style={{
                        color: "#fff",
                        backgroundColor: "green",
                        display: "flex",
                        alignItems: "center"
                      }}
                      disabled={
                        !formValues.web_url || loading || !formValues.email
                      }
                    >
                      <FaSpider style={{ marginRight: "0.5rem" }} />
                      {!formValues.web_url
                        ? "Enter Web Url"
                        : !formValues.email
                        ? "Enter Your Email"
                        : loading
                        ? "Crawling..."
                        : "Crawl"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {loading ? (
              <div className="d-flex mt-3 justify-content-center align-items-center">
                <div
                  className="spinner-border green-spinner"
                  role="status"
                ></div>
              </div>
            ) : urlsData.length > 0 ? (
              <div className="row">
                {urlsData.map((item, index) => (
                  <div className="col-12" key={index}>
                    <div className="card mb-4 rounded">
                      <CardComponent page={item} email={formValues.email} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center mt-3">
              <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fcmvf8l.csb.app%2F">
                <img
                  style={{ width: "100px", height: "auto" }}
                  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fcmvf8l.csb.app%2F&labelColor=%2326802f&countColor=%23555555&style=plastic&labelStyle=upper"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
