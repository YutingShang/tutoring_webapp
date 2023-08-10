import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import Head from "next/head"

export default function Index() {
    return (
        <><Head>
            <title>Xinqi</title>
            <meta name="description" content="Xinqi personal tutoring website"/>
            
    

        </Head>
            <div id="nav-bar"><span>Xinqi</span></div>
            <div id="container">
                <div id="top-section">

                    <button type="button" id="menu-button">Menu</button>

                    <img src="/profile-pic.jpeg" id="prof-pic" />

                    <h1>Hi, nice to meet you!<br />I'm Xinqi.</h1>
                </div>

              
                <p>
                    I'm a Natural Sciences graduate from the <b>University of Cambridge</b> where I studied Physical Natural Sciences specialising in Materials Science in my final year.
                </p>
                <p>
                    After graduating, I started tutoring online during lockdown on various subjects including Maths, Further Maths, Phyiscs and Chemistry to a range of students, primarily to the GCSE and A-Level cohort.
                </p>
                <p>
                    In September, I will be starting my new job as a Maths teacher at a local college.
                </p>

                <hr />


                <div id="flex-container">
                    <a href="/feedback" className="content-wrapper">
                        <div className="content-box">

                            <img src="/chat-bubbles.jpeg" alt="white sticky notes with blue speech marks " />

                            <h2>Student <br/> Reviews
                            </h2>
                            <p>Helping students gain the grades they aspire</p>

                        </div>
                    </a>

                    <a href="/teaching" className="content-wrapper">
                        <div className="content-box">

                            <img src="/ideas.jpeg" alt="a blackboard with chalk drawings of ideas radiating out from a light bulb in the middle" />
                            <h2>Teaching methodology</h2>
                            <p>Tailored to students of individual abilities</p>
                        </div>
                    </a>

                    <a href="/hobbies" className="content-wrapper">
                        <div className="content-box">

                            <img src="/crochet-green.png" alt="a pair of dangling cherry crochet earings against a matcha green background with a reel of string and crochet hook in the foreground " />
                            <h2>Hobbies and interests</h2>
                            <p>Hands on crafts with overloaded <i>cuteness</i></p>

                        </div>
                    </a>

                </div>


            </div>



        </>
    );
}
