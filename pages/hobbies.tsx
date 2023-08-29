import { useState } from "react";
import DescriptionSpan from "../components/DescriptionSpan";
import crochetArray from "../data/crochet";
import origamiArray from "../data/origami";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Hobbies() {
    const [tab, setTab] = useState("crochet");

    return (
        <>
        
                <div className="nav-bar"><span>Hobbies</span></div>

                <HamburgerMenu home aboutMe leaveReview admin/>
                <div className="container hobbies">
                    <div className="top-section">
                    <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                        <p className="intro">I am a very creative person, and in my free time I love to delve into various handicrafts. Feel free to explore some of my creations! </p>
                    </div>


                    <button className={tab === "crochet" ? "tab selected" : "tab"} onClick={() => setTab("crochet")}>Crochet</button>
                    <button className={tab === "origami" ? "tab selected" : "tab"} onClick={() => setTab("origami")}>Origami</button>

                    <div className="tab-section">
                        {(tab === "crochet") ? (
                            <>
                                <p>I'm particularly interested in micro-crochet, creating lots of cute projects!</p>
                                {crochetArray.map(p => <DescriptionSpan key={p.id} image={p.image} description={p.description} />)}


                            </>


                        ) :
                            (
                                <>
                                    <p>I started origami from a young age, I like how a flat sheet of paper can be used to create 3D models</p>
                                    {origamiArray.map(p => <DescriptionSpan key={p.id} image={p.image} description={p.description} />)}

                                </>
                            )
                        }
                    </div>

                </div>



         
        </>
    );
}
