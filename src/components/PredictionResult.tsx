import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Heart, Utensils, TrendingUp } from "lucide-react";

interface PredictionResult {
  prediction: boolean;
  probability: number;
  riskLevel: string;
  recommendations: string[];
  message: string;
}

interface Props {
  result: PredictionResult;
}

export function PredictionResult({ result }: Props) {
  const isPositive = result.prediction;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Main Result Card */}
      <Card className={`border-0 shadow-xl overflow-hidden ${isPositive ? 'bg-gradient-danger' : 'bg-gradient-success'}`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            {isPositive ? (
              <div className="p-4 rounded-full bg-destructive-foreground/20 animate-bounce-subtle">
                <AlertTriangle className="h-12 w-12 text-destructive-foreground" />
              </div>
            ) : (
              <div className="p-4 rounded-full bg-success-foreground/20 animate-bounce-subtle">
                <CheckCircle2 className="h-12 w-12 text-success-foreground" />
              </div>
            )}
          </div>
          <h2 className="text-3xl font-display font-bold text-success-foreground mb-2">
            {isPositive ? "Diabetes Positive" : "Diabetes Negative"}
          </h2>
          <p className="text-success-foreground/90 text-lg mb-4">
            {result.riskLevel}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-foreground/20">
            <TrendingUp className="h-5 w-5 text-success-foreground" />
            <span className="text-success-foreground font-semibold">
              {result.probability}% Probability
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Message Card */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-display">Diagnosis Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{result.message}</p>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Utensils className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-display">
              {isPositive ? "Dietary & Lifestyle Recommendations" : "Prevention Tips"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-base leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
