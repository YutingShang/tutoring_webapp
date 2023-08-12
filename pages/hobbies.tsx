import crochetArray from "../data/crochetProjects";

export default function Index() {

    return (
        <>
            <div id = "container">
              
                <h1>Hello World!</h1>
                <p>This is the hobbies page.</p>
                <a href = "/">Back</a>
           <p>Here is a list of my micro-crochet projects:</p>
           <ul>
            
           </ul>
{crochetArray.map(proj => <li><a href={proj.name}>{proj.title}</a></li>)}
            </div>

        </>
    );
}
