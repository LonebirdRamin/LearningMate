const ipv4 = {
  kong: "http://192.168.1.100:5001/api/",
  golf: "http://192.168.1.107:5001/api/",
  ramin: "http://192.168.1.48:5001/api/",
  mark: "http://192.168.1.46:5001/api/",
  green: "http://192.168.1.75:5001/api/",
  greenTU: "${ipv4.greenTU}"
};

export default ipv4;