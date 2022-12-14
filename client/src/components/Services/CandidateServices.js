import { id } from "date-fns/locale";
import GenericService from "./GenericService";
class CandidateServices extends GenericService {
  constructor() {
    super();
  }

  getInstructors = () => this.get("admin/instructors");
  getQuizes = () => this.get("admin/tests");
  getQuickTest = () => this.get("admin/quickTest");
  requestPoet = (_id, data) =>
    this.post("candidate/request/instructor/" + _id, data);
    buySubscription = (data) => this.post("checkout/create-checkout", data);
    checkout = (data) => this.post("checkout/create-checkout", data);
}
let candidateServices = new CandidateServices();
export default candidateServices;
