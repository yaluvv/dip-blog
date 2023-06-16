import styles from "./Footer.module.scss";

const socialItems = [
  { name: "VK", icon: "../social/Vk.svg", link: "https://vk.com/yaluvv" },
  {
    name: "Twitter",
    icon: "../social/Twitter.svg",
    link: "https://twitter.com/yaluvv",
  },
  {
    name: "Pinterest",
    icon: "../social/Pinterest.svg",
    link: "https://pinterest.com/yaluvv",
  },
  {
    name: "Facebook",
    icon: "../social/Facebook.svg",
    link: "https://facebook.com/yaluvv",
  },
  {
    name: "Instagram",
    icon: "../social/Instagram.svg",
    link: "https://instagram.com/yaluvv",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <img src="../footer-logo.svg" alt="logotype" />
          <div className={styles.footerSocial}>
            <ul className={styles.footerSocialList}>
              {socialItems.map((social) => (
                <li key={social.name}>
                  <a href={social.link} target="a_blank">
                    <img src={social.icon} alt={social.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <small>
            All Rights Reserved 2023.
            <a href="https://github.com/yaluvv">Yaluvv</a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
