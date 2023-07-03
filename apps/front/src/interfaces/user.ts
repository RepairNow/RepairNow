import { JobI } from "./job"

export interface CreateUser {
    role: string
    phone: string | number
    email: string
    firstname: string
    lastname: string
    password: string
}

export interface UpdateUser extends Partial<UserI> {
    id?: string
    role?: string
    phone?: string | number
    email?: string
    firstname?: string
    lastname?: string
    address?: string
    verification?: boolean
    password?: string
}

export interface CurrentUserI {
    email: string,
    firstname: string,
    id: string,
    lastname: string,
    phoneNumber: string,
    role: string
}

export interface UserI {
    sub: string
    role: string
    phone: string | number
    email: string
    firstname: string
    lastname: string
    address: string
    verification: boolean
    password: string
    jobs: JobI[]
}

export interface Signin {
    email: string
    password: string
}

export interface Signup {
    firstname: string
    lastname: string
    email: string
    password: string
    phoneNumber: string
    isContractorRoleAsked?: boolean
}

export interface ResetPassword {
    email: string
}

export interface TokenI {
    access_token: string
    refresh_token: string
    user: UserI
}