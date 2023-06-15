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
    role?: string
    phone?: string | number
    email?: string
    firstname?: string
    lastname?: string
    address?: string
    verification?: boolean
    password?: string
}

export interface UserI {
    id: string
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