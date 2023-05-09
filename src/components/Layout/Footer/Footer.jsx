import styles from "./Footer.module.scss";

const socialItems = [
  { name: "VK", icon: "social/Vk.svg", link: "vk.com" },
  { name: "Twitter", icon: "social/Twitter.svg", link: "twitter.com" },
  { name: "Pinterest", icon: "social/Pinterest.svg", link: "pinterest.com" },
  { name: "Facebook", icon: "social/Facebook.svg", link: "facebook.com" },
  { name: "Instagram", icon: "social/Instagram.svg", link: "instagram.com" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <img src="footer-logo.svg" alt="logotype" />
          <div className={styles.footerSocial}>
            <ul className={styles.footerSocialList}>
              {socialItems.map((social) => (
                <li>
                  <a href={social.link} target="a_blank">
                    <img src={social.icon} alt={social.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <small>All Rights Reserved 2018 3layers</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
