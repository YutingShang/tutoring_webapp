import { GetServerSidePropsContext } from "next"
import {getSession, signIn} from "next-auth/react"
import HamburgerMenu from "../components/HamburgerMenu"

export default function Login(){

    return (<>
    <HamburgerMenu home aboutMe leaveReview blue/> 
    <div className="container h-screen text-center">
        <div className="top-1/2 relative translate-y-[-50%]">
    <button onClick={()=>signIn("google")} className="bg-sky-700 text-white rounded-lg p-2  drop-shadow-lg">Sign in</button>
    </div></div>
    </>)
    
}

export async function getServerSideProps(context:GetServerSidePropsContext){
    const session = await getSession(context)
    if (!session) return {props:{}}         //go back to sign in page
    return {redirect :{permanent: false,destination :"/admin"}}
}