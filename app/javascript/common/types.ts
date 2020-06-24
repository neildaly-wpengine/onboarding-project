import APIConsumer from "./api-consumer"
import { RouteComponentProps } from "react-router-dom"

export type Article = {
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    discardedAt?: string;
    archived?: boolean;
    id?: string;
    user: User;
    link?: string;
    stockImage?: string;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    initialsImageLink: string;
}

export type ConsumerProps = {
    consumer: APIConsumer;
}

interface MatchParams {
    id: string;
}

export interface ArticleDetailMatchParams extends RouteComponentProps<MatchParams> { } 