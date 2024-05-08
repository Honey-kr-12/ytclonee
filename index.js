import express from "express"
import dontenv from "dotenv"
import connectionToDatabase from "./db/connectionToDatabase.js"
import userRoutes from './Routes/user.js'
import cors from 'cors'
import bodyParser from "body-parser"
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import paymentRoutes from './Routes/payment.js'
import path from 'path'
import requestIp from 'request-ip'

const quantity = 25;
const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
}

dontenv.config();

const app=express()
app.use(cors(corsConfig));
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
// app.use('/uploads',express.static(path.join('uploads')))
app.options("", cors(corsConfig))
const __variableOfChoice = path.resolve();


app.get('/',(req,res) => {
    app.use(express.static(path.resolve(__variableOfChoice, "client", "build")));
    res.sendFile(path.resolve(__variableOfChoice, "client", "build", "index.html"));
})

app.use(bodyParser.json());
app.set('trust proxy', true);
app.use(requestIp.mw());
app.use('/user',userRoutes);
app.use('/video',videoRoutes);
app.use('/comment',commentsRoutes);
app.use('/premium/api/subscriptions',paymentRoutes);
// app.use('/api/create-subscription-checkout-session',async);


// app.use(express.static(path.join(__variableOfChoice, "/client/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__variableOfChoice, "client", "build", "index.html"));
//   });

const PORT = process.env.PORT;
app.listen(PORT,() => {
    connectionToDatabase();
    console.log("server is running ",PORT)
})