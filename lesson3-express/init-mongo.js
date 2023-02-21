db.createUser({
  user: "natoursAdmin",
  pwd: "test", // or cleartext password
  roles: [{ role: "readWrite", db: "natours" }],
});

db.createCollection("tours");
db.createCollection("users");
