import crochetArray from "../data/crochetProjects";

export async function getServerSideProps(context: any){
    const crochetName = context.params.crochetName;
    const crochetProject = crochetArray.find( d => d.name ===crochetName);
    console.log("crochet - project found?", crochetProject)
    if (!crochetProject){
        return {notFound: true}
    }
   
    return {
        props:{
            name: crochetProject.name,
            title: crochetProject.title,
            imageUrl: crochetProject.imageUrl,
            description : crochetProject.description,

        }

    }
}

export default function CrochetPage(props:{
    title: string,
    imageUrl : string,
    description: string,
}){
    return(<>
    <h1>{props.title}</h1>
    <img className = "crochet-image" src = {props.imageUrl}/>
    <p>{props.description}</p>
    <a href = "/">Home</a> <br/>
    <a href = "/hobbies">Back</a>
    </>)

}