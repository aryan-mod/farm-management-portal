"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, TrendingUp, FileText, Brain, Loader2 } from "lucide-react"

interface FarmData {
  farmName: string
  farmSize: string
  livestockType: string
  animalCount: string
  location: string
  yearsOperating: string
  previousDiseases: string
  vaccinationProgram: string
  biosecurityMeasures: string
  visitorProtocol: string
  feedSource: string
  wasteManagement: string
}

interface RiskAssessment {
  overallScore: number
  riskLevel: "low" | "medium" | "high"
  categories: {
    name: string
    score: number
    recommendations: string[]
  }[]
  aiInsights: string
  priorityActions: string[]
}

export default function RiskAssessmentPage() {
  const [formData, setFormData] = useState<FarmData>({
    farmName: "",
    farmSize: "",
    livestockType: "",
    animalCount: "",
    location: "",
    yearsOperating: "",
    previousDiseases: "",
    vaccinationProgram: "",
    biosecurityMeasures: "",
    visitorProtocol: "",
    feedSource: "",
    wasteManagement: "",
  })

  const [assessment, setAssessment] = useState<RiskAssessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FarmData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateAIAssessment = async () => {
    setIsLoading(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // AI-powered risk calculation logic
    let totalScore = 0
    const categories = []

    // Biosecurity Infrastructure (25% weight)
    let biosecurityScore = 85
    if (formData.biosecurityMeasures.toLowerCase().includes("none") || formData.biosecurityMeasures === "") {
      biosecurityScore = 30
    } else if (formData.biosecurityMeasures.toLowerCase().includes("basic")) {
      biosecurityScore = 60
    } else if (
      formData.biosecurityMeasures.toLowerCase().includes("advanced") ||
      formData.biosecurityMeasures.toLowerCase().includes("comprehensive")
    ) {
      biosecurityScore = 90
    }

    categories.push({
      name: "Biosecurity Infrastructure",
      score: biosecurityScore,
      recommendations:
        biosecurityScore < 70
          ? [
              "Install proper disinfection stations at entry points",
              "Implement controlled access protocols",
              "Establish quarantine facilities for new animals",
            ]
          : ["Maintain current biosecurity standards", "Regular equipment maintenance"],
    })

    // Disease History (20% weight)
    let diseaseScore = 80
    if (
      formData.previousDiseases.toLowerCase().includes("frequent") ||
      formData.previousDiseases.toLowerCase().includes("multiple")
    ) {
      diseaseScore = 40
    } else if (
      formData.previousDiseases.toLowerCase().includes("occasional") ||
      formData.previousDiseases.toLowerCase().includes("some")
    ) {
      diseaseScore = 65
    } else if (
      formData.previousDiseases.toLowerCase().includes("none") ||
      formData.previousDiseases.toLowerCase().includes("never")
    ) {
      diseaseScore = 95
    }

    categories.push({
      name: "Disease History",
      score: diseaseScore,
      recommendations:
        diseaseScore < 70
          ? [
              "Implement enhanced monitoring protocols",
              "Review and update vaccination schedules",
              "Consult with veterinary specialists",
            ]
          : ["Continue current health monitoring", "Maintain vaccination records"],
    })

    // Vaccination Program (20% weight)
    let vaccinationScore = 75
    if (formData.vaccinationProgram === "comprehensive") {
      vaccinationScore = 95
    } else if (formData.vaccinationProgram === "standard") {
      vaccinationScore = 80
    } else if (formData.vaccinationProgram === "basic") {
      vaccinationScore = 60
    } else {
      vaccinationScore = 30
    }

    categories.push({
      name: "Vaccination Program",
      score: vaccinationScore,
      recommendations:
        vaccinationScore < 70
          ? [
              "Develop comprehensive vaccination schedule",
              "Ensure proper vaccine storage and handling",
              "Train staff on vaccination protocols",
            ]
          : ["Maintain vaccination schedule", "Monitor vaccine efficacy"],
    })

    // Visitor & Feed Management (20% weight)
    let managementScore = 70
    if (
      formData.visitorProtocol.toLowerCase().includes("strict") &&
      formData.feedSource.toLowerCase().includes("certified")
    ) {
      managementScore = 90
    } else if (formData.visitorProtocol.toLowerCase().includes("moderate")) {
      managementScore = 75
    } else if (formData.visitorProtocol.toLowerCase().includes("minimal") || formData.visitorProtocol === "") {
      managementScore = 45
    }

    categories.push({
      name: "Management Protocols",
      score: managementScore,
      recommendations:
        managementScore < 70
          ? [
              "Establish strict visitor protocols",
              "Source feed from certified suppliers only",
              "Implement proper waste disposal systems",
            ]
          : ["Review protocols quarterly", "Maintain supplier certifications"],
    })

    // Farm Scale Risk (15% weight)
    let scaleScore = 80
    const animalCount = Number.parseInt(formData.animalCount) || 0
    if (animalCount > 10000) {
      scaleScore = 60 // Higher risk for large operations
    } else if (animalCount > 1000) {
      scaleScore = 75
    } else {
      scaleScore = 90 // Lower risk for smaller operations
    }

    categories.push({
      name: "Scale & Density",
      score: scaleScore,
      recommendations:
        scaleScore < 70
          ? [
              "Implement compartmentalization strategies",
              "Increase monitoring frequency",
              "Consider reducing stocking density",
            ]
          : ["Monitor animal density", "Maintain current management practices"],
    })

    // Calculate weighted overall score
    totalScore =
      biosecurityScore * 0.25 + diseaseScore * 0.2 + vaccinationScore * 0.2 + managementScore * 0.2 + scaleScore * 0.15

    let riskLevel: "low" | "medium" | "high"
    if (totalScore >= 80) {
      riskLevel = "low"
    } else if (totalScore >= 60) {
      riskLevel = "medium"
    } else {
      riskLevel = "high"
    }

    // AI-generated insights
    const aiInsights = `Based on the comprehensive analysis of your ${formData.livestockType} farm with ${formData.animalCount} animals, 
    the AI assessment indicates a ${riskLevel} biosecurity risk profile. Key factors influencing this assessment include your 
    ${formData.biosecurityMeasures || "current biosecurity measures"}, vaccination program status, and operational scale. 
    The analysis suggests focusing on ${
      riskLevel === "high"
        ? "immediate infrastructure improvements"
        : riskLevel === "medium"
          ? "protocol standardization and monitoring enhancement"
          : "maintaining current standards with periodic reviews"
    }.`

    // Priority actions based on lowest scoring categories
    const sortedCategories = [...categories].sort((a, b) => a.score - b.score)
    const priorityActions = [
      `Address ${sortedCategories[0].name.toLowerCase()} improvements immediately`,
      `Implement enhanced monitoring for ${sortedCategories[1].name.toLowerCase()}`,
      "Schedule quarterly biosecurity audits",
      "Establish emergency response protocols",
    ]

    const result: RiskAssessment = {
      overallScore: Math.round(totalScore),
      riskLevel,
      categories,
      aiInsights,
      priorityActions,
    }

    setAssessment(result)
    setIsLoading(false)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-5 w-5" />
      case "medium":
        return <AlertTriangle className="h-5 w-5" />
      case "high":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Biosecurity Risk Assessment
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get personalized biosecurity recommendations powered by artificial intelligence
          </p>
        </div>

        {/* Assessment Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Farm Information
            </CardTitle>
            <CardDescription>
              Provide details about your farm to receive a comprehensive risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  placeholder="Enter your farm name"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange("farmName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State/Province"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="livestockType">Livestock Type</Label>
                <Select
                  value={formData.livestockType}
                  onValueChange={(value) => handleInputChange("livestockType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pigs">Pigs</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="mixed">Mixed (Pigs & Poultry)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="animalCount">Number of Animals</Label>
                <Input
                  id="animalCount"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.animalCount}
                  onChange={(e) => handleInputChange("animalCount", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOperating">Years Operating</Label>
                <Input
                  id="yearsOperating"
                  type="number"
                  placeholder="e.g., 10"
                  value={formData.yearsOperating}
                  onChange={(e) => handleInputChange("yearsOperating", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vaccinationProgram">Vaccination Program</Label>
              <Select
                value={formData.vaccinationProgram}
                onValueChange={(value) => handleInputChange("vaccinationProgram", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccination program level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive (All recommended vaccines)</SelectItem>
                  <SelectItem value="standard">Standard (Core vaccines only)</SelectItem>
                  <SelectItem value="basic">Basic (Minimal vaccination)</SelectItem>
                  <SelectItem value="none">No vaccination program</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="biosecurityMeasures">Current Biosecurity Measures</Label>
              <Textarea
                id="biosecurityMeasures"
                placeholder="Describe your current biosecurity protocols (e.g., disinfection stations, controlled access, quarantine procedures)"
                value={formData.biosecurityMeasures}
                onChange={(e) => handleInputChange("biosecurityMeasures", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitorProtocol">Visitor Protocol</Label>
                <Select
                  value={formData.visitorProtocol}
                  onValueChange={(value) => handleInputChange("visitorProtocol", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visitor protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">Strict (Limited access, full PPE required)</SelectItem>
                    <SelectItem value="moderate">Moderate (Some restrictions)</SelectItem>
                    <SelectItem value="minimal">Minimal (Basic requirements)</SelectItem>
                    <SelectItem value="none">No specific protocol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedSource">Feed Source</Label>
                <Select value={formData.feedSource} onValueChange={(value) => handleInputChange("feedSource", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feed source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certified">Certified suppliers only</SelectItem>
                    <SelectItem value="mixed">Mix of certified and local</SelectItem>
                    <SelectItem value="local">Local suppliers</SelectItem>
                    <SelectItem value="own">Own production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousDiseases">Disease History (Past 3 Years)</Label>
              <Textarea
                id="previousDiseases"
                placeholder="Describe any disease outbreaks or health issues (e.g., none, occasional respiratory issues, frequent digestive problems)"
                value={formData.previousDiseases}
                onChange={(e) => handleInputChange("previousDiseases", e.target.value)}
                rows={2}
              />
            </div>

            <Button
              onClick={generateAIAssessment}
              className="w-full"
              size="lg"
              disabled={isLoading || !formData.farmName || !formData.livestockType}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI Analyzing Your Farm...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate AI Risk Assessment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Assessment Results */}
        {assessment && (
          <div className="space-y-6">
            {/* Overall Risk Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(assessment.riskLevel)}
                    <div>
                      <div className="text-2xl font-bold">{assessment.overallScore}/100</div>
                      <Badge className={getRiskColor(assessment.riskLevel)}>
                        {assessment.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-2">Risk Level</div>
                    <Progress value={assessment.overallScore} className="w-32" />
                  </div>
                </div>

                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription className="text-pretty">
                    <strong>AI Insights:</strong> {assessment.aiInsights}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Category Analysis</CardTitle>
                <CardDescription>Detailed breakdown by biosecurity category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessment.categories.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{category.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{category.score}/100</span>
                          <Progress value={category.score} className="w-20" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        {category.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Priority Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Priority Actions
                </CardTitle>
                <CardDescription>Recommended immediate steps to improve biosecurity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.priorityActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
