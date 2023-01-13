import express from "express";
import { testing } from "../controllers/editor.js";

const router = express.Router();
var accessToken = "a566550247117585bfc5c05fbdcd71b2";
var endpoint = "f5a9a750.compilers.sphere-engine.com";
router.get("/testing", testing);

router.get("/code", async (req, res) => {
  try {
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
});
router.get("/compilers", async (req, res) => {
  const url =
    "https://" + endpoint + "/api/v4/compilers?access_token=" + accessToken;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
});

router.post("/compile", async (req, res) => {
  var myHeaders = new Headers();
  var raw = JSON.stringify({
    compilerId: req.body.compilerId,
    source: req.body.source,
    input: req.body.input,
  });

  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://f5a9a750.compilers.sphere-engine.com/api/v4/submissions?access_token=a566550247117585bfc5c05fbdcd71b2",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
});

router.get("/compile/:id", async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://f5a9a750.compilers.sphere-engine.com/api/v4/submissions/${req.params.id}?access_token=a566550247117585bfc5c05fbdcd71b2`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>
      res.status(200).send(result).header("Access-Control-Allow-Origin: *")
    )
    .catch((error) => console.log("error", error));
});
router.get("/error/:id", async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://f5a9a750.compilers.sphere-engine.com/api/v4/submissions/${req.params.id}/error?access_token=a566550247117585bfc5c05fbdcd71b2`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
});
router.get("/output/:id", async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://f5a9a750.compilers.sphere-engine.com/api/v4/submissions/${req.params.id}/output?access_token=a566550247117585bfc5c05fbdcd71b2`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
});
router.get("/cmpinfo/:id", async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://f5a9a750.compilers.sphere-engine.com/api/v4/submissions/${req.params.id}/cmpinfo?access_token=a566550247117585bfc5c05fbdcd71b2`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
});

export default router;
