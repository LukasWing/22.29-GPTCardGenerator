class Prompt{
    shots = [];
    goal = "";
    text = "";
    constructor(goal, shots, text){
        this.goal = goal;
        this.shots = shots;
        this.text;
    }
    toString(){
        return `${this.goal} \n \n
                ${this.shots.map(shot => shot.toString())} \n \n
                ${this.text} \n 
                "Question:
                `;
    }
}