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
        // ...add more providers here
      ],
      callbacks: {
         async signIn(){
            return true;
         },
      },

    //     async signIn({ user, account }) {
    
    //         if (account && account.provider === "google") {
    //             await connect();
    //             try {
    //                 const existingUser = await User.findOne({ email: user.email });
    //                 if (!existingUser) {
    //                     const newUser = new User({
    //                         email: user.email,
    //                     });
    
    //                     await newUser.save();
    //                     return true;
    //                 }
    //                 return true;
    //             } catch (err) {
    //                 console.log("Error saving user", err);
    //                 return false;
    //             }
    //         }
    //     },
    // }
    
  });
  
//   export const handler = NextAuth(authOptions);
  export { authOptions as GET, authOptions as POST };