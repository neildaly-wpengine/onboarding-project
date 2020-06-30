import APIConsumer from "./api-consumer"
import { RouteComponentProps } from "react-router-dom"

export type Article = {
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    discardedAt?: string;
    archived?: boolean;
    id: string;
    user: User;
    stockImage?: string;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    initialsImageLink?: string;
}

export type ConsumerProps = {
    consumer: APIConsumer;
}

export type NotifyAuthProps = {
    toggleAuthentication(): void
}

interface MatchParams {
    id: string;
}

export interface ArticleDetailMatchParams extends RouteComponentProps<MatchParams> { }

export type RegistrationUser = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirmation: string
}

export type RegistrationBody = {
    user: RegistrationUser
}

export type Registration = {
    data: {
        status: string,
        user: User
    }
}

export type NavbarProps = {
    authenticated: boolean,
}

export type LogoutResponse = {
    data: {
        status: number,
        loggedOut: boolean
    }
}
