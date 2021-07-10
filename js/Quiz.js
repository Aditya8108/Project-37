class Quiz{
    constructor(){

    }
    getState(){
        database.ref('gameState').on("value",(data)=>{
            gameState=data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState===0){
            contestant=new Contestant();
            var contestantCountRef=await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()){
                contestantCount=contestantCountRef.val()
            }
            question=new Question();
            question.display();
        }
    }

    play(){
        question.title.hide();
        question.input1.hide();
        question.input2.hide()
        question.button.hide();
        background("yellow");
        textSize(32);
        fill("black");
        text("Result of the Quiz", 300, 50);
        Contestant.getContestantInfo();
        if(allContestant!=undefined){
            textSize(20);
            fill("blue");
            text("*NOTE: Contestant who answered correct are highlighted in green color!", 130, 230);
        }
        for(var person in allContestant){
            var correctAns="2";
            if(correctAns===allContestant[person].answer){
                textSize(24);
                fill("green");
                text(allContestant[person].name + ' :  ' + allContestant[person].answer, 200, 300);
    
            } else {
                fill("red");
                textSize(24);
                text(allContestant[person].name +": " +allContestant[person].answer,200, 330)}
            
            }
        }
    }
