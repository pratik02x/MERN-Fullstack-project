import config  from "./config";
import axios from "axios";

export async function getcourses(){
    const URL=config.Base_URL+"/common/course/all-active-course";
    
    const response= await axios.get(URL);
    return response.data;
}