import axios, { CancelTokenSource, AxiosResponse } from "axios";
import { Article } from "./types";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

class APIConsumer {
    async getAllArticles(source: CancelTokenSource): Promise<Article[]> {
        return await axios
            .get("/api/v1/articles", { cancelToken: source.token })
            .then((articlesResponse) => {
                return this.deserializeResponse(articlesResponse);
            });
    }

    async getSpecificArticle(source: CancelTokenSource, id: string): Promise<Article> {
        return await axios.get(`/api/v1/articles/${id}`, { cancelToken: source.token })
            .then((articlesResponse) => {
                return this.deserializeResponse(articlesResponse);
            });
    }

    private deserializeResponse = (response: AxiosResponse) => {
        return new JSONAPIDeserializer({
            keyForAttribute: "camelCase",
        }).deserialize(
            response.data,
            (_err: any, articlesResponseData: any) => {
                return articlesResponseData;
            }
        );
    }
}

export default APIConsumer;