import { randUser } from "@ngneat/falso"
import { IUser } from "../models/user"

export const seedUsers = async ()=>{
    for (let i =0; i<50;i++){
        const userMainDetails = randUser()
        console.log(userMainDetails)
        const user: Partial<IUser> = {}
        user.firstName =userMainDetails.firstName
        user.lastName = userMainDetails.lastName
        user.email = userMainDetails.email
        

    }
}