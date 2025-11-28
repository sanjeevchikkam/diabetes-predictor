import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Play } from "lucide-react";

interface TestCase {
  id: number;
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
  expectedOutcome: "Positive" | "Negative";
  description: string;
}

const testCases: TestCase[] = [
  {
    id: 1,
    pregnancies: "6",
    glucose: "148",
    bloodPressure: "72",
    skinThickness: "35",
    insulin: "0",
    bmi: "33.6",
    diabetesPedigree: "0.627",
    age: "50",
    expectedOutcome: "Positive",
    description: "High glucose, high BMI, older age",
  },
  {
    id: 2,
    pregnancies: "1",
    glucose: "85",
    bloodPressure: "66",
    skinThickness: "29",
    insulin: "0",
    bmi: "26.6",
    diabetesPedigree: "0.351",
    age: "31",
    expectedOutcome: "Negative",
    description: "Normal glucose, healthy BMI",
  },
  {
    id: 3,
    pregnancies: "8",
    glucose: "183",
    bloodPressure: "64",
    skinThickness: "0",
    insulin: "0",
    bmi: "23.3",
    diabetesPedigree: "0.672",
    age: "32",
    expectedOutcome: "Positive",
    description: "Very high glucose level",
  },
  {
    id: 4,
    pregnancies: "1",
    glucose: "89",
    bloodPressure: "66",
    skinThickness: "23",
    insulin: "94",
    bmi: "28.1",
    diabetesPedigree: "0.167",
    age: "21",
    expectedOutcome: "Negative",
    description: "Young age, normal glucose, low pedigree",
  },
  {
    id: 5,
    pregnancies: "0",
    glucose: "137",
    bloodPressure: "40",
    skinThickness: "35",
    insulin: "168",
    bmi: "43.1",
    diabetesPedigree: "2.288",
    age: "33",
    expectedOutcome: "Positive",
    description: "Very high BMI, high pedigree function",
  },
];

interface Props {
  onSelectTestCase: (testCase: Omit<TestCase, "id" | "expectedOutcome" | "description">) => void;
}

export function TestCases({ onSelectTestCase }: Props) {
  const handleSelect = (testCase: TestCase) => {
    const { id, expectedOutcome, description, ...formData } = testCase;
    onSelectTestCase(formData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ClipboardList className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Test Cases for Faculty Demo</CardTitle>
            <CardDescription>
              Click "Use" to load the test case values into the prediction form
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Test</TableHead>
                <TableHead className="font-semibold">Preg</TableHead>
                <TableHead className="font-semibold">Glucose</TableHead>
                <TableHead className="font-semibold">BP</TableHead>
                <TableHead className="font-semibold">Skin</TableHead>
                <TableHead className="font-semibold">Insulin</TableHead>
                <TableHead className="font-semibold">BMI</TableHead>
                <TableHead className="font-semibold">Pedigree</TableHead>
                <TableHead className="font-semibold">Age</TableHead>
                <TableHead className="font-semibold">Expected</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testCases.map((tc) => (
                <TableRow key={tc.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">#{tc.id}</TableCell>
                  <TableCell>{tc.pregnancies}</TableCell>
                  <TableCell>{tc.glucose}</TableCell>
                  <TableCell>{tc.bloodPressure}</TableCell>
                  <TableCell>{tc.skinThickness}</TableCell>
                  <TableCell>{tc.insulin}</TableCell>
                  <TableCell>{tc.bmi}</TableCell>
                  <TableCell>{tc.diabetesPedigree}</TableCell>
                  <TableCell>{tc.age}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tc.expectedOutcome === "Positive" ? "destructive" : "default"}
                      className={tc.expectedOutcome === "Negative" ? "bg-success hover:bg-success/90" : ""}
                    >
                      {tc.expectedOutcome}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelect(tc)}
                      className="gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Use
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Test Case Descriptions:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {testCases.map((tc) => (
              <li key={tc.id}>
                <span className="font-medium">Test #{tc.id}:</span> {tc.description}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
