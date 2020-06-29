import axios, { AxiosResponse } from "axios";
import { Article, RegistrationBody, Registration } from "./types";
import humps from 'humps';
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

            return humps.camelizeKeys(response) as Registration;
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
