/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import WebInfo from "./displayData";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FaSpider } from "react-icons/fa";


import { toast } from "react-toastify";

const socialMediaOptions = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "youtube",
  "pinterest",
  "tumblr",
  "snapchat"
];

const CardComponent = ({ page, email }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [formValues, setFormValues] = useState({
    web_url: page.url,
    addresses: false,
    emails: false,
    links: false,
    logos: false,
    name: false,
    phone_numbers: false,
    social_media_all: false,
    social_media_choices: [],
    website_socials_all: false,
    website_socials_choices: []
  });


  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const formDataToSend = {
      web_url: formValues.web_url,
      info_request: {
        addresses: formValues.addresses,
        emails: formValues.emails,
        links: formValues.links,
        logos: formValues.logos,
        name: formValues.name,
        phone_numbers: formValues.phone_numbers,
        social_media_links: {
          all: formValues.social_media_all,
          choices: formValues.social_media_all
            ? []
            : formValues.social_media_choices
        },
        website_socials: {
          all: formValues.website_socials_all,
          choices: formValues.website_socials_all
            ? []
            : formValues.website_socials_choices
        }
      }
    };
    // Your code to submit formDataToSend to the backend
    console.log(formDataToSend);
    setLoading(true);
    axios
      .post("https://www.uxlive.me/api/website-info-extractor/", formDataToSend)

      .then((response) => {
        setData(response?.data);
        console.log(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.data?.web_url) {
          toast.error("Enter a valid URL");
        } else {
          toast.error(error?.message);
        }
      });
  };

  const borderStyle = {
    border: "3px solid black",
    marginBottom: "1rem",
    padding: "5px"
  };

  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item>
          <Accordion.Header>
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: "500", marginRight: "6px" }}>
                {page.name.toUpperCase()} PAGE {!page?.url && "NOT FOUND"}
              </span>

              {loading && (
                <div>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                </div>
              )}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {page?.url ? (
              <Card>
                <Card.Body>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        htmlFor="web_url"
                        style={{ fontWeight: "500", marginBottom: "4px" }}
                      >
                        Web URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="web_url"
                        name="web_url"
                        value={formValues.web_url}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            web_url: e.target.value
                          })
                        }
                        required
                      />
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="addresses"
                        name="addresses"
                        checked={formValues.addresses}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="addresses">
                        Addresses
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="links"
                        name="links"
                        checked={formValues.links}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="links">
                        Links
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="emails"
                        name="emails"
                        checked={formValues.emails}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="emails">
                        Emails
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="logos"
                        name="logos"
                        checked={formValues.logos}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="logos">
                        Logos
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="name"
                        name="name"
                        checked={formValues.name}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="name">
                        Name
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="phone_numbers"
                        name="phone_numbers"
                        checked={formValues.phone_numbers}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="phone_numbers"
                      >
                        Phone Numbers
                      </label>
                    </div>
                    {/* Include similar code for other checkboxes */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="social_media_all"
                        name="social_media_all"
                        checked={formValues.social_media_all}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="social_media_all"
                      >
                        All Social Media
                      </label>
                    </div>

                    {formValues.social_media_all ? null : (
                      <div className="form-group">
                        <label htmlFor="social_media_choices">
                          Social Media Links
                        </label>
                        <Select
                          style={{ ...borderStyle }}
                          options={socialMediaOptions.map((option) => ({
                            value: option,
                            label: option
                          }))}
                          isMulti
                          value={formValues?.social_media_choices?.map(
                            (choice) => ({
                              value: choice,
                              label: choice
                            })
                          )}
                          onChange={(selectedOptions) =>
                            setFormValues({
                              ...formValues,
                              social_media_choices: selectedOptions.map(
                                (option) => option.value
                              )
                            })
                          }
                        />
                      </div>
                    )}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="website_socials_all"
                        name="website_socials_all"
                        checked={formValues.website_socials_all}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="website_socials_all"
                      >
                        All Website Socials
                      </label>
                    </div>

                    {formValues.website_socials_all ? null : (
                      <div className="form-group">
                        <label htmlFor="website_socials_choices">
                          Website Socials
                        </label>
                        <Select
                          options={socialMediaOptions.map((option) => ({
                            value: option,
                            label: option
                          }))}
                          isMulti
                          value={formValues?.website_socials_choices?.map(
                            (choice) => ({
                              value: choice,
                              label: choice
                            })
                          )}
                          onChange={(selectedOptions) =>
                            setFormValues({
                              ...formValues,
                              website_socials_choices: selectedOptions.map(
                                (option) => option.value
                              )
                            })
                          }
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn mt-3"
                      style={{
                        color: "#fff",
                        backgroundColor: "green",
                        display: "flex",
                        alignItems: "center"
                      }}
                      disabled={loading}
                    >
                      <FaSpider style={{ marginRight: "0.5rem" }} />
                      {loading ? "Crawling..." : "Crawl"}
                    </button>
                  </form>
                </Card.Body>
              </Card>
            ) : (
              <div className="d-flex mt-3 mb-3 justify-content-center align-items-center">
                Page Not Found
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {data && <WebInfo data={data} page={page?.name} email={email} formValues={formValues}/>}
    </>
  );
};

export default CardComponent;
