import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class AdminServices extends GenericService {
  constructor() {
    super();
  }
  getInstructors = () => this.get("instructors");
  getCandidates = () => this.get("candidates");

  deleteUser = (_id) => this.delete("user/" + _id);
  deleteTests = (_id) => this.delete("test/" + _id);
  getTests = (_id) => this.get("tests");

  login = (data) =>
    new Promise((resolve, reject) => {
      this.post("login/", data)
        .then((token) => {
          console.log(token);
          localStorage.setItem("accessToken", token.accessToken);
          resolve(token);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });

  logout = () => {
    localStorage.removeItem("accessToken");
  };
  isLoggedIn = () => {
    return localStorage.getItem("accessToken") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("accessToken");
      if (jwt != null) return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}
let adminServices = new AdminServices();
export default adminServices;
