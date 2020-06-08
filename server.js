import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

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
});

// First clear database - then populate database:

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

// -----------------------------------------------
// To reset database:
// $ RESET_DATABASE=true npm run dev
// Or via Heroku in Config vars
/*
if (process.env.RESET_DATABASE) {
  console.log("Message: Resetting database");

  const seedDatabase = async () => {
    await Thought.deleteMany();
  };
  seedDatabase();
};
*/

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
