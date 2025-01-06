const express = require("express");
const app = express();
var methodOverride = require("method-override");
const port = 3000;
const { v4: uuidv4, parse, stringify } = require("uuid");
const path = require("node:path");
app.use(methodOverride("_method"));
// app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Port Started ${port}`);
});

async function getRandomUser() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Error fetching random user:", error);
    return null;
  }
}

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

let posts = [
  {
    id: uuidv4(),
    username: "Deepti Kumari",
    gender: "Female",
    streetNumber: "123",
    streetName: "Main St",
    city: "Springfield",
    state: "Illinois",
    country: "USA",
    email: "deepti22@example.com",
    dob: "1990-01-01",
    phone: "+1234567890",
    userImage: "/images/profile.png",
    ques: "What is the best way to learn programming?",
    description: `The best way to learn programming is to start with the basics, practice regularly by working on real projects that interest you, and actively apply concepts through coding exercises while seeking guidance from tutorials, online courses, or communities when needed; essentially, learning by doing is key to mastering programming.
Key points to remember:
Choose a language:
Select a programming language that aligns with your goals, like Python for general-purpose coding, JavaScript for web development, or Java for enterprise applications. 
Start with fundamentals:
Begin with foundational concepts like variables, data types, loops, conditional statements, and functions. 
Practice consistently:
Dedicate time to coding regularly, even if it's just for short periods, to build muscle memory and solidify concepts. 
Work on projects:
Find projects that motivate you and challenge you to apply what you learn, starting with smaller, achievable tasks`,
    createdAt: new Date(),
  },

  {
    id: uuidv4(),
    username: "Arun Shah",
    userImage: "/images/profile2.png",
    gender: "Male",
    streetNumber: "3457",
    streetName: "Mall Road St",
    city: "Springfield",
    state: "Illinois",
    country: "USA",
    email: "shaharun22@example.com",
    dob: "1990-01-01",
    phone: "+1234567890",
    ques: "How to capture screenshot in laptop?",
    description: `To take a screenshot on a laptop, you can use the following keyboard shortcuts:
Print Screen: Takes a screenshot of the entire screen 
Windows logo key + PrtScn: Takes a screenshot of the entire screen 
Fn + Windows logo key + Space Bar: Takes a screenshot if your device doesn't have the PrtScn button 
Windows logo key + Shift + S: Takes a static image snip 
Windows logo key + Shift + R: Takes a video snip`,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    username: "Laxmirlola Behera",
    userImage: "/images/profile3.png",
    gender: "Female",
    streetNumber: "123",
    streetName: "Main St",
    city: "Springfield",
    state: "Illinois",
    country: "USA",
    email: "laxmi2422@example.com",
    dob: "1990-01-01",
    phone: "+1234567890",
    ques: "How to stay motivated during tough times?",
    description: `Here are some tips for staying motivated during tough times:
Set smaller goals: Unattainable goals can stifle momentum. 
Celebrate small victories: Share in the joy of success to foster a sense of camaraderie. 
Ask for support: Reach out to friends and family for a boost in morale. 
Practice gratitude: Being thankful for what you have can lift your spirits. 
Surround yourself with people who care: Having an experienced and guiding light in your life can make all the difference. 
Take a break and treat yourself: Try a holiday, a new activity, or long walks. 
Get physical with some exercise: Studies show that exercising can reduce stress and boost self-esteem. 
Stick to a routine: Having a routine can help you stay on track. 
Motivation is an essential part of our overall well-being and success.`,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    username: "Rajesh Kumar",
    userImage: "/images/profile4.png",
    gender: "Male",
    streetNumber: "123",
    streetName: "Main St",
    city: "Springfield",
    state: "Illinois",
    country: "USA",
    email: "kumarraj@example.com",
    dob: "1990-01-01",
    phone: "+1234567890",
    ques: "How to prepare for a job interview?",
    description: `By focusing on Confidence, Competence, Communication, Character, and Chemistry, you can effectively demonstrate your suitability for the role and leave a lasting positive impression on your potential employer.Plan to arrive early. ...
Be prepared to summarize your experience in about 30 seconds and describe what you bring to the position.
Listen carefully to each question asked. ...
Remain positive and avoid negative comments about past employers.
Be aware of your body language and tone of voice.`,
    createdAt: new Date(),
  },
];

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Modified post creation
app.post("/posts", async (req, res) => {
  try {
    const user = await getRandomUser();
    const id = uuidv4();
    console.log(req.body);
    const { naam, question, description } = req.body;

    posts.push({
      id,
      username: user ? user.name.first + " " + user.name.last : "Anonymous",

      userImage: user ? user.picture.thumbnail : "/images/profile.png",
      gender: user.gender,
      streetNumber: user.location.street.number,
      streetName: user.location.street.name,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      email: user.email,
      dob: user.dob.date,
      phone: user.phone,
      ques: question,
      description,
      createdAt: new Date(),
    });
    res.redirect("/posts");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating post");
  }
});
app.get("/posts", (req, res) => {
  const formattedPosts = posts.map((post) => ({
    ...post,
    createdAt: formatDate(post.createdAt),
  }));
  res.render("index.ejs", { posts: formattedPosts });
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  id = id.toString();

  let post = posts.find((p) => id === p.id);
  console.log(post.createdAt);
  res.render("viewPost.ejs", { post });
});

app.get("/posts/:id/user", (req, res) => {
  let { id } = req.params;
  id = id.toString();
  let post = posts.find((p) => id === p.id);
  res.render("viewUser.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newDesciption = req.body.content;
  post.description = newDesciption;
  console.log(newDesciption);
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
