import parse from 'html-react-parser';

export default function ContentCard(props:{
    link: string,
    image: string,
    alt: string,
    title: string,
    description : string,
}){
    const titleEffects = parse(props.title);
    const descriptionEffects = parse(props.description);
    return (<>
        <a href={props.link} className="content-wrapper">
                        <div className="content-box">

                            <img src={props.image} alt={props.alt} />

                            <h2>{titleEffects}
                            </h2>
                            <p>{descriptionEffects}</p>

                        </div>
                    </a>
    
    </>)
}