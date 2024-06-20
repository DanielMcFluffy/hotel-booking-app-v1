let express = require("express");
let path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
const { DATABASE_URL } = process.env;
require("dotenv").config();

let app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

//testing connection to neondb
async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT version()");
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
}

//test the connection
getPostgresVersion();

////////////////////////////////////////////////////////////

//two tables to be used in this api:

// - listings table (email, phone number, id )

// - bookingusers table (booking_end, booking_start, distance, id, location, price, rating, user_id)

//REST apis for booking app
//////////////////////////////////////////

//GET request to fetch all listings (to be rendered on landing page?)

app.get("/", async (req, res) => {
  //establish connection with db
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM listings");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    //release client to prevent memory leakage
    client.release();
  }
});

//GET request to fetch a single listing (in detail?) to be displayed onto the checkout page
// /bookings/:bookingId
// need to extract out the user data from currentUser(google auth) to make sure it belongs to that user

app.get("/bookings/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM listings WHERE id = $1";
    const result = await client.query(query, [bookingId]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    //release client to prevent memory leakage
    client.release();
  }
});

//POST(GET) request to fetch all listings booked by the same user (uid)
app.post("/bookings/user", async (req, res) => {
  const { uid } = req.body;
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM listings WHERE booking_user = $1";
    const result = await client.query(query, [uid]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    //release client to prevent memory leakage
    client.release();
  }
});

//PUT(DELETE) request to clear uid, booking_start and booking_end from a listing
app.put("/bookings/user", async (req, res) => {
  const { bookingId } = req.body;
  const client = await pool.connect();
  try {
    const query =
      "UPDATE listings SET booking_user = '', booking_start = '', booking_end = '' WHERE id = $1";
    await client.query(query, [bookingId]);
    res.status(200).json({ status: "booking cleared" });
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    client.release();
  }
});

//POST request to send in the booking date to the db (populating the booking_user, booking_start, booking_end columns)
app.post("/bookings/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const { uid, booking_start, booking_end } = req.body;
  const client = await pool.connect();
  try {
    //verification logic here

    //check if the listing has any user booked or not

    const userExist = await client.query('SELECT * FROM listings WHERE id = $1', [bookingId]);
    //if no user has booked this listing, proceed to book
    if (!userExist.rows[0].booking_user) {
    const query =
      "UPDATE listings SET booking_user = $1, booking_start = $2, booking_end = $3 WHERE id = $4 RETURNING *";
    await client.query(query, [uid, booking_start, booking_end, bookingId]);
    res.status(200).json({ status: "booking updated" });
    } else if (userExist.rows[0].booking_user && userExist.rows[0].booking_user !== uid) {
      res.status(401).json({"status":"This listing has been booked."})
    } else if (userExist.rows[0].booking_user === uid) {
      const query = "UPDATE listings SET booking_user = $1, booking_start = $2, booking_end = $3 WHERE id = $4 RETURNING *";
      await client.query(query, [uid, booking_start, booking_end, bookingId]);
      res.status(200).json({ status: "booking updated" });
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    //release client to prevent memory leakage
    client.release();
  }
});

/////////////////////////////////////////

// //api documentation
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
//middleware for errorpage
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + "/404.html"));
});
//starting the web server
app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
