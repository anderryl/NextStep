import Dexie from "dexie"

var db = new Dexie("NextStep")
db.version(5).stores({
  listings: "++id, title, blurb, type, uid",
})
db.open().catch(function (e) {
  console.error("Open failed: " + e.stack)
})

export default db
