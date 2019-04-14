const fs = require("fs")

const Web3 = require("web3")
const express = require("express")
const bodyParser = require("body-parser")
const protobufjs = require("protobufjs")
const OpenTimestamps = require("javascript-opentimestamps")

const { mapToObject, protoToMap } = require("./utils.js")

const ethRPCUrl = "https://ropsten.infura.io"
const { servicePort } = require("./config.json")


const yields = new Map()

if (!fs.existsSync("./db")) {
  fs.mkdirSync("./db")
}

if (!fs.existsSync("./ots")) {
  fs.mkdirSync("./ots")
}

// Periodically serialize data locally with protobuf, stamp .proto with opentimestamps
protobufjs.load("./yields.proto", (err, root) => {
  const Yields = root.lookupType("Yields")
  const Yield = root.lookupType("Yield")
  setInterval(() => {
    const serializedYields = Yields.encode({
      "yields": [...yields].reduce((acc, cur) => acc.concat([Yield.create({ "identity": cur[0], "amount": cur[1] })]), [])
    }).finish()
    const timestamp = new Date(Date.now()).valueOf()
    fs.writeFile(`./db/${timestamp}.proto`, serializedYields, (err) => {
      if (err) console.error(err)
      const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(new OpenTimestamps.Ops.OpSHA256(), serializedYields)
      OpenTimestamps.stamp(detached).then(() => { 
        fs.writeFile(`./ots/${timestamp}.ots`, detached.serializeToBytes())
        if (err) console.error(err)
      })
    })
  }, 10*1000)
})

const app = express()
app.use(bodyParser.json())
const web3 = new Web3(ethRPCUrl)

app.post("/yields", (req, res) => {
  // Users post yields data with signed messages and its serialized with the identity as a key;
  // recover account with signed message + signature
  const account = web3.eth.accounts.recover(req.body.message, req.body.signature)
  const { amount } = JSON.parse(req.body.message)

  yields.set(account, amount)
  res.sendStatus(200)
})

// Custom routers to accommodate dedicated middlewares
const endpoints = express.Router() // Any endpoint for yields stores
const latestDataset = express.Router() // Endpoints for the latest store
const timestampDataset = express.Router() // Endpoints for timestamped, archived stores

endpoints.use((req, res, next) => {
  fs.readdir("./db", (err, files) => {
    if (err) return res.sendStatus(500)
    if (files.length > 0) {
      // Expose endpoints using their timestamp as path (exclude .proto extension) from latest to oldest
      const endpoints = files.map(filename => filename.substring(0, filename.length-6)).sort().reverse()
      // Save to req object to use in specific routes
      req.endpoints = endpoints 
      req.latestEndpoint = endpoints[0]
      next()
    } else {
      res.status(500).send({ "message": "No data available" })
    } 
  })
})

// List all available timestamped stores, expose latest for convenience
endpoints.get("/", (req, res) => {
  res.send([ "latest" ].concat(req.endpoints))
})

latestDataset.use((req, res, next) => {
  // Deserialize latest dataset using relevant .proto definitions
  protobufjs.load("./yields.proto", (err, root) => {
    const Yields = root.lookupType("Yields")
    fs.readFile(`./db/${req.latestEndpoint}.proto`, (err, data) => {
      if (err) return res.status(500).send(err)
      req.latestDataset = protoToMap(Yields.decode(data))
      next()
    })
  })
})

latestDataset.get("/yields", (req, res) => {
  res.send(mapToObject(req.latestDataset))
})

latestDataset.get("/yields/:identity", (req, res) => {
  res.send(req.latestDataset.get(req.params.identity))
})

const timestampDatasetMiddleware = (req, res, next) => {
  // Deserialize requested datased using relevant .proto definitions
  protobufjs.load("./yields.proto", (err, root) => {
    const Yields = root.lookupType("Yields")
    fs.readFile(`./db/${req.timestamp}.proto`, (err, data) => { // This will be made available by the following endpoint.param(...) method
      if (err) return res.status(500).send(err)
      req.timestampDataset = protoToMap(Yields.decode(data))
      next()
    })
  })
}

endpoints.param("timestamp", (req, res, next, timestamp) => {
  req.timestamp = timestamp // provide timestampDataset endpoints with the currently requested timestamp 
  next()
})

timestampDataset.get("/yields", timestampDatasetMiddleware, (req, res) => {
  res.send(mapToObject(req.timestampDataset))
})

timestampDataset.get("/yields/:identity", timestampDatasetMiddleware, (req, res) => {
  res.send(req.timestampDataset.get(req.params.identity))
})

app.use("/", endpoints)
app.get("/db", (req, res) => { fs.readdir("./db", (err, files) => { res.send(files) }) })
app.use("/db", express.static("db"))
app.get("/ots", (req, res) => { fs.readdir("./ots", (err, files) => { res.send(files) }) })
endpoints.use("/ots", express.static("ots"))
endpoints.use("/latest", latestDataset)
endpoints.use("/:timestamp", timestampDataset)
app.get("*", (req, res) => { res.sendStatus(404) })

app.listen(servicePort, () => console.log("Running on port", servicePort))
