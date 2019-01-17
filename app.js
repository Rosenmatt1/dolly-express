const express = require("express")
const app = express() 
const port = 3003
const cors = require('cors')
const data = require("./data.json")

app.use(cors())

app.use(express.static('./public'))


app.get('/data', (req, res, next) => {
  res.status(200).send({
    "message": "success",
    "data": data
  })
})

app.get('/:tag', (req,res, next) => {
  const tag = req.params.tag
  if (!data.tags.includes(tag)) {
    res.status(404).send('SOrry, that tag does not exist')
  } else {
    const matching = data.songs.filter(song => song.tags.includes(tag))
    res.status(200).send(matching)
  }
})

app.use((req, res, next) => {
  res.status(404).send("This route does not exist")
})

app.listen(port, () => console.log("party on port 3003!"))