import React from 'react';
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="footer__content">
        <div className="footer__content__left">
          <h3>Get in touch</h3>
          <p>Phone: +1 234 567 890</p>
          <p>
            Email:
            <a href="mailto: kustosz142@gmail.com">
              <MailOutlined />
            </a>
          </p>
        </div>
        <div className="footer__content__right">
          <h3>Follow us</h3>
          <div className="footer__content__right__icons">
            <a
              href="https://www.facebook.com/krzysztof.radzieta.75/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://www.instagram.com/krzysztof_fajny/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://github.com/Krzychu142"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
