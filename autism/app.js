// <reference path="typings/node/node.d.ts"/>
/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var cnt = 0;
// Setup Restify Server
var server = restify.createServer(); 
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
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
var happyUrl = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/grinning-face-with-smiling-eyes.png';
var sadUrl = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/frowning-face.png';
var surprisedUrl = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/astonished-face.png';
var angryUrl = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/angry-face.png';
var cryingUrl = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/loudly-crying-face.png';
// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session,"Welcome !! You are looking Good, Today !\nWhats Your name ?");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send("Let's chat !!\nSurely, You like cartoons");
        builder.Prompts.choice(session, "Do you like Donald Duck ?", "Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(session.message.text=="Yes"){
            session.send("How sweet of you\nWhat a wondeful choice :)");
            session.beginDialog('cartoons');
        }
        else{
            builder.Prompts.choice(session, "Oh ! So are you a Doremon fan ?", "Yes|No", { listStyle: builder.ListStyle.button });
        }
    },
     function(session,results){
        if(session.message.text=="Yes"){
            session.send("Wow ! Great :)");
            session.beginDialog('cartoons');
        }
        else{
            builder.Prompts.choice(session, "Hmmm.. So you love Chota Bheam ?", "Yes|No", { listStyle: builder.ListStyle.button });
        }
    },
     function(session,results){
        if(session.message.text=="Yes"){
            session.send("Wow ! I also love Chotta Bheam :)");
            session.beginDialog('cartoons');
        }
        else{
            builder.Prompts.text("Oh... Boy ! What do you like to watch ?");
        }
    },
     function(session,results){
        session.send("I will start watching it !");
        session.beginDialog('cartoons');
    }
]);
bot.dialog('cartoons', [
    function (session,results){
        {
              builder.Prompts.choice(session,"Tell me dear , what do you like to eat ? ","Half fry|Boiled Egg|Vegetables|Cake|Pizza",{ listStyle: builder.ListStyle.button });
        }
      
    },
    function (session, results){
       session.send("Yummy ! That's so delicious");
       session.send("I think you are enjoying this very much !");
       session.send("Something that you wear ");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://i.ebayimg.com/images/i/272726343393-0-1/s-l1000.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "T-Shirst and Jeans", "T-Shirst and Jeans")
                ]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'http://cdn3.foodviva.com/static-content/food-images/south-indian-recipes/dosa-recipe/dosa-recipe.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "My lovely Dosa", "Dosa")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://n3.sdlcdn.com/imgs/b/j/z/Pioneer-Super-Jet-Kid-Cycle-SDL008330286-1-94438.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Bike", "Cycle")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://images-na.ssl-images-amazon.com/images/I/51Qs2KlKPWL._SX425_.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Table", "Table")
                ]),     
       
        ]);
        session.send(msg);
        builder.Prompts.text(session,"Try");
    },
    function (session, results){
        if(session.message.text=="T-Shirst and Jeans"){
            session.send("Thats right. I am assure you will look cute in this ;)");
            session.send("Wanna try again !! That would be fun ");
            
        }
        else{
            session.send("Nice try but I think you you can't wear ",session.message.text);
            session.send("Lets try again !!");
        }
        session.send("Something that you use to write ");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://images-na.ssl-images-amazon.com/images/I/81TN6Q2iE0L._SY355_.png')])
                .buttons([
                    builder.CardAction.imBack(session, "Cute Doremon", "Doremon")
                ]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU8VVkTR2equkit7GKCsIgp8tXZRoJ6nm_AZckC7C5P66hRX5m')])
                .buttons([
                    builder.CardAction.imBack(session, "Television", "Television")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://images-na.ssl-images-amazon.com/images/I/61TrT6dIUlL._SX425_.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Pencil", "Pencil")
                ]),
           new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://m.xcite.com/media/catalog/product/cache/1/thumbnail/550x400/9df78eab33525d08d6e5fb8d27136e95/5/0/502037-2_result.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Apple Pencil", "Apple_pencil")
                ]),     
       
        ]);
        session.send(msg);
        builder.Prompts.text(session,"Give it a try");
    },
    function(session,results){
        if(session.message.text=='Pencil'){
            session.send("Wonderful !! You got it right");
        }
        else if(session.message.text=='Apple_pencil'){
            session.send("Hmm... You are more of a Ipad Person ");
        }
        else{
            session.send("Interesting . . . it’s not exactly what you can use for writing !");
        }
        
       session.beginDialog('News');
    }
    
]);

bot.dialog('News',[
   function (session,results){
       if(cnt==0){
           session.send("That's fun !!");
           session.send("You have leaned things to wear and things to write !");
           session.send("Lets' see some of the cool Tech News !!");
       }
       if(cnt<=6){
           var fs = require('fs');
           var url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=512181d8dbee4300b821ee580dee6cc7";
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
       session.send("Did I have tell you that I have friend name Jake.She had a brthday today.");
       session.send("What gift should I give to him ??");
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
       session.send("Nice !! Great Choice");
       session.send("Also before going to Jake's Birthday Party I want to complete my homework !!");
       session.send("Please Help me to count the number of Beads ");
       var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, 'https://i.pinimg.com/736x/65/af/d4/65afd4dd71d917649e471643a2b32110--pet-rocks-stone-painting.jpg')])
        ]);
        session.send(msg);
        builder.Prompts.number(session,"Count ?");
   },
   function(session, results){
       if(session.message.text=="10"){
           session.send("Great Works !! I am impressed");
       }
       else{
           session.send("Full marks for effort but Correct Answer is 10");
       }
       session.beginDialog('Reactions');
   }
]);

