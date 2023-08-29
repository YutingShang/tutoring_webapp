import { ReactNode } from "react";

export default function SelectOption(props:{
    children:ReactNode
}){
    return (<>
    <div className="  w-40 min-w-fit px-4 py-2 hover:bg-gray-200 bg-gray-50 border-slate-200 rounded-lg">{props.children}</div>
    </>)
}