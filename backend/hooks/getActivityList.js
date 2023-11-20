import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
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
    console.error(error);
    alert("Get activity list failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getActivityList;
