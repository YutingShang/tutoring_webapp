import { GetServerSidePropsContext } from "next"
import { getSession, signIn, signOut } from "next-auth/react"
import HamburgerMenu from "../components/HamburgerMenu"
import { UserModel } from "../models/user"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import databaseConnect from "../lib/connection"
import Head from "next/head"



export default function Login(props: {
    failedAttempt: boolean,
}) {

    const router = useRouter()   //use this later to decide whether to show 'failed' message

    useEffect(() => {
        if (props.failedAttempt) {       //sign out user if log in unsucessful
            signOut()      //this will refresh the page, run getServerSideProps again, returning { props: {failedAttempt:false} } so the useEffect hook doesnt run again
        }
    }, [])
    //ok some weird glitch happened so i dont know if this method is any good


    return (<>
        <Head>
            <title>Sign in to Administrator account</title>
            <meta name="description" content="login page to administrator account" />
        </Head>

        <HamburgerMenu home aboutMe leaveReview blue />

        <div className="container h-screen text-center">
            <div className="top-1/2 relative translate-y-[-50%]">
                <button onClick={() => signIn("google")} className="bg-sky-700 text-white rounded-lg p-2 px-3 drop-shadow-lg">Continue with Google</button>

                {(router.query.unauthorised === 'true' ?? false)
                    && <div className="mt-16 "><span className="text-[16px] text-slate-700 bg-red-200 p-2 px-4 rounded-full">Your login was unauthorised</span></div>}
            </div>

        </div>

    </>)

}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const session = await getSession(context)
    console.log("Session", session)
    if (!session) {
        return { props: { failedAttempt: false } }         //go back to sign in page
    }

    try {

        await databaseConnect()
        const thisUser = await UserModel.findOne({ email: session.user.email })


        if (!thisUser) {                  //user not found in database
            // console.log("CREATE NEW")
            // await UserModel.create({
            //     name: session.user.name,
            //     email: session.user.email,
            //     image: session.user.image
            // })

            //invalid user  //go back to sign in page - user not allowed. Dont pass session:session props so user login session is dropped
            if (context.query.unauthorised === 'true') {        //if already on ?unauthorised=true, stay on this page, and set failedAttempt=true so they get logged out
                return { props: { failedAttempt: true } }
            }

            //if still on http://localhost/login then redirect to one with the special query parameter
            return { redirect: { permanent: false, destination: "/login?unauthorised=true" } }
        }

    } catch (e) {
        console.log(e)
        return { notFound: true }
    }

    return { redirect: { permanent: false, destination: "/admin" } }     //successful authorised login
}