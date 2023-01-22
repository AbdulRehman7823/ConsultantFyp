import React from 'react'
import success from "../images/success.png";
import styles from "./style.module.css";
import { useParams, Link } from "react-router-dom";

function Cancel() {
  return (
    <div className={styles.container}>
    <img src={success} alt="success_img" className={styles.success_img} />
    <h1>We are sorry we can't Proceed your Payment</h1>
    <Link to="/">
        <button className={styles.green_btn}>Go Home</button>
    </Link>
</div>
  )
}

export default Cancel