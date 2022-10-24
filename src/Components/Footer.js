import React, { useContext } from "react";
import "./footer.scss";

import twitter from "../images/twitter.svg";
import mail from "../images/mail.svg";
import { DataContext } from "../ContextAPI/dataContext";

const items = [
  { name: "Twitter", url: "https://twitter.com/wordvita", image: twitter },
  // { name: "google", url: "https://www.google.com", image: google },
  // { name: "facebook", url: "https://www.facebook.com", image: facebook },
  {
    name: "Feedback",
    url: "mailto:support@wordvita.com?subject=Feedback for Wordvita",
    image: mail,
  },
];

const Footer = () => {
  return (
    <div className="wrapper">
      <div className={`footer `}>
        {items.map((item, i) => {
          return <FooterItem details={item} key={i} />;
        })}
      </div>
    </div>
  );
};

const FooterItem = ({ details }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className={`footer-item ${!state.Lightmode ? "dark" : ""}`}>
      <img src={details.image} />
      <a href={details.url} target="_blank">
        {details.name}
      </a>
    </div>
  );
};

export default Footer;
