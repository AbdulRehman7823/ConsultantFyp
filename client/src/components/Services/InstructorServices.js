import GenericService from "./GenericService";
class InstructorServices extends GenericService {
  constructor() {
    super();
  }

  getCandidates = (_id) => this.get("instructor/candidates/" + _id);
  getSubscribers = (_id) => this.get("instructor/acceptedReaders/"+_id);
  addTest = (data)=> this.post("test/",data)
  getAllTests = (_id) => this.get("instructor/tests/"+_id);
  deleteTest = (_id) => this.delete("test/"+_id)
 
}
let instructorServices = new InstructorServices();
export default instructorServices;
