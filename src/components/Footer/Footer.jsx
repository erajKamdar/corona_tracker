import React from "react";
import "./Footer.style.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              <a
                className="footer-copyright-link"
                href="https://github.com/erajKamdar"
                target="_self"
              >
                {" "}
                ©{new Date().getFullYear()} | Designed and Developed By Eraj
                Hanif | All rights reserved.{" "}
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
