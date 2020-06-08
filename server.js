import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import kitsData from "./data/kitsdata.json";

// Error messages: (error handling: Can not find + Can not post/update)

// Mongoose & Database setup:
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-final";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// -----------------------------------------------
// Mongoose model setup:

const Kit = mongoose.model("Kit", {
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  average_cost: {
    type: Number,
  },
  average_cost: {
    type: Number,
  },
  kit_type: {
    type: String,
  },
  for_persons: {
    type: Number,
  },
  for_days: {
    type: Number,
  },
  nutrition_cal: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// First clear database - then populate database:
/* 
Kit.deleteMany().then(() => {
  new Kit({
    name: "Krislåda KL2",
    description: "Krislåda KL2 är vår minsta modell.",
    content:
      "1st Vattenreningstabletter (50L), 1st Vattendunk (10L), 1st Nödfilt folie, 1st Dynamoficklampa, 1st Triangia Minikök 28-T",
  }).save();
  new Kit({
    name: "Krislåda KL6",
    description: "Krislåda KL6 är vår medium modell.",
    content:
      "1st Vevradio med solcelllspanel (md088plus), 1st Vattenreningsfilter Sawyer Micro Squeeze, 1st Vattendunk (10L), 2st Nödfilt folie, 1st ficklampa / lykta, 1st Spritkök med kittel och stekpanna Trangia ",
  }).save();
});
 */


// -----------------------------------------------
// To reset database and then populate db:
// $ RESET_DATABASE=true npm run dev
// Seed DATABASE using Async
// forEach loop will put all Books from JSON into database
if (process.env.RESET_DATABASE) {
  console.log("Message: Resetting database");

  const seedDatabase = async () => {
    await Kit.deleteMany();
    await kitsData.forEach((kit) => new Kit(kit).save());
  };
  seedDatabase();
}

// -----------------------------------------------

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world - backend here");
});



// To return all Kits:
// http://localhost:8080/kits
app.get("/kits", async (req, res) => {
  const kits = await Kit.find();
  console.log(`Message: Found ${kits.length} kits`);
  res.json(kits);
});


// To sort by cost:
// http://localhost:8080/kits/sort?sort_by=average_cost
app.get("/kits/sort", (req, res) => {
  const { sort_by } = req.query;
  const sort = {};

  if (sort_by && ["average_cost"].includes(sort_by)) {
    sort[sort_by] = -1;
  }
  Kit.find({})
    .sort(sort)
    .then((results) => {
      if (results.length === 0) {
        throw new Error("Nothing found");
      }
      res.json(results);
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});




// To return one Kits info by id from database:
// http://localhost:8080/kits/info/5ede0dd628523f2d30ed6c8f
// And to handle server error via try/catch

app.get("/kits/info/:id", async (req, res) => {
  try {
    const kitId = await Kit.findById(req.params.id)
    if (kitId) {
      res.json(kitId)
    } else {
      res.status(404).json({ error: "No match for Id"})
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid object Id"})
  }
})







// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
