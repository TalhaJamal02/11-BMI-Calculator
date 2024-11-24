"use client";

import { useState, ChangeEvent } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function BmiCalculator() {

  const [height, setHeight] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [result, setResult] = useState<BmiResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value)
  }

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value)
  }

  interface BmiResult {
    bmi: string,
    category: string
  }

  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      return;
    }
    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      return;
    }
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
    setResult({ bmi: bmiValue.toFixed(1), category });
    setError("");
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>
              Enter your height and weight to calculate your BMI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={handleHeightChange}
                required
                inputMode="numeric"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={handleWeightChange}
                required
                inputMode="numeric"
              />
            </div>
            <Button onClick={calculateBmi}>Calculate</Button>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {result && (
              <div className="grid gap-2">
                <div className="text-center text-2xl font-bold">{result.bmi}</div>
                <div className="text-center text-muted-foreground">
                  {result.category}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BmiCalculator