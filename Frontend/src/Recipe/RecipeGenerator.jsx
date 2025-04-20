import React, { useState } from "react";
import { generateRecipe } from "./geminiApi"; // Ensure correct import path
import "./RecipeGenerator.css";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState(""); // State for input
  const [recipe, setRecipe] = useState(""); // Full recipe text
  const [displayedRecipe, setDisplayedRecipe] = useState(""); // Typing effect text (as raw string)
  const [loading, setLoading] = useState(false); // Loader state

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      alert("Please enter some ingredients.");
      return;
    }

    setLoading(true);
    setRecipe("");
    setDisplayedRecipe("");

    try {
      const result = await generateRecipe(ingredients.split(","));
      setRecipe(result);
      startTypingEffect(result);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setRecipe("Failed to generate a recipe. Try again.");
      setDisplayedRecipe("Failed to generate a recipe. Try again.");
    }

    setLoading(false);
  };

  // Function to format text by converting ***text*** into <b>text</b>
  const formatText = (text) => {
    return text.replace(/\*\*\*(.*?)\*\*\*/g, "<b>$1</b>"); // Convert ***text*** to <b>text</b>
  };

  // Function to create the typewriting effect
  const startTypingEffect = (text) => {
    let index = 0;
    let formattedText = formatText(text); // Apply bold formatting first
    let typedText = "";

    const interval = setInterval(() => {
      if (index < formattedText.length) {
        typedText += formattedText[index];
        setDisplayedRecipe(typedText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust speed (milliseconds per character)
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ width: "800px", background: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "20px", color: "#222" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "Poppins, sans-serif", marginBottom: "16px" }}>
          Zero Waste Recipe Generator
        </h1>

        <textarea
          style={{ width: "100%", height: "60px", padding: "10px", background: "#f0f0f0", borderRadius: "5px", color: "#222", fontFamily: "Poppins, sans-serif" }}
          placeholder="Enter available ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button
          style={{ marginTop: "10px", background: "#197b3e", color: "white", borderRadius: "5px", padding: "10px 20px", border: "none", cursor: "pointer" }}
          onClick={handleGenerateRecipe}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Poppins, sans-serif", marginBottom: "10px" }}>
            Generated Recipe:
          </h2>
          <div
            style={{
              background: "#f0f0f0",
              borderRadius: "5px",
              padding: "15px",
              minHeight: "80px",
              whiteSpace: "pre-line",
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
            }}
            dangerouslySetInnerHTML={{ __html: loading ? "⏳ Generating recipe..." : displayedRecipe || "Your recipe will appear here." }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;
