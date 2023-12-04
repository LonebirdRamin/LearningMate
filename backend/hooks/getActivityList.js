import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
/*
  This hook function is used to get all the activity of the specific student.
*/
const getActivityList = async (email, setActList, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${ipv4.mark}getActivityList?email=${email}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const actListJASON = await response.json();
    setActList(actListJASON);
  } catch (error) {
    alert("Get activity list failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getActivityList;
