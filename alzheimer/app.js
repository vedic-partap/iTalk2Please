/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
var cnt = 0;  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
var story1 = "One day you went hunting with your brother and your brother fall into the river. You somehow resuced him. After that day your brother fears of hunting.";
// Create your bot with a function to receive messages from the user



var father = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU0OTIxMTE5MjQ3/prince-charles-9244936-1-402.jpg";
var mother = "https://www.hellomagazine.com/imagenes/healthandbeauty/makeup/2018081361126/princess-diana-beauty-tips/0-290-977/princess-diana-beauty-t.jpg";
var daughter = "https://cdn.images.express.co.uk/img/dynamic/106/590x/1058125_1.jpg?r=1544653087120";
var pic1 = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prince-charles-birthday-portrait-1542209906.jpg";
var pic2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8a9dercCKVHS5sWS7IGIG43dg0dPkdxRxCqwQ4PVObYzTbGL";
var pic3 = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prince-charles-prince-william-and-prince-harry-pose-for-news-photo-52512633-1541862315.jpg";
var pic4 = "";
var watch = "";
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hi !! This is Gwen\n What your name ??");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send("Welcome ! What a lovely name :)")
        builder.Prompts.choice(session, "Wanna Talk !!", "Yes|Later sometime", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if(session.message.text=="Yes"){
            session.send("Wow ! Great :)");
            session.beginDialog('routine');
        }
        else{
            builder.Prompts.text(session, "Ohh.. You must be busy ! Lets catch up some other time ;)");
        }
    }
]);
bot.dialog('routine', [
    function (session) {
        builder.Prompts.choice(session, "Have you bathe yourself ?? I love bathing, it's make my skin glowing xD","Yes !!|No :("  ,{ listStyle: builder.ListStyle.button });
    },
    function (session) {
        if(session.message.text=="Yes !!"){
            session.send("So Nice !! I am sure you must be looking like a queen !!"); 
        }
        else{
            session.send("Ohh.... But I know that you loves to bathe yourself");
        }
        builder.Prompts.choice(session, "Aren't you hungry !!","Definately Yes !!|Neah :(" , { listStyle: builder.ListStyle.button });
    },
    function (session) {
        if(session.message.text=="Definately Yes !!"){
            session.send("Why shouldn't you go and have something !!"); 
        }
        else{
            session.send( "Same here");
            session.beginDialog("memories")
        }
    }
    
]);
bot.dialog('memories', [
    function (session) {
        builder.Prompts.choice(session, "You remember "+story1, "Yup|I can't" ,{ listStyle: builder.ListStyle.button });
    },
    function(session){
        if(session.message.text=="Yup"){
            session.send("You have a great memory !!"); 
        }
        else{
            session.send("Ohhh... Why don't know ask someone about that !\nYou would feel good ;)");
        }
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("Really close to you !!")
                .images([builder.CardImage.create(session, father)])
        ]);
        session.send(msg);
        builder.Prompts.choice(session,"I was wondering who is he !! You must remember him, Do you ??","Yes|No",{ listStyle: builder.ListStyle.button });
    },
    function(session){
        if(session.message.text=="Yes"){
            session.send("Great !! He is your father "); 
        }
        else{
            session.send("He is your father !! ");
        }
        session.send("Let me ask you another question !!");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("You love her very much !!")
                .images([builder.CardImage.create(session, mother)])
        ]);
        session.send(msg);
        builder.Prompts.choice(session,"Do you rember her ?? Give a try ..","Yes|No",{ listStyle: builder.ListStyle.button });
    },
    function(session){
        if(session.message.text=="Yes"){
            session.send("Great !! She is your mother, Cool!!"); 
        }
        else{
            session.send("He is your mother !!");
        }
        session.send("Your are doing very well !! Try once more ...");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("You love her very much !!")
                .images([builder.CardImage.create(session, daughter)])
        ]);
        session.send(msg);
        builder.Prompts.choice(session,"She is your daughter !! Do you rember playing with her !!","Yes|No",{ listStyle: builder.ListStyle.button });
    },
    function(session){
        if(session.message.text=="Yes"){
            session.send("Great !! She is very pretty "); 
            session.beginDialog("background");
        }
        else{
            builder.Prompts.text(session, "Why don't you go and play with her now");
        }
    }
]);
bot.dialog('background', [
    function (session) {
        builder.Prompts.choice(session, "Let me ask !! What's your college name ?? ","University of St Andrews|Oxford University|Stanford University|University of Glasgow"  ,{ listStyle: builder.ListStyle.button });
    },
    function (session) {
        if(session.message.text=="University of St Andrews"){
            session.send("Very nice !!"); 
        }
        else{
            session.send("NO NO !! It is University of St Andrews. You were a wonderful student !!");
        }
        session.send("Let's see some of your favourite pictures !!" , { listStyle: builder.ListStyle.button });
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, pic1)]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,pic2)]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,pic3)])
            // new builder.HeroCard(session)
            //     .images([builder.CardImage.create(session, pic4)])                   
        ]);
        session.send(msg);
        builder.Prompts.choice(session,"Do you like it ??","That's Great, Thankyou|I can't connect much", { listStyle: builder.ListStyle.button });
    },
    function(session){
        if(session.message.text=="That's Great, Thankyou"){
            session.send("My pleasure !!"); 
        }
        else{
            session.send("No problem !!! We'll do this again, You will surely remember !!!");
        }
    session.beginDialog("News");
    }
]);
bot.dialog('News',[
   function (session,results){
       if(cnt==0){
           session.send("That's fun !!");
           session.send("You are doing very well");
           session.send("Lets' see some of the cool News !!");
       }
       if(cnt<=6){
           var fs = require('fs');
           var url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=512181d8dbee4300b821ee580dee6cc7";
           var request = require('request');
           request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   var importedJSON = JSON.parse(body);
                   var msg = new builder.Message(session);
                    msg.attachmentLayout(builder.AttachmentLayout.carousel)
                    msg.attachments([
                    new builder.HeroCard(session)
                        .title("%s", importedJSON.articles[cnt].title)
                        .subtitle("%s",importedJSON.articles[cnt].author)
                        .images([builder.CardImage.create(session, importedJSON.articles[cnt].urlToImage)])
                        .text("%s",importedJSON.articles[0].description)
                        .buttons([builder.CardAction.openUrl(session, importedJSON.articles[cnt].url, "Full Story")
                        ]),
                    ]);
                    cnt=cnt+1;
                    session.send(msg);
                    builder.Prompts.choice(session, "More Similar stories", "Yes|No", { listStyle: builder.ListStyle.button });        
                }
                else{
                    session.send("No great news today :( ");
                session.beginDialog('Real_World');
                    }
                });
       }
       else{
           session.send("That's it for today !!");
           session.beginDialog('Real_World');
       }
       
       
   },
   function(session,results){
       if(session.message.text=="No"){
           cnt=0;
           session.beginDialog('Real_World');
       }
       else{
           session.beginDialog('News');
       }
   }
]);
bot.dialog('Real_World',[
   function(session,results){
       session.send("Cool news !");
       session.send("Did I have tell you that I have grand-daughter name Julia. Her birthday is comming.");
       session.send("Could you suggest me what gift should I gave to her ??");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://cdn.lingokids.com/system/images/W1siZiIsIjIwMTcvMDkvMjkvMTAvMTcvMTQvOTIyM2NkNmYtNDc0Ni00NWYzLThjOTMtNGVkZjkwNWFiOWE4L1RveVRyYWluLnBuZyJdLFsicCIsInRodW1iIiwiMjI1eDI1NT4iXV0/d24d288600952700/ToyTrain.png')])
                .buttons([
                    builder.CardAction.imBack(session, "Train Set", "Train Set")
                ]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://cdn.lingokids.com/system/images/W1siZiIsIjIwMTcvMDkvMjkvMTAvMTEvMjgvMDY2NTQxN2ItNzY1OS00MWI1LWFlYzQtNDQ4M2RhMThhYzJhL0xpdHRsZSBob3JzZS5wbmciXSxbInAiLCJ0aHVtYiIsIjIyNXgyNTU-Il1d/e9dfb6d415ff7c28/Little%20horse.png')])
                .buttons([
                    builder.CardAction.imBack(session, "Rocking Horse", "Rocking Horse")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://cdn.lingokids.com/system/images/W1siZiIsIjIwMTcvMDkvMjkvMTAvMTMvMjIvOTM4NjBiMGUtZDJmMi00Y2Y4LWFiZGUtMzZhZmZhZDk0ZGNkL0RvbGwucG5nIl0sWyJwIiwidGh1bWIiLCIyMjV4MjU1PiJdXQ/9683ffab1ad56d8e/Doll.png')])
                .buttons([
                    builder.CardAction.imBack(session, "Doll", "Doll")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://cdn.lingokids.com/system/images/W1siZiIsIjIwMTcvMTIvMDEvMTYvMDIvMjUvMWFlYTcwZTEtZTlmYi00YWExLTlhN2QtYmQ5ZGJkMThkODkzL0NyYXlvbnMucG5nIl0sWyJwIiwidGh1bWIiLCIyMjV4MjU1PiJdXQ/667f4c4a1710be88/Crayons.pngg')])
                .buttons([
                    builder.CardAction.imBack(session, "Crayons", "Crayons")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://cdn.lingokids.com/system/images/W1siZiIsIjIwMTcvMDkvMjkvMTAvMTYvMTkvZGMxN2FmYmUtMzg0ZS00ZjRkLTk0MjUtYjg3NDFhMGEzOGI2L1RlZGR5QmVhci5wbmciXSxbInAiLCJ0aHVtYiIsIjIyNXgyNTU-Il1d/7a64da829c0eee21/TeddyBear.png')])
                .buttons([
                    builder.CardAction.imBack(session, "Teddy Bear", "Teddy Bear")
                ]),
                     
        ]);
        session.send(msg);
        builder.Prompts.text(session,"Help Me !!");
   },
   function(session,results){
       session.send("Nice !! Great Choice, I was thinking of the same ");
       session.beginDialog("game");
   }
]);
bot.dialog('game',[
   function(session){
       session.send("I love talking to you. You are awesome");
       builder.Prompts.text(session,"See you later");
       
   }
  
]);
