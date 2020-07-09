import axios, { AxiosResponse } from "axios";
import humps from 'humps';
import {
    Article,
    CreateArticleBody,
    LoginBody,
    LogoutResponse,
    Registration,
    RegistrationBody,
    DeleteResponse
} from "./types";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

class APIConsumer {
    async getAllArticles(): Promise<Article[]> {
        try {
            const response: AxiosResponse = await axios.get("/api/v1/articles");
            const articleData: Article[] = await this.deserializeResponse(response);

            return articleData;
        } catch (e) {
            throw e
        }
    }

    async getSpecificArticle(id: string): Promise<Article> {
        try {
            const response: AxiosResponse = await axios.get(`/api/v1/articles/${id}`);
            const articleData: Article = await this.deserializeResponse(response);

            return articleData;
        } catch (e) {
            throw e;
        }
    }

    async registerNewUser(registrationBody: RegistrationBody): Promise<any> {
        try {
            const decamelizedKeys: RegistrationBody = humps.decamelizeKeys(registrationBody) as RegistrationBody;
            const response: Registration = await axios.post('/api/v1/registrations', decamelizedKeys,
                { withCredentials: true });

            return humps.camelizeKeys(response);
        } catch (e) {
            throw e;
        }
    }

    async destroySession(): Promise<LogoutResponse> {
        try {
            const response: AxiosResponse = await axios.delete('/api/v1/logout');

            return humps.camelizeKeys(response) as LogoutResponse;
        } catch (e) {
            throw e;
        }
    }

    async loginUser(loginBody: LoginBody): Promise<any> {
        try {
            const response: AxiosResponse = await axios.post('/api/v1/sessions', loginBody,
                { withCredentials: true });

            return humps.camelizeKeys(response);
        } catch (e) {
            throw e;
        }
    }

    async createArticle(articleBody: CreateArticleBody): Promise<Article> {
        try {
            const response: AxiosResponse = await axios.post('/api/v1/articles',
                humps.decamelizeKeys(articleBody),
                { withCredentials: true });
            const articleData: Article = await this.deserializeResponse(response);

            return articleData;
        } catch (e) {
            throw e;
        }
    }

    async editArticle(articleBody: CreateArticleBody, articleID: string): Promise<Article> {
        try {
            const response: AxiosResponse = await axios.patch(`/api/v1/articles/${articleID}`,
                humps.decamelizeKeys(articleBody),
                { withCredentials: true });
            const articleData: Article = await this.deserializeResponse(response);

            return articleData;
        } catch (e) {
            throw e;
        }
    }

    async deleteArticle(articleID: string): Promise<DeleteResponse> {
        try {
            const response: AxiosResponse = await axios.delete(`/api/v1/articles/${articleID}`,
                { withCredentials: true });

            return humps.camelizeKeys(response) as DeleteResponse;
        } catch (e) {
            throw e;
        }
    }

    async recoverArticle(articleID: string): Promise<Article> {
        try {
            const response: AxiosResponse = await axios.post(`/api/v1/articles/${articleID}/recover`,
                { withCredentials: true });
            const articleData: Article = await this.deserializeResponse(response);

            return articleData;
        } catch (e) {
            throw e;
        }
    }

    private deserializeResponse = (response: AxiosResponse) => {
        const deserializerOptions = {
            keyForAttribute: "camelCase"
        }
        const deserializer = new JSONAPIDeserializer(deserializerOptions);
        return deserializer.deserialize(
            response.data,
            (_err: any, articlesResponseData: any) => {
                return articlesResponseData;
            }
        );
    }
}

export default APIConsumer;
