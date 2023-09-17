import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"


export default function AccountPanel(props: {
    session: Session
}) {

    const [showAccountName, setShowAccountName] = useState(false)
    const [showAccountPanel, setShowAccountPanel] = useState(false)

    return (<>
        <div className="z-40 account mt-6 absolute top-0 right-6 md:top-6 md:right-6 md:mt-0 text-right">

            <OutsideClickHandler onOutsideClick={() => setShowAccountPanel(false)}>
                {(showAccountName || showAccountPanel) && <p className="sm:inline-block hidden px-3 text-slate-600 leading-relaxed text-[14px]">{props.session.user.name}</p>}


                <button onClick={() => setShowAccountPanel(!showAccountPanel)} onMouseOver={() => setShowAccountName(true)} onMouseOut={() => setShowAccountName(false)}>
                    <img className="inline-block rounded-full sm:w-[50px] w-[40px]  mr-0 ml-auto " src={props.session.user.image} />
                </button>

                {showAccountPanel &&
                    // {/* account panel to log out */}
                    <div className="p-5 pb-6  mt-2 rounded-lg bg-[#f9f9f9] shadow-xl">
                        <p className="mb-5 leading-normal text-[14px] text-slate-500">{props.session.user.email}</p>
                        <button onClick={() => signOut()} className="hover:bg-gray-200 mx-auto block border border-sky-700 text-sky-700 font-medium rounded-full p-2 px-3 ">Sign out</button>
                    </div>}

            </OutsideClickHandler>
        </div>
    </>)


}