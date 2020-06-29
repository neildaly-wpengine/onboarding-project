import axios, { AxiosResponse } from "axios";
import { Article } from "./types";
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
