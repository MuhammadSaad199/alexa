import express from "express";
import Alexa, { SkillBuilders } from 'ask-sdk-core';
import morgan from "morgan";
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import mongoose from 'mongoose';
import axios from "axios";

mongoose.connect('mongodb+srv://saad:karachi123@cluster0.bvprn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const Usage = mongoose.model('Usage', {
  skillName: String,
  clientName: String,
  createdOn: { type: Date, default: Date.now },
});

const app = express();
app.use(morgan("dev"))
const PORT = process.env.PORT || 3000;


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = 'Fallback intent: Sorry, I had trouble doing what you asked. Please try again.';
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {

    

    const speakOutput = 'Welcome to first food app';
    const reprompt = 'I am your virtual assistant. you can ask for the menu';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .withSimpleCard("Kababjees", speakOutput)
      .getResponse();
  }
};
const introHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'intro';
    },
    handle(handlerInput) {
  
      
  
      const speakOutput = 'food app';
      const reprompt = 'I am your virtual assistant. you can ask for the menu';
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(reprompt)
        .getResponse();
    }
  };









const skillBuilder = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    introHandler,
  )
  .addErrorHandlers(
    ErrorHandler
  )
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, false, false);

app.post('/api/v1/webhook-alexa', adapter.getRequestHandlers());

app.use(express.json())
app.get('/profile', (req, res, next) => {
  res.send("this is a profile");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
















































// import express from "express";
// import Alexa, {SkillBuilders} from 'ask-sdk-core';
// import morgan from "morgan";
// import{ExpressAdapter} from 'ask-sdk-express-adapter';
// import mongoose from 'mongoose';
// import axios from "axios";





// const Usage = mongoose.model('Usage',{
//     skillName : String,
//     clientName: String,
//     createdOn: {type : Date, default: Date.now},
// });


// const app =express ();
// app.use(morgan("dev"))
// const PORT = process.env.PORT || 4000;





// const skill = skillBuilder.create();
// const adapter = new ExpressAdapter(skill,false , false);

// app.post('/api/v1/webhook-alexa' , adapter.getRequestHandlers());

// app.use(express.json())
// app.get('/profile' , (req , res , next) =>{
//     res.send("this is a profile");
// });

// app.listen(PORT, ()=>{
//     console.log(`server is running on port ${PORT}`)
// })