bot.dialog('Reactions',[
    function (session, results){
        session.send("Awsome !!!");
        session.send("Lets try some of the reactions, try to copy these ");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("Mummy got me Candies")
                .images([builder.CardImage.create(session, 'https://media.tenor.com/images/b2034b756388e63aeecc89dc1705d043/tenor.gif')])
        ]);
        session.send(msg);
        session.send("What a laugh ");
        builder.Prompts.choice(session, "Do you like it ?", "Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(session.message.text=="Yes"){
            session.send("I know !!");
        }
        else{
            session.send("Sorry I will try to improve.");
        }
        session.send("Lets try again.");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("I lost my pencil ;(")
                .images([builder.CardImage.create(session, 'http://www.reactiongifs.com/r/tbss.gif')])
        ]);
        session.send(msg);
        session.send("Don't be sad !");
        builder.Prompts.choice(session, "Was you able to judge ?", "Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(session.message.text=="Yes"){
            session.send("You are wonderful !!");
        }
        else{
            session.send("Don't feel bad");
        }
        session.send("Lets try again. This time you will be 'surprised' ");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("Woo")
                .images([builder.CardImage.create(session, 'https://media.giphy.com/media/oyF8cKgNtlYNG/giphy.gif')])
        ]);
        session.send(msg);
        session.send("What just Happened !");
        builder.Prompts.choice(session, "Do you got surprised ?", "Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(session.message.text=="Yes"){
            session.send("Good for you!!");
        }
        else{
            session.send("Hmmm...");
        }
        session.send("Wanna get angry");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .subtitle("I am angry 😠")
                .images([builder.CardImage.create(session, 'https://typeset-beta.imgix.net/lovelace/uploads/315/0b7b3bd0-a451-0134-ce90-0aec1efe63a9.gif')])
        ]);
        session.send(msg);
        session.send("Cool Down !");
        builder.Prompts.choice(session, "Great excercise ?", "Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(session.message.text=="Yes"){
            session.send("Thanks")
        }
        else{
            session.send("Sorry, Next time I will do better");
        }
        session.send("Lets play Game ");
        session.send("Yesterday was my friend Emily's birthday, how was she feeling ?");
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, sadUrl)])
                .buttons([  builder.CardAction.imBack(session, "Sad", "Sad" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,angryUrl)])
                .buttons([  builder.CardAction.imBack(session, "Angry", "Angry" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,happyUrl)])
                .buttons([  builder.CardAction.imBack(session, "Happy", "Happy" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, surprisedUrl)])
                .buttons([  builder.CardAction.imBack(session, "Surprised", "Surprised" )])                     
        ]);
        builder.Prompts.text(session,msg);
    },
    function(session,results){
        if(session.message.text=="Happy"){
            session.send("Nice")
    }
        else{
            session.send("I think she was happy");
        }
        session.send("But her parents forgot to wish her 'Happy Birthday' ");
        session.send("How was she feeling ?")
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,cryingUrl)])
                .buttons([  builder.CardAction.imBack(session, "Crying", "Crying" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, surprisedUrl)])
                .buttons([  builder.CardAction.imBack(session, "Surprised", "Surprised" )]), 
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, sadUrl)])
                .buttons([  builder.CardAction.imBack(session, "Sad", "Sad" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,happyUrl)])
                .buttons([  builder.CardAction.imBack(session, "Happy", "Happy" )])
                    
        ]);
        builder.Prompts.text(session,msg);
    },
        function(session,results){
        if(session.message.text=="Sad"){
            session.send("Right, she was sad.")
        }
        else{
            session.send("No, She was sad.");
        }
        session.send("At Night When Emily came back home from playing, she saw a birthday party organised by her parents");
        session.send("Wow, what do you think about her reaction ?")
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, surprisedUrl)])
                .buttons([  builder.CardAction.imBack(session, "Surprised", "Surprised" )]),             
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,cryingUrl)])
                .buttons([  builder.CardAction.imBack(session, "Crying", "Crying" )]),
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session,happyUrl)])
                .buttons([  builder.CardAction.imBack(session, "Happy", "Happy" )]),            
            new builder.HeroCard(session)
                .images([builder.CardImage.create(session, sadUrl)])
                .buttons([  builder.CardAction.imBack(session, "Sad", "Sad" )])                
        ]);
        builder.Prompts.text(session,msg);
    },
    function(session, results){
        if(session.message.text=="Surprised"){
            session.send("Very Good. You are very good at this game")
        }
        else{
            session.send("Noooo... She was surprised");
        }
        session.send("I love talking to you. You are awesome");
        builder.Prompts.text(session,"See you later");
    }
]);