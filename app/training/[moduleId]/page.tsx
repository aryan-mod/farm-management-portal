"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  FileText,
  Award,
  Brain,
  Lightbulb,
} from "lucide-react"

export default function ModuleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  // Mock module data - in real app, this would come from API
  const moduleData = {
    id: params.moduleId,
    title: "Essential Hygiene Practices",
    description: "Learn fundamental hygiene protocols to prevent disease transmission in your farm environment.",
    category: "Biosecurity",
    difficulty: "beginner",
    duration: "45 min",
    rating: 4.8,
    enrolledUsers: 1247,
    instructor: "Dr. Sarah Johnson, DVM",
    image: "/farm-hygiene-disinfection-training.jpg",
    lessons: [
      {
        id: 1,
        title: "Introduction to Farm Hygiene",
        duration: "8 min",
        type: "video",
        content:
          "Understanding the importance of hygiene in preventing disease outbreaks and maintaining animal health.",
      },
      {
        id: 2,
        title: "Personal Protective Equipment (PPE)",
        duration: "12 min",
        type: "interactive",
        content: "Learn about proper PPE selection, usage, and maintenance for different farm activities.",
      },
      {
        id: 3,
        title: "Disinfection Protocols",
        duration: "15 min",
        type: "video",
        content: "Step-by-step guide to effective disinfection procedures for equipment, facilities, and vehicles.",
      },
      {
        id: 4,
        title: "Hand Hygiene Best Practices",
        duration: "6 min",
        type: "interactive",
        content: "Proper handwashing techniques and when to apply them during farm operations.",
      },
      {
        id: 5,
        title: "Knowledge Assessment",
        duration: "4 min",
        type: "quiz",
        content: "Test your understanding of hygiene practices with this comprehensive quiz.",
      },
    ],
    aiInsights: [
      "Based on your risk assessment, focus extra attention on disinfection protocols",
      "Your farm size suggests implementing automated hygiene monitoring systems",
      "Consider advanced PPE training for your livestock type",
    ],
    learningObjectives: [
      "Understand the critical role of hygiene in biosecurity",
      "Implement proper PPE protocols for farm staff",
      "Execute effective disinfection procedures",
      "Develop hygiene monitoring and compliance systems",
    ],
  }

  const progress = (completedLessons.length / moduleData.lessons.length) * 100

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
    if (lessonId < moduleData.lessons.length) {
      setCurrentLesson(lessonId)
    }
  }

  const currentLessonData = moduleData.lessons[currentLesson]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{moduleData.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {moduleData.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {moduleData.enrolledUsers} enrolled
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {moduleData.rating}
              </div>
              <Badge>{moduleData.difficulty}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons.length} of {moduleData.lessons.length} lessons completed
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Learning Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your farm profile and learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleData.aiInsights.map((insight, index) => (
                    <Alert key={index}>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>{insight}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Lesson */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Lesson {currentLessonData.id}: {currentLessonData.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      {currentLessonData.duration}
                      <Badge variant="outline" className="ml-2">
                        {currentLessonData.type}
                      </Badge>
                    </CardDescription>
                  </div>
                  {completedLessons.includes(currentLessonData.id) && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Video/Content Area */}
                <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                      {currentLessonData.type === "video" ? (
                        <Play className="h-8 w-8 text-primary" />
                      ) : currentLessonData.type === "quiz" ? (
                        <FileText className="h-8 w-8 text-primary" />
                      ) : (
                        <BookOpen className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{currentLessonData.content}</p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isPlaying ? "Pause" : "Start"} Lesson
                      </Button>
                      {!completedLessons.includes(currentLessonData.id) && (
                        <Button variant="outline" onClick={() => handleLessonComplete(currentLessonData.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    disabled={currentLesson === 0}
                    onClick={() => setCurrentLesson(currentLesson - 1)}
                  >
                    Previous Lesson
                  </Button>
                  <Button
                    disabled={currentLesson === moduleData.lessons.length - 1}
                    onClick={() => setCurrentLesson(currentLesson + 1)}
                  >
                    Next Lesson
                    <SkipForward className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Module Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Instructor</h4>
                  <p className="text-sm text-muted-foreground">{moduleData.instructor}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Category</h4>
                  <Badge variant="outline">{moduleData.category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {moduleData.learningObjectives.map((objective, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {moduleData.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        currentLesson === index ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{lesson.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                          </div>
                        </div>
                        {completedLessons.includes(lesson.id) && (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate */}
            {progress === 100 && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Award className="h-5 w-5" />
                    Congratulations!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700 mb-4">
                    You've successfully completed this training module. Download your certificate of completion.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Award className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
