import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
let port = 3000
if (process.argv.length > 2) {
  port = process.argv[2]
}

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "public", "assets")))
app.use(express.text())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/api/load", (req, res) => {
  if (fs.existsSync("/etc/netplan/99-netplan.yaml")) {
    try {
      res.set("Content-Type", "text/plain; charset=utf-8")
      res.sendFile("/etc/netplan/99-netplan.yaml")
    } catch (e) {
      res.send("")
    }
  } else {
    res.send("")
  }
})

app.get("/api/dev", (req, res) => {
  const s = fs.readFileSync("/proc/net/dev", "utf-8")
  const sa = s.split("\n")
  sa.shift()
  sa.shift()
  const json = sa.map(s => s.split(":")[0].trim()).filter(s => s && !s.startsWith("lo") && !s.startsWith("w"))
  res.json(json)
})

app.post("/api/save", (req, res) => {
  try {
    fs.writeFileSync("/etc/netplan/99-netplan.yaml", req.body)
    res.send("OK")
  } catch (e) {
    res.status(500).send("NG")
  }
})

app.listen(port, () => {
  console.log("Server Started on port:", port)
})
