import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/userSchema";
import prisma from "./lib/prisma";
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
           
            async authorize(credentials) :Promise<any> {
                try {
                    const parsedCredentials = await signInSchema.parseAsync(credentials);
                    const user = await prisma.user.findUnique({
                        where: {
                            email: parsedCredentials.email
                        },
                        select:{
                            id:true,
                            email:true,
                            password:true,
                            firstName:true,
                            lastName:true,
                            role:true
                        }
                    })
                    if (!user) {
                        throw new Error("User not found")
                    }
                    const isValidUser = await bcrypt.compare(parsedCredentials.password, user.password);

                    if (isValidUser) {
                        return user;
                    } else {
                        throw new Error("Invalid password")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const role = auth?.user.role || 'user';
            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            if (pathname.startsWith("/page2") && role !== "admin") {
                return Response.redirect(new URL('/', nextUrl));
            }
            return !!auth;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id?.toString(),
                    token.email = user.email,
                    token.firstName = user.firstName,
                    token.lastName = user.lastName,
                    token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                    session.user.id = token.id as string,
                    session.user.email = token.email  as string,
                    session.user.firstName = token.firstName  as string,
                    session.user.lastName = token.lastName  as string,
                    session.user.role = token.role  as string
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/signin"
    }
})

