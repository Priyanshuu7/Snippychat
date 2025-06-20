import { Account, AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import axios from "axios"
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null; 
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}


export const authOptions: AuthOptions = {
    pages: {
      signIn: "/",
    },

    callbacks:{
      async signIn({ user, account}:{user:CustomUser,account:Account|null}) {
        try {
          console.log("this is the user" , user)
          console.log("this is the account ", account)

          if (!LOGIN_URL) {
            console.error("LOGIN_URL is not defined");
            return false;
          }

          const Payload = {
            email: user.email,
            name: user.name,
            oauth_id: account?.providerAccountId,
            provider: account?.provider, 
            image: user?.image,
          }
 
          console.log("Attempting to login with payload:", Payload);
          const {data} = await axios.post(LOGIN_URL, Payload);
          console.log("Login response:", data);

          user.id = data?.user?.id.toString()
          user.token = data?.user?.token
          user.provider = data?.user?.provider

          return true
        } 
        catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      async session({ session, token }: { session: CustomSession, user: CustomUser, token: JWT }) {
        session.user = token.user as CustomUser;
        return session;
      },
      
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token
      },
    
    },
   
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        }),
      ],
    };