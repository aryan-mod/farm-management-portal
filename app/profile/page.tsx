"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  MapPin,
  Calendar,
  Save,
  Edit,
  Shield,
  BookOpen,
  ClipboardCheck,
  AlertTriangle,
  Award,
  Bell,
  Settings,
  Camera,
  CheckCircle,
} from "lucide-react"

interface FarmerProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  farmInfo: {
    farmName: string
    farmType: string
    establishedYear: string
    totalAcreage: string
    livestockTypes: string[]
    animalCount: string
    certifications: string[]
    operationType: string
  }
  preferences: {
    emailNotifications: boolean
    smsAlerts: boolean
    weeklyReports: boolean
    trainingReminders: boolean
    complianceAlerts: boolean
    language: string
    timezone: string
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState<FarmerProfile>({
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@farmmail.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1975-03-15",
      address: "1234 Farm Road",
      city: "Greenfield",
      state: "Iowa",
      zipCode: "50849",
    },
    farmInfo: {
      farmName: "Smith Family Farm",
      farmType: "Mixed Livestock",
      establishedYear: "1995",
      totalAcreage: "250",
      livestockTypes: ["Pigs", "Poultry"],
      animalCount: "1500",
      certifications: ["Organic Certified", "Animal Welfare Approved"],
      operationType: "Commercial",
    },
    preferences: {
      emailNotifications: true,
      smsAlerts: true,
      weeklyReports: false,
      trainingReminders: true,
      complianceAlerts: true,
      language: "English",
      timezone: "America/Chicago",
    },
  })

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false)
    // Show success message
  }

  const handleInputChange = (section: keyof FarmerProfile, field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // Mock activity data
  const activitySummary = {
    riskAssessment: {
      lastCompleted: "2024-12-01",
      score: 85,
      status: "Low Risk",
    },
    training: {
      modulesCompleted: 8,
      totalModules: 12,
      certificatesEarned: 3,
      hoursCompleted: 24,
    },
    compliance: {
      completedActivities: 15,
      totalActivities: 18,
      complianceRate: 83,
      nextDeadline: "2024-12-15",
    },
    alerts: {
      activeAlerts: 2,
      resolvedAlerts: 5,
      lastChecked: "2024-12-10",
    },
  }

  const achievements = [
    {
      title: "Biosecurity Expert",
      description: "Completed advanced biosecurity training",
      date: "2024-11-15",
      icon: Shield,
    },
    {
      title: "Compliance Champion",
      description: "Maintained 90%+ compliance for 6 months",
      date: "2024-10-20",
      icon: ClipboardCheck,
    },
    {
      title: "Learning Enthusiast",
      description: "Completed 5+ training modules",
      date: "2024-09-30",
      icon: BookOpen,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 h-6 w-6 bg-transparent">
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {profile.personalInfo.firstName} {profile.personalInfo.lastName}
              </h1>
              <p className="text-muted-foreground">{profile.farmInfo.farmName}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.personalInfo.city}, {profile.personalInfo.state}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Member since {profile.farmInfo.establishedYear}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.personalInfo.firstName}
                        onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.personalInfo.lastName}
                        onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.personalInfo.email}
                      onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.personalInfo.phone}
                      onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.personalInfo.address}
                      onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.personalInfo.city}
                        onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profile.personalInfo.state}
                        onChange={(e) => handleInputChange("personalInfo", "state", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Farm Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Farm Information
                  </CardTitle>
                  <CardDescription>Details about your farming operation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input
                      id="farmName"
                      value={profile.farmInfo.farmName}
                      onChange={(e) => handleInputChange("farmInfo", "farmName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmType">Farm Type</Label>
                      <Select
                        value={profile.farmInfo.farmType}
                        onValueChange={(value) => handleInputChange("farmInfo", "farmType", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pig Farm">Pig Farm</SelectItem>
                          <SelectItem value="Poultry Farm">Poultry Farm</SelectItem>
                          <SelectItem value="Mixed Livestock">Mixed Livestock</SelectItem>
                          <SelectItem value="Dairy Farm">Dairy Farm</SelectItem>
                          <SelectItem value="Cattle Ranch">Cattle Ranch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        value={profile.farmInfo.establishedYear}
                        onChange={(e) => handleInputChange("farmInfo", "establishedYear", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalAcreage">Total Acreage</Label>
                      <Input
                        id="totalAcreage"
                        value={profile.farmInfo.totalAcreage}
                        onChange={(e) => handleInputChange("farmInfo", "totalAcreage", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="animalCount">Animal Count</Label>
                      <Input
                        id="animalCount"
                        value={profile.farmInfo.animalCount}
                        onChange={(e) => handleInputChange("farmInfo", "animalCount", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operationType">Operation Type</Label>
                    <Select
                      value={profile.farmInfo.operationType}
                      onValueChange={(value) => handleInputChange("farmInfo", "operationType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Family Farm">Family Farm</SelectItem>
                        <SelectItem value="Organic">Organic</SelectItem>
                        <SelectItem value="Hobby Farm">Hobby Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Livestock Types</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.farmInfo.livestockTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Certifications</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.farmInfo.certifications.map((cert) => (
                        <Badge key={cert} className="bg-green-100 text-green-800 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Risk Assessment */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{activitySummary.riskAssessment.score}/100</div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {activitySummary.riskAssessment.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Last completed: {new Date(activitySummary.riskAssessment.lastCompleted).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Training Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Training Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {activitySummary.training.modulesCompleted}/{activitySummary.training.totalModules}
                    </div>
                    <Progress
                      value={(activitySummary.training.modulesCompleted / activitySummary.training.totalModules) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {activitySummary.training.certificatesEarned} certificates earned
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{activitySummary.compliance.complianceRate}%</div>
                    <Progress value={activitySummary.compliance.complianceRate} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Next deadline: {new Date(activitySummary.compliance.nextDeadline).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-orange-600">{activitySummary.alerts.activeAlerts}</div>
                    <p className="text-xs text-muted-foreground">Active alerts</p>
                    <p className="text-xs text-muted-foreground">
                      Last checked: {new Date(activitySummary.alerts.lastChecked).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">Completed Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground">Achieved a score of 85/100 - Low Risk status</p>
                      <p className="text-xs text-muted-foreground mt-1">December 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">Finished Training Module</h4>
                      <p className="text-sm text-muted-foreground">Essential Hygiene Practices - Certificate earned</p>
                      <p className="text-xs text-muted-foreground mt-1">November 28, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <ClipboardCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">Updated Compliance Record</h4>
                      <p className="text-sm text-muted-foreground">Annual Veterinary Inspection - Completed</p>
                      <p className="text-xs text-muted-foreground mt-1">November 25, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Milestones and certifications you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Earned: {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Manage how you receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={profile.preferences.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("preferences", "emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsAlerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical alerts via text message</p>
                  </div>
                  <Switch
                    id="smsAlerts"
                    checked={profile.preferences.smsAlerts}
                    onCheckedChange={(checked) => handleInputChange("preferences", "smsAlerts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Summary of farm activities</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={profile.preferences.weeklyReports}
                    onCheckedChange={(checked) => handleInputChange("preferences", "weeklyReports", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trainingReminders">Training Reminders</Label>
                    <p className="text-sm text-muted-foreground">Notifications for new training modules</p>
                  </div>
                  <Switch
                    id="trainingReminders"
                    checked={profile.preferences.trainingReminders}
                    onCheckedChange={(checked) => handleInputChange("preferences", "trainingReminders", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="complianceAlerts">Compliance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Deadline and requirement notifications</p>
                  </div>
                  <Switch
                    id="complianceAlerts"
                    checked={profile.preferences.complianceAlerts}
                    onCheckedChange={(checked) => handleInputChange("preferences", "complianceAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Language and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={profile.preferences.language}
                      onValueChange={(value) => handleInputChange("preferences", "language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profile.preferences.timezone}
                      onValueChange={(value) => handleInputChange("preferences", "timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  Don't forget to save your changes when you're done editing your profile.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
