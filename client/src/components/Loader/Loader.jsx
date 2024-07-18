import styles from "./Loader.module.scss";
import ImageLoader from "../../assets/loader.gif";
import ReactDOM from "react-dom";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={ImageLoader} alt="" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
export default Loader;
