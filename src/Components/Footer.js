import React from "react";
import "./footer.scss";

import twitter from "../images/twitter.svg";
import facebook from "../images/facebook.svg";
import google from "../images/google.svg";
import mail from "../images/mail.svg";

const items = [
  { name: "Twitter", url: "https://twitter.com/wordvita", image: twitter },
  // { name: "google", url: "https://www.google.com", image: google },
  // { name: "facebook", url: "https://www.facebook.com", image: facebook },
  { name: "Feedback", url: "mailto:support@wordvita.com?subject=Feedback for Wordvita", image: mail },
];

const Footer = () => {
  return (
    <div className="footer">
      {items.map((item, i) => {
        return <FooterItem details={item} key={i} />;
      })}
    </div>
  );
};

const FooterItem = ({ details }) => {
  return (
    <div className="footer-item">
      <img src={details.image} />
      <a href={details.url} target="_blank">
        {details.name}
      </a>
    </div>
  );
};

export default Footer;
