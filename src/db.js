import Dexie from "dexie"

var db = new Dexie("ContentStorage");
db.version(2).stores({
  listings: "++id, title, blurb, type",
});
db.open().catch(function (e) {
  console.error("Open failed: " + e.stack);
})

export default db
