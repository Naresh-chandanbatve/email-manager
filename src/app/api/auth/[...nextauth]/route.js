import NextAuth, {Account, User as AuthUser} from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const authOptions = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
            params: {
              access_type: "offline",
              prompt: "consent",
            },
          }
        }),
      ],
      callbacks: {
         async signIn(){
            return true;
         },
      },

    
  });
  
  export { authOptions as GET, authOptions as POST };