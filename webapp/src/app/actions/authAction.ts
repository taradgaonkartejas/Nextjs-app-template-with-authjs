"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error.cause?.err?.message)
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    }
                default:
                    return {
                        message: `${error.cause?.err?.message}`,
                    }
            }
        }
        throw error;
    }
}


export async function handleSignOut() {
    await signOut();
}