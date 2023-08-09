import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

export default function Index() {
    return (
        <>
            <div id="nav-bar"><span>Xinqi Shang</span></div>
            <div id="container">
                <div id="top-section">
                    
                    <button type="button" id="menu-button">Menu</button>
                    <img src="/chailey-leavers.jpg" id="prof-pic" />
                    <h1>Hi, nice to meet you!<br />I'm Xinqi.</h1>
                </div>

                {/* <a href = "/test">Link to another page</a>
                <h1>Hello World!</h1>
                <p>This is a starter template you can use for Web Dev for Makers projects.</p>
                <img src="/logo.png" alt="Web Dev for Makers Logo" /> */}
                <p>
                    I'm a Natural science graduate from the <b>University of Cambridge</b> where I studied physical natural sciences specialising in material science in my final year
                </p>
                <p>
                    After graduating, I spent the covid years tutoring online for various subjects including maths, phyiscs and chemistry for a range of students, primarily at the GCSE to ALevel stages.
                </p>
                <p>
                    In September, I will start my new job as a math teacher at <a href="https://www.lancingcollege.co.uk/"><b>Lancing College</b></a>,  and I will also be dedicating half of my time to the <b>PGCE</b> course
                </p>

                <hr />
                <a href="https://peppapigworld.co.uk/pages/george-pig" className="student-wrapper">
                    <div className="student-box">
                    <FontAwesomeIcon className="badge" icon={faCertificate} size='2xl' style={{ color: "#f6d609", }} />
                        <img src="/andy.png" alt="a pink cartoon pig on a green background" />

                        <h2>Andy 
                            
                
                        </h2>
                        <p>Feedback "Xinqi helped me start the anti-crime gang at school"</p>
                    </div>
                </a>

                <a href="https://peppapigworld.co.uk/pages/danny-dog" className="student-wrapper">
                    <div className="student-box">
                        <FontAwesomeIcon className="badge" icon={faCertificate} size='2xl' style={{ color: "#f6d609", }} />
                        <img src="/darren.png" alt="a brown cartoon dog on a green background" />
                        <h2>Darren</h2>
                        <p>Feedback "Xinqi told me to buy some wires, so I bought them off taobao. She hasn't told me what to do with them yet"</p>
                    </div>
                </a>
             

            </div>



        </>
    );
}
