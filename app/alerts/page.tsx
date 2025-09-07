"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  MapPin,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Brain,
  Shield,
  Activity,
  Users,
  Clock,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react"

interface DiseaseAlert {
  id: string
  title: string
  disease: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  region: string
  affectedSpecies: string[]
  dateIssued: string
  lastUpdated: string
  description: string
  recommendations: string[]
  contactInfo?: {
    phone: string
    email: string
  }
  status: "active" | "monitoring" | "resolved"
  casesReported: number
  farmsAffected: number
}

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterSpecies, setFilterSpecies] = useState("all")

  const diseaseAlerts: DiseaseAlert[] = [
    {
      id: "1",
      title: "African Swine Fever Outbreak - Northern Region",
      disease: "African Swine Fever",
      severity: "critical",
      location: "Northern Agricultural District",
      region: "North",
      affectedSpecies: ["Pigs"],
      dateIssued: "2024-12-08",
      lastUpdated: "2024-12-10",
      description:
        "Confirmed cases of African Swine Fever detected in multiple farms. Immediate biosecurity measures required.",
      recommendations: [
        "Implement strict quarantine protocols",
        "Restrict pig movement in affected areas",
        "Enhanced disinfection procedures",
        "Report any suspicious symptoms immediately",
      ],
      contactInfo: {
        phone: "+1-555-EMERGENCY",
        email: "emergency@agriculture.gov",
      },
      status: "active",
      casesReported: 23,
      farmsAffected: 8,
    },
    {
      id: "2",
      title: "Avian Influenza Monitoring Alert",
      disease: "Avian Influenza H5N1",
      severity: "high",
      location: "Central Valley Region",
      region: "Central",
      affectedSpecies: ["Poultry", "Wild Birds"],
      dateIssued: "2024-12-05",
      lastUpdated: "2024-12-09",
      description:
        "Increased surveillance for Avian Influenza following detection in neighboring regions. Preventive measures recommended.",
      recommendations: [
        "Monitor flock health daily",
        "Limit contact with wild birds",
        "Secure feed and water sources",
        "Report unusual mortality rates",
      ],
      contactInfo: {
        phone: "+1-555-AVIAN-FLU",
        email: "avian@agriculture.gov",
      },
      status: "monitoring",
      casesReported: 5,
      farmsAffected: 3,
    },
    {
      id: "3",
      title: "Foot and Mouth Disease - Surveillance Update",
      disease: "Foot and Mouth Disease",
      severity: "medium",
      location: "Eastern Agricultural Zone",
      region: "East",
      affectedSpecies: ["Cattle", "Pigs", "Sheep"],
      dateIssued: "2024-12-01",
      lastUpdated: "2024-12-07",
      description:
        "Enhanced surveillance measures in place following international outbreak reports. No local cases confirmed.",
      recommendations: [
        "Maintain strict farm biosecurity",
        "Monitor animal health closely",
        "Restrict unnecessary farm visits",
        "Keep detailed health records",
      ],
      status: "monitoring",
      casesReported: 0,
      farmsAffected: 0,
    },
    {
      id: "4",
      title: "Salmonella Contamination Warning",
      disease: "Salmonella Enteritidis",
      severity: "medium",
      location: "Southern Poultry District",
      region: "South",
      affectedSpecies: ["Poultry"],
      dateIssued: "2024-11-28",
      lastUpdated: "2024-12-06",
      description:
        "Feed contamination suspected in multiple poultry operations. Enhanced testing and monitoring protocols activated.",
      recommendations: [
        "Test feed sources immediately",
        "Implement enhanced hygiene protocols",
        "Monitor egg production quality",
        "Isolate affected flocks if necessary",
      ],
      contactInfo: {
        phone: "+1-555-FEED-SAFE",
        email: "feedsafety@agriculture.gov",
      },
      status: "active",
      casesReported: 12,
      farmsAffected: 4,
    },
    {
      id: "5",
      title: "Porcine Epidemic Diarrhea - Resolved",
      disease: "Porcine Epidemic Diarrhea",
      severity: "low",
      location: "Western Farm District",
      region: "West",
      affectedSpecies: ["Pigs"],
      dateIssued: "2024-11-15",
      lastUpdated: "2024-12-05",
      description: "Previous outbreak successfully contained. Monitoring continues for 30 days post-resolution.",
      recommendations: [
        "Continue enhanced monitoring",
        "Maintain biosecurity protocols",
        "Document lessons learned",
        "Prepare for future prevention",
      ],
      status: "resolved",
      casesReported: 8,
      farmsAffected: 2,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "monitoring":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAlerts = diseaseAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesRegion = filterRegion === "all" || alert.region === filterRegion
    const matchesSpecies =
      filterSpecies === "all" || alert.affectedSpecies.some((species) => species.toLowerCase().includes(filterSpecies))

    return matchesSearch && matchesSeverity && matchesRegion && matchesSpecies
  })

  const activeAlerts = diseaseAlerts.filter((alert) => alert.status === "active").length
  const criticalAlerts = diseaseAlerts.filter((alert) => alert.severity === "critical").length
  const totalCases = diseaseAlerts.reduce((sum, alert) => sum + alert.casesReported, 0)
  const totalFarms = diseaseAlerts.reduce((sum, alert) => sum + alert.farmsAffected, 0)

  const aiInsights = [
    "Critical ASF outbreak requires immediate attention - consider emergency protocols",
    "Avian Influenza risk elevated due to seasonal migration patterns",
    "Your farm's biosecurity score suggests good protection against current threats",
    "Recommend increased surveillance for farms within 50km of active alerts",
  ]

  const regions = ["North", "South", "East", "West", "Central"]
  const species = ["pigs", "poultry", "cattle", "sheep"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Disease Alerts Dashboard</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Real-time disease monitoring and outbreak alerts for your region
          </p>
        </div>

        {/* Alert Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{activeAlerts}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{criticalAlerts}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Highest priority alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{totalCases}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Reported across all alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Affected Farms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{totalFarms}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Farms under monitoring</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Threat Analysis
                </CardTitle>
                <CardDescription>
                  Intelligent risk assessment based on current alerts and your farm profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <Alert key={index}>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>{insight}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts by disease, location, or title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger className="w-[130px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterRegion} onValueChange={setFilterRegion}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Species</SelectItem>
                        {species.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disease Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Current Alerts</h2>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredAlerts.length} of {diseaseAlerts.length} alerts
                </span>
              </div>

              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Updated {new Date(alert.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Issued {new Date(alert.dateIssued).toLocaleDateString()}
                          </div>
                        </CardDescription>
                      </div>
                      {alert.contactInfo && (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{alert.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Disease:</span>
                          <p className="text-muted-foreground">{alert.disease}</p>
                        </div>
                        <div>
                          <span className="font-medium">Affected Species:</span>
                          <p className="text-muted-foreground">{alert.affectedSpecies.join(", ")}</p>
                        </div>
                        <div>
                          <span className="font-medium">Impact:</span>
                          <p className="text-muted-foreground">
                            {alert.casesReported} cases, {alert.farmsAffected} farms
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {alert.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Shield className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {alert.contactInfo && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <h4 className="font-medium mb-2 text-sm">Emergency Contact:</h4>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {alert.contactInfo.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {alert.contactInfo.email}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No alerts found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Regional Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regional Alert Map</CardTitle>
                <CardDescription>Geographic distribution of current alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Will show real-time alert locations and severity levels
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alert Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Critical Alerts</span>
                    <span className="text-sm font-medium">{criticalAlerts}</span>
                  </div>
                  <Progress value={(criticalAlerts / diseaseAlerts.length) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Active Monitoring</span>
                    <span className="text-sm font-medium">
                      {diseaseAlerts.filter((a) => a.status === "monitoring").length}
                    </span>
                  </div>
                  <Progress
                    value={(diseaseAlerts.filter((a) => a.status === "monitoring").length / diseaseAlerts.length) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Resolved Cases</span>
                    <span className="text-sm font-medium">
                      {diseaseAlerts.filter((a) => a.status === "resolved").length}
                    </span>
                  </div>
                  <Progress
                    value={(diseaseAlerts.filter((a) => a.status === "resolved").length / diseaseAlerts.length) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Alert Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Trends
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-red-800">24/7 Emergency Hotline</div>
                  <div className="text-red-700">+1-555-FARM-911</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-red-800">Veterinary Emergency</div>
                  <div className="text-red-700">+1-555-VET-HELP</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-red-800">Disease Reporting</div>
                  <div className="text-red-700">report@agriculture.gov</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
