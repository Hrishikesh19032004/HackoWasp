import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBBOjSwwb4XtDk_z5HeN8L2_zruaJacSUk");

// Function to generate a recipe based on available ingredients
export const generateRecipe = async (ingredients) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `I have the following ingredients: ${ingredients.join(", ")}. 
                        Suggest a zero-waste recipe with minimal leftovers. Give the recipe in proper step by step format.`;

        const result = await model.generateContent(prompt);
        return result.response.text(); // Get the AI-generated text
    } catch (error) {
        console.error("Error generating recipe:", error);
        return "Failed to generate a recipe. Try again.";
    }
};
