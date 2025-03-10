import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/user", router)
app.use("/api/blog",blogRouter)

mongoose.connect("mongodb+srv://sandeepdara44:kmss1234@cluster0.ffdhqln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(5000))
.then(()=>console.log("DB Connected and listening on port 5000"))
.catch((err)=>console.log(err))
app.use('/', (req, res) => {
    res.send('Hello World');
});

