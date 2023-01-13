export const testing = () => {
  async (req, res) => {
    var accessToken = "a566550247117585bfc5c05fbdcd71b2";
    var endpoint = "f5a9a750.compilers.sphere-engine.com";
    const url =
      "https://" + endpoint + "/api/v4/test?access_token=" + accessToken;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          res.status(200).send(result).header("Access-Control-Allow-Origin: *")
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      res.status(401).json({
        error,
      });
    }
  };
};
export default testing;
