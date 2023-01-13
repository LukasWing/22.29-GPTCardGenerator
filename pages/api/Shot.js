class Shot{
    text = "";
    question = "";
    constructor(text, question){
        this.text = text;
        this.question = question;
    }
    getQuestion(){
        return this.question;
    }
    getText(){
        return this.text;
    }
    toString(){
        return `Text: ${text} \n 
                Question: ${question}
                `;
    }   
    
}