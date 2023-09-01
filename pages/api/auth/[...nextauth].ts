import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

// export default NextAuth({        //set up NextAuth to handle authentication, after google login redirects to this API route
//     providers:
//         [GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//             authorization: {       //to get account selection page each time
//                 params: {
//                   prompt: "consent",
//                   access_type: "offline",
//                   response_type: "code"
//                 }
//             }
//         })
//     ]   
// })

export const authOptions={        //set up NextAuth to handle authentication, after google login redirects to this API route
    providers:
        [GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {       //to get account selection page each time
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ]   
}

export default NextAuth(authOptions)