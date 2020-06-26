import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
// Data source CSV export file:
import kitsData from "./data/kitsdata.json";

// Mongoose & Database setup:
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-final";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
// Mongoose model setup:
const Kit = mongoose.model("Kit", {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  average_cost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  for_persons: {
    type: Number,
    required: true,
  },
  for_days: {
    type: Number,
    required: true,
  },
  nutrition_cal: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link_product: {
    type: String,
  },
  link_image: {
    type: String,
  },
  article_nr: {
    type: String,
  },
  brand: {
    type: String,
  },
});

// $ RESET_DATABASE=true npm run dev
// Or via Heroku in Config vars
if (process.env.RESET_DATABASE) {
  console.log("Message: Resetting database");

  const seedDatabase = async () => {
    await Kit.deleteMany();
    await kitsData.forEach((kit) => new Kit(kit).save());
  };
  seedDatabase();
}

// Defines the port the app will run on:
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable " });
  }
});

// Routes:
app.get("/", (req, res) => {
  res.send("Hello world - backend here");
});


app.get("/kits", async (req, res) => {
  const kits = await Kit.find();
  res.json(kits);
});

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


app.get("/kit/:id", async (req, res) => {
  try {
    const kitId = await Kit.findById(req.params.id);
    if (kitId) {
      res.json(kitId);
    } else {
      res.status(404).json({ error: "No match for Id" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid object Id" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
