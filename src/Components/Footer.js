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
{/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
<path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> */}

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
