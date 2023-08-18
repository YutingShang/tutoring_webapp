import {useState, useEffect} from "react";
import LoadingIcons from 'react-loading-icons'


export default function Index() {
    const [quoteObject, setQuoteObject] = useState<{quote: string, author:string, category: string }|null>(null)
  

    useEffect(()=>{
        fetch('/api/fetch-data')
            .then(res=>res.json())
            .then(data=>setQuoteObject(data))
            .catch(e=>{console.log(e)})
    }, [])

    console.log(quoteObject)

    
    return (
        <>

<div className="nav-bar"><span>Teaching</span></div>
            <div className = "container">
              
                <div className="top-section">
                <a href="/" ><img  src="/profile-pic.jpeg" id="home-circle" /></a>
                {quoteObject? (<>
                <p className="mt-[18px] intro">Random Quote: "{quoteObject.quote}"</p>
                </>):     <LoadingIcons.TailSpin className="mx-auto block mt-[18px]" stroke="#446043" strokeOpacity={1} />}
            
                </div>
                
               
            
             

            </div>

        </>
    );
}
