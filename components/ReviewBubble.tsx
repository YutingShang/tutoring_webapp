export default function ReviewBubble(props:{
    direction: string,
    text: string,
    subject: string,
    level: string,
    date: string,
    student: string
}){
    return(<>
    
    <div className={props.direction}>
        <div className="speech-bubble">
        <p>{props.text}</p>
        

        </div>
        <div className="under-bubble">

            <p >  {props.subject} {props.level} &nbsp;&nbsp; {props.date}</p>
            {(props.student==="anon")? <p></p> : <p id="student-name">~ {props.student}</p>}
            
        </div>
        
        
    </div>
    
    </>)
}

