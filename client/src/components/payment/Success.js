import React from 'react'
import success from "../images/success.png";
import styles from "./style.module.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import authServices from "../Services/AuthServices"
import alert from '../Services/Alert';
function Success() {
  const param = useParams();

  React.useEffect(()=> {
    const makeRequest = async () => {
      console.log(param.id);
      try {
        const res = await axios.post(
          "http://localhost:4000/api/reader/request/instructor/" +
            authServices.getLoggedInUser()._id,
          {
            instructorId:param.id
          }
        );
        console.log(res.data);
        alert.showSuccessAlert("Subscribed Successfully");
      } catch (error) {
        alert.showErrorAlert("Not Subscribes "+error.message);
        console.log(error);
      }
    };
    makeRequest();
  },[param]);
  return (
    <div className={styles.container}>
    <img src={success} alt="success_img" className={styles.success_img} />
    <h1>The Payment is done Successfully</h1>
    <Link to="/">
        <button className={styles.green_btn}>Go Home</button>
    </Link>
</div>
  )
}

export default Success