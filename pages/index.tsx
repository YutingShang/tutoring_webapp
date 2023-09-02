import Head from "next/head";
import ContentCard from "../components/ContentCard";
import ReactTypingEffect from 'react-typing-effect';
import cardsArray from '../data/cards';
import HamburgerMenu from '../components/HamburgerMenu';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AccountPanel from '../components/AccountPanel';

export default function Index(props: { session: Session }) {

    return (
        <><Head>
            <title>Xinqi</title>
            <meta name="description" content="Xinqi personal tutoring website" />
        </Head>


            <div className="nav-bar"><span>Xinqi</span></div>
            <HamburgerMenu aboutMe leaveReview admin />
            
            <div className="container">
                {props.session && <AccountPanel session={props.session} />}
                <div className="top-section">

                    <img src="/profile-pic.jpeg" id="prof-pic" />

                    <h1 className="title">Hi, nice to meet you! <br /></h1>

                    <ReactTypingEffect className='title' text="I'm Xinqi." eraseSpeed={100} />
                </div>


                <p>
                    I'm a Natural Sciences graduate from the <b>University of Cambridge</b> where I studied Physical Natural Sciences specialising in Materials Science in my final year.
                </p><br />
                <p>
                    After graduating, I started tutoring online during lockdown on various subjects including Maths, Further Maths, Phyiscs and Chemistry to a range of students, primarily to the GCSE and A-Level cohort.
                </p><br />
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


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) return { props: {} }         //stay on page, without session

    return { props: { session: session } }   //stay on this page
}