import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
const getActivitySummary = async (email, setActSum, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.kong}getActivitySummary?email=${email}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const actSumJASON = await response.json();
    setActSum(actSumJASON[0]);
  } catch (error) {
    console.error(error);
    alert("Get activity sum info failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getActivitySummary;
