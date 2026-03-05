import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Prediction coefficients derived from logistic regression on Pima Indians Diabetes Dataset
// These weights approximate the trained model behavior
const COEFFICIENTS = {
  pregnancies: 0.106,
  glucose: 0.037,
  bloodPressure: -0.011,
  skinThickness: 0.003,
  insulin: -0.001,
  bmi: 0.095,
  diabetesPedigree: 1.136,
  age: 0.021,
  intercept: -9.172
};

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function predictDiabetes(data: {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}): { prediction: boolean; probability: number; riskLevel: string } {
  // Calculate linear combination
  const z = 
    COEFFICIENTS.intercept +
    COEFFICIENTS.pregnancies * data.pregnancies +
    COEFFICIENTS.glucose * data.glucose +
    COEFFICIENTS.bloodPressure * data.bloodPressure +
    COEFFICIENTS.skinThickness * data.skinThickness +
    COEFFICIENTS.insulin * data.insulin +
    COEFFICIENTS.bmi * data.bmi +
    COEFFICIENTS.diabetesPedigree * data.diabetesPedigree +
    COEFFICIENTS.age * data.age;

  const probability = sigmoid(z);
  const prediction = probability >= 0.5;
  
  let riskLevel: string;
  if (probability < 0.3) {
    riskLevel = "Low Risk";
  } else if (probability < 0.5) {
    riskLevel = "Moderate Risk";
  } else if (probability < 0.7) {
    riskLevel = "High Risk";
  } else {
    riskLevel = "Very High Risk";
  }

  return { prediction, probability, riskLevel };
}

function getRecommendations(prediction: boolean, data: any): string[] {
  if (prediction) {
    // Diabetic positive recommendations
    return [
      "🚫 Avoid sugar and sugary drinks immediately",
      "🍬 Eliminate sweets, candies, and desserts from your diet",
      "🥗 Follow a low-carbohydrate, high-fiber diet",
      "🏃 Exercise for at least 30 minutes daily",
      "💧 Drink plenty of water (8-10 glasses daily)",
      "🩺 Consult a healthcare professional immediately",
      "📊 Monitor blood glucose levels regularly",
      "🥦 Include more green vegetables in every meal",
      "🐟 Choose lean proteins like fish and chicken",
      "⏰ Eat meals at regular intervals"
    ];
  } else {
    // Diabetic negative - prevention recommendations
    const recommendations = [
      "✅ Continue maintaining a healthy lifestyle",
      "🥗 Eat a balanced diet rich in vegetables and whole grains",
      "🏃 Stay physically active - aim for 150 minutes of exercise weekly",
      "💧 Stay well hydrated throughout the day",
      "😴 Get 7-8 hours of quality sleep each night"
    ];

    // Add specific recommendations based on risk factors
    if (data.bmi > 25) {
      recommendations.push("⚖️ Consider reducing weight through healthy diet and exercise");
    }
    if (data.glucose > 100) {
      recommendations.push("🩸 Your glucose is slightly elevated - monitor it periodically");
    }
    if (data.age > 40) {
      recommendations.push("📅 Schedule annual diabetes screenings due to age factor");
    }
    
    recommendations.push("🍎 Limit processed foods and sugary snacks");
    recommendations.push("🧘 Practice stress management techniques");
    
    return recommendations;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    
    console.log("Received prediction request:", data);
    
    // Validate input
    const requiredFields = ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness', 'insulin', 'bmi', 'diabetesPedigree', 'age'];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const result = predictDiabetes(data);
    const recommendations = getRecommendations(result.prediction, data);

    console.log("Prediction result:", result);

    return new Response(
      JSON.stringify({
        prediction: result.prediction,
        probability: Math.round(result.probability * 100),
        riskLevel: result.riskLevel,
        recommendations,
        message: result.prediction 
          ? "Based on the provided health metrics, the prediction indicates a positive diabetes outcome. Please consult a healthcare professional for proper diagnosis and treatment."
          : "Based on the provided health metrics, the prediction indicates a negative diabetes outcome. Continue maintaining a healthy lifestyle to prevent diabetes."
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in predict-diabetes function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
