"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Clock,
  Users,
  Search,
  Filter,
  Play,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Droplets,
  Heart,
  Utensils,
  AlertTriangle,
  Brain,
} from "lucide-react"

interface TrainingModule {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  progress: number
  rating: number
  enrolledUsers: number
  image: string
  tags: string[]
  isRecommended?: boolean
  aiGenerated?: boolean
}

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const trainingModules: TrainingModule[] = [
    {
      id: "hygiene-practices",
      title: "Essential Hygiene Practices",
      description: "Learn fundamental hygiene protocols to prevent disease transmission in your farm environment.",
      category: "Biosecurity",
      difficulty: "beginner",
      duration: "45 min",
      progress: 75,
      rating: 4.8,
      enrolledUsers: 1247,
      image: "/farm-hygiene-disinfection.jpg",
      tags: ["hygiene", "disinfection", "protocols", "prevention"],
      isRecommended: true,
    },
    {
      id: "disease-identification",
      title: "Disease Signs & Symptoms",
      description: "Identify early warning signs of common diseases in pigs and poultry for rapid response.",
      category: "Health Management",
      difficulty: "intermediate",
      duration: "60 min",
      progress: 30,
      rating: 4.9,
      enrolledUsers: 892,
      image: "/veterinary-examination-livestock-health.jpg",
      tags: ["disease", "symptoms", "diagnosis", "health"],
      isRecommended: true,
      aiGenerated: true,
    },
    {
      id: "waste-disposal",
      title: "Proper Waste Management",
      description: "Implement effective waste disposal systems to minimize environmental impact and disease risk.",
      category: "Environmental",
      difficulty: "intermediate",
      duration: "50 min",
      progress: 0,
      rating: 4.6,
      enrolledUsers: 634,
      image: "/farm-waste-management-composting.jpg",
      tags: ["waste", "disposal", "environment", "sustainability"],
    },
    {
      id: "poultry-care",
      title: "Advanced Poultry Care",
      description: "Specialized care techniques for optimal poultry health, nutrition, and productivity.",
      category: "Species-Specific",
      difficulty: "advanced",
      duration: "90 min",
      progress: 100,
      rating: 4.7,
      enrolledUsers: 456,
      image: "/poultry-chickens-farm-care.jpg",
      tags: ["poultry", "nutrition", "housing", "care"],
    },
    {
      id: "feed-safety",
      title: "Feed Safety & Quality Control",
      description: "Ensure feed safety through proper storage, handling, and quality assessment techniques.",
      category: "Nutrition",
      difficulty: "intermediate",
      duration: "55 min",
      progress: 60,
      rating: 4.5,
      enrolledUsers: 723,
      image: "/animal-feed-storage-quality-control.jpg",
      tags: ["feed", "safety", "storage", "quality"],
      aiGenerated: true,
    },
    {
      id: "emergency-response",
      title: "Emergency Response Protocols",
      description: "Develop and implement emergency response plans for disease outbreaks and biosecurity breaches.",
      category: "Emergency Management",
      difficulty: "advanced",
      duration: "75 min",
      progress: 0,
      rating: 4.8,
      enrolledUsers: 312,
      image: "/emergency-response-farm-biosecurity.jpg",
      tags: ["emergency", "response", "protocols", "outbreak"],
      isRecommended: true,
    },
    {
      id: "vaccination-protocols",
      title: "Vaccination Best Practices",
      description: "Master vaccination schedules, techniques, and record-keeping for optimal herd immunity.",
      category: "Health Management",
      difficulty: "intermediate",
      duration: "65 min",
      progress: 25,
      rating: 4.9,
      enrolledUsers: 987,
      image: "/veterinary-vaccination-livestock.jpg",
      tags: ["vaccination", "immunity", "schedule", "health"],
    },
    {
      id: "visitor-management",
      title: "Visitor & Vehicle Protocols",
      description: "Establish comprehensive protocols for managing visitors and vehicles to maintain biosecurity.",
      category: "Biosecurity",
      difficulty: "beginner",
      duration: "40 min",
      progress: 0,
      rating: 4.4,
      enrolledUsers: 567,
      image: "/farm-security-gate-visitor-control.jpg",
      tags: ["visitors", "vehicles", "access", "security"],
      aiGenerated: true,
    },
  ]

  const categories = [
    "all",
    "Biosecurity",
    "Health Management",
    "Environmental",
    "Species-Specific",
    "Nutrition",
    "Emergency Management",
  ]

  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || module.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const recommendedModules = trainingModules.filter((module) => module.isRecommended)
  const aiGeneratedModules = trainingModules.filter((module) => module.aiGenerated)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Biosecurity":
        return <Shield className="h-4 w-4" />
      case "Health Management":
        return <Heart className="h-4 w-4" />
      case "Environmental":
        return <Droplets className="h-4 w-4" />
      case "Species-Specific":
        return <Users className="h-4 w-4" />
      case "Nutrition":
        return <Utensils className="h-4 w-4" />
      case "Emergency Management":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Biosecurity Training Center</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Enhance your knowledge with expert-designed training modules and AI-powered learning paths
          </p>
        </div>

        {/* AI Recommendations Section */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>
              Personalized training modules based on your farm's risk assessment and learning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedModules.slice(0, 3).map((module) => (
                <div key={module.id} className="bg-background rounded-lg p-4 border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{module.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/training/${module.id}`}>Start</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search training modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Generated Modules Section */}
        {aiGeneratedModules.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">AI-Enhanced Learning</h2>
              <Badge variant="outline" className="text-xs">
                Powered by AI
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {aiGeneratedModules.map((module) => (
                <Card
                  key={module.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20"
                >
                  <div className="relative">
                    <img
                      src={module.image || "/placeholder.svg"}
                      alt={module.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    </div>
                    {module.progress > 0 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(module.category)}
                        <span className="text-xs text-muted-foreground">{module.category}</span>
                      </div>
                      <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{module.title}</CardTitle>
                    <CardDescription className="text-pretty line-clamp-2">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {module.enrolledUsers}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {module.rating}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/training/${module.id}`}>
                          {module.progress > 0 ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Continue
                            </>
                          ) : (
                            <>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Start Learning
                            </>
                          )}
                        </Link>
                      </Button>
                      {module.progress === 100 && (
                        <Button variant="outline" size="icon">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Training Modules */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">All Training Modules</h2>
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredModules.length} of {trainingModules.length} modules
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={module.image || "/placeholder.svg"}
                  alt={module.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {module.isRecommended && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-accent text-accent-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                {module.aiGenerated && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      <Brain className="h-3 w-3 mr-1" />
                      AI Enhanced
                    </Badge>
                  </div>
                )}
                {module.progress > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(module.category)}
                    <span className="text-xs text-muted-foreground">{module.category}</span>
                  </div>
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{module.title}</CardTitle>
                <CardDescription className="text-pretty line-clamp-2">{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {module.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {module.enrolledUsers}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {module.rating}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/training/${module.id}`}>
                      {module.progress > 0 ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </>
                      ) : (
                        <>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Start Learning
                        </>
                      )}
                    </Link>
                  </Button>
                  {module.progress === 100 && (
                    <Button variant="outline" size="icon">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No modules found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
