import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.esv_tm_section}>
      <div className={styles.esv_tm_copyright}>
        <div className={styles.container}>
          <div className={styles.copyright_inner}>
            <div className={styles.logo}>E com</div>
            <div className={styles.copy}>
              <p>
                © {new Date().getFullYear()} by{" "}
                <a href="/" target="_blank">
                  Estifanos
                </a>{" "}
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
