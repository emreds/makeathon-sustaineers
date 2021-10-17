import { PredictionAPIClient } from "@azure/cognitiveservices-customvision-prediction";
import util from 'util';
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { resolve } from "url";

const predictionKey = "dea54b5e661f471e880abe21e0b8d753";
const predictionResourceId = "/subscriptions/e26af8b6-f14f-477e-adac-8d5ebf9b85da/resourceGroups/sustAIneers/providers/Microsoft.CognitiveServices/accounts/IngredientDetection";
const predictionEndpoint = "https://ingredientdetection-prediction.cognitiveservices.azure.com/";
const publishIterationName = "Iteration2";
const setTimeoutPromise = util.promisify(setTimeout);
const predictor_credentials = new ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionAPIClient(predictor_credentials, predictionEndpoint);
const project_id = "36009fa2-b791-4d12-b272-46677925e925";

export default class IngredientPrediction {

    async getIngredients(image: any): Promise<string[]> {
        try {
            const results = await predictor.detectImage(project_id, publishIterationName, image);
            let ingredients: string[] = [];
            console.log(results.predictions);
            results.predictions?.forEach(prediction => {
                if (prediction.probability && prediction.probability > 0.5 && prediction.tagName) {
                    if (ingredients.indexOf(prediction.tagName) == -1) {
                        ingredients.push(prediction.tagName);
                    }
                }
            });
            return ingredients;
        } catch (e) {
            console.log(e);
        }
        return [];
    }

}
