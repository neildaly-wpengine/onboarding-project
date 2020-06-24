import APIConsumer from "./api-consumer"

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