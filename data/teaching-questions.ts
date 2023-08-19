enum CardStates{
    Tick,
    Cross
}

const teachingQuestionsArray: {    
    id: number,
    question: string,
    yesChild: number | null,
    noChild: number | null,
    state?:CardStates
}[] = [
    {
        id:1,
        question:"Do you want to learn?",
        yesChild:2,
        noChild:3
    },
    {
        id:2,
        question:"Are you sure?",
        yesChild:4,
        noChild:3
    },
    {
        id:3,
        question:"Why are you still here?",
        yesChild:null,
        noChild:null
    },
    {
        id:4,
        question:"Okay lets get started",
        yesChild:null,
        noChild:null
    },
]

export default teachingQuestionsArray;