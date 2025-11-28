import { useState, useEffect } from "react";
import { PredictionResult } from "@/components/PredictionResult";
import { TestCases } from "@/components/TestCases";
import { Activity, Heart, Shield, Stethoscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Result {
  prediction: boolean;
  probability: number;
  riskLevel: string;
  recommendations: string[];
  message: string;
}

interface FormData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
}

const inputFields = [
  { name: "pregnancies", label: "Pregnancies", placeholder: "Number of pregnancies" },
  { name: "glucose", label: "Glucose", placeholder: "Glucose level (mg/dL)" },
  { name: "bloodPressure", label: "Blood Pressure", placeholder: "Blood pressure (mm Hg)" },
  { name: "skinThickness", label: "Skin Thickness", placeholder: "Skin thickness (mm)" },
  { name: "insulin", label: "Insulin", placeholder: "Insulin level (mu U/ml)" },
  { name: "bmi", label: "BMI", placeholder: "Body Mass Index" },
  { name: "diabetesPedigree", label: "Diabetes Pedigree", placeholder: "Pedigree function (0.0-2.5)" },
  { name: "age", label: "Age", placeholder: "Age in years" },
];

const Index = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [prefilledData, setPrefilledData] = useState<FormData | null>(null);

  const handleTestCaseSelect = (testCase: Record<string, string>) => {
    setPrefilledData({
      pregnancies: testCase.pregnancies || "",
      glucose: testCase.glucose || "",
      bloodPressure: testCase.bloodPressure || "",
      skinThickness: testCase.skinThickness || "",
      insulin: testCase.insulin || "",
      bmi: testCase.bmi || "",
      diabetesPedigree: testCase.diabetesPedigree || "",
      age: testCase.age || "",
    });
    setFormKey((prev) => prev + 1);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered Health Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
              Diabetes Prediction System
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in">
              Advanced machine learning model to predict diabetes risk based on key health parameters.
              Get instant results with personalized recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                <Activity className="h-5 w-5" />
                <span>8 Health Metrics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                <Heart className="h-5 w-5" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                <Shield className="h-5 w-5" />
                <span>Diet Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Prediction Form */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <DiabetesPredictionFormWithPrefill 
              key={formKey} 
              prefilledData={prefilledData} 
              onResult={setResult} 
            />
          </div>

          {/* Results */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            {result ? (
              <PredictionResult result={result} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 rounded-2xl bg-muted/50 border border-border/50">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <Activity className="h-12 w-12 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Enter your health parameters and click predict to see your diabetes risk assessment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Cases Section */}
        <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <TestCases onSelectTestCase={handleTestCaseSelect} />
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 rounded-2xl bg-warning/10 border border-warning/20">
          <h4 className="font-semibold text-warning mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Medical Disclaimer
          </h4>
          <p className="text-sm text-muted-foreground">
            This prediction system is for educational purposes only and should not be used as a substitute for
            professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare
            provider for medical concerns. The predictions are based on statistical models and may not be
            100% accurate.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50 py-8 px-4 mt-12">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground text-sm">
            Final Year Project - Diabetes Prediction System © {new Date().getFullYear()}
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Built with Machine Learning & Modern Web Technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

// Form component with prefill support
function DiabetesPredictionFormWithPrefill({
  prefilledData,
  onResult,
}: {
  prefilledData: FormData | null;
  onResult: (result: Result) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledData) {
      setFormData(prefilledData);
    }
  }, [prefilledData]);

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-diabetes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            pregnancies: parseFloat(formData.pregnancies) || 0,
            glucose: parseFloat(formData.glucose) || 0,
            bloodPressure: parseFloat(formData.bloodPressure) || 0,
            skinThickness: parseFloat(formData.skinThickness) || 0,
            insulin: parseFloat(formData.insulin) || 0,
            bmi: parseFloat(formData.bmi) || 0,
            diabetesPedigree: parseFloat(formData.diabetesPedigree) || 0,
            age: parseFloat(formData.age) || 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result = await response.json();
      onResult(result);
    } catch (err) {
      setError("Failed to process prediction. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Health Parameters</CardTitle>
            <CardDescription>Enter your health metrics for diabetes prediction</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  type="number"
                  step="any"
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleInputChange(field.name as keyof FormData)}
                  className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="h-5 w-5" />
                Predict Diabetes Risk
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Index;
