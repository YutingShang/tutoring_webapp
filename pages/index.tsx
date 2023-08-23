import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Head from "next/head";
import ContentCard from "../components/ContentCard";
import ReactTypingEffect from 'react-typing-effect';
import AnchorLink from "react-anchor-link-smooth-scroll";
import parse from 'html-react-parser';
import cardsArray from '../data/cards';

export default function Index() {







    return (
        <><Head>
            <title>Xinqi</title>
            <meta name="description" content="Xinqi personal tutoring website" />



        </Head>
            <div className="nav-bar"><span>Xinqi</span></div>

            <div className="dropdown">
                <button type="button" id="menu-button">
                    <FontAwesomeIcon icon={faBars} size="2xl" style={{ color: "#8ba370", }} />
                </button>

                <div className="dropdown-content">
                    <a href="#about-me">About Me</a>
                    <a href="/form">Leave me a review!</a>
                    <a href="/admin">Administrator </a>
                    {/* <AnchorLink className="scroll-links" href='#flex-container'><button>Courses</button></AnchorLink> */}
                </div>

            </div>
            <div className="container">
                <div className="top-section">

                    <img src="/profile-pic.jpeg" id="prof-pic" />

                    <h1 className="title">Hi, nice to meet you! <br /></h1>

                    <ReactTypingEffect className='title' text="I'm Xinqi." eraseSpeed={100} />
                </div>


                <p>
                    I'm a Natural Sciences graduate from the <b>University of Cambridge</b> where I studied Physical Natural Sciences specialising in Materials Science in my final year.
                </p>
                <p>
                    After graduating, I started tutoring online during lockdown on various subjects including Maths, Further Maths, Phyiscs and Chemistry to a range of students, primarily to the GCSE and A-Level cohort.
                </p>
                <p>
                    In September, I will be starting my new job as a Maths teacher at a selective mixed public college.
                </p>

                <hr id="about-me" />


                <div id="flex-container">

                    {cardsArray.map(card => <ContentCard key={card.id} title={card.title} description={card.description} link={card.link} image={card.image} alt={card.alt} />)}

                </div>


            </div>



        </>
    );
}
