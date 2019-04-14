const Web3 = require("web3")
const request = require("request")

const { servicePort, ethRPCUrl } = require("./config.json")

const web3 = new Web3(ethRPCUrl)

const account = web3.eth.accounts.create()

const signedMessage = web3.eth.accounts.sign(JSON.stringify({ "amount": 56 }), account.privateKey)

request.get(`http://localhost:${servicePort}/`, (error, response, body) => {
  console.log("calling", `http://localhost:${servicePort}/`)
  if (error) return console.log(error)
  console.log(JSON.stringify(JSON.parse(body), null, 4))
})

request
  .post(
    `http://localhost:${servicePort}/yields`,
    {
      "json": true, 
      "body": { "message": signedMessage.message, "signature": signedMessage.signature } 
    },
    (error, response, body) => {
      if (error) return console.log(error)
      console.log(body)
    }
  )

request.get(`http://localhost:${servicePort}/latest/yields`, (error, response, body) => {
  console.log("calling", `http://localhost:${servicePort}/latest/yields`)
  if (error) return console.log(error)
  console.log(JSON.stringify(JSON.parse(body), null, 4))
})
