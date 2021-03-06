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
    [key: string]: any
}

export type AuthenticatedProps = {
    authenticated: boolean;
    currentUserID: string
}

export type User = {
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
    initialsImageLink?: string;
}

export type ConsumerProps = {
    consumer: APIConsumer;
}

interface MatchParams {
    id: string;
}

export interface ArticleDetailMatchParams extends RouteComponentProps<MatchParams> { }

export interface ArticleListLocationState extends RouteComponentProps
    <{}, any, { message: string }> {
} { }

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

export type LoginUser = {
    email: string,
    password: string,
}

export type LoginBody = {
    user: LoginUser
}

export type NavbarProps = {
    authenticated: boolean,
    notifyLogout(): void,
    consumer: APIConsumer,
    userInitials?: string
}

export type LogoutResponse = {
    data: {
        status: number,
        loggedOut: boolean
    }
}

export type AuthStore = {
    authenticated: boolean,
    user: User
}

export type AuthProps = {
    consumer: APIConsumer,
    notifyLogin(authStore: AuthStore): void
}

export type CollapsibleAlertProps = {
    showAlert: boolean,
    severity: "error" | "success" | "info" | "warning" | undefined,
    closeAlert(): void,
    message: string
}

export type AuthStoreProps = {
    authStore: AuthStore;
}

export type ArticleContent = {
    title: string,
    content: string,
    userId: string
    [key: string]: string
}

export type CreateArticleBody = {
    article: ArticleContent
}

export interface DeleteResponse {
    data: {
        id: string,
        discardedAt: string,
        message?: string
    }
}
