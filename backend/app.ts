module.exports.getBlock = async () => {
  await fetch("http://localhost:4000/getBlock")
    .then((res) => res.json())
    .then((data) => {
      console.log(JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

module.exports.getBalance = async (address) => {
  await fetch("http://localhost:4000/getBalance", {
    headers: { address },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
