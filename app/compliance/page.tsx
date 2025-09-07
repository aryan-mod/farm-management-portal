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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ClipboardCheck,
  Plus,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  TrendingUp,
  Brain,
  Filter,
  Download,
  Eye,
  Edit,
} from "lucide-react"

interface ComplianceRecord {
  id: string
  activity: string
  category: string
  date: string
  dueDate: string
  status: "completed" | "pending" | "overdue"
  notes: string
  inspector?: string
  certificate?: string
  nextDue?: string
}

interface NewRecord {
  activity: string
  category: string
  date: string
  dueDate: string
  notes: string
  inspector: string
}

export default function CompliancePage() {
  const [records, setRecords] = useState<ComplianceRecord[]>([
    {
      id: "1",
      activity: "Annual Veterinary Inspection",
      category: "Health Management",
      date: "2024-01-15",
      dueDate: "2024-01-15",
      status: "completed",
      notes: "All animals healthy, no issues found",
      inspector: "Dr. Sarah Johnson",
      certificate: "CERT-2024-001",
      nextDue: "2025-01-15",
    },
    {
      id: "2",
      activity: "Swine Flu Vaccination - Batch A",
      category: "Vaccination",
      date: "2024-02-10",
      dueDate: "2024-02-10",
      status: "completed",
      notes: "150 pigs vaccinated successfully",
      inspector: "Farm Staff",
      nextDue: "2024-08-10",
    },
    {
      id: "3",
      activity: "Waste Disposal Audit",
      category: "Environmental",
      date: "2024-03-01",
      dueDate: "2024-03-01",
      status: "completed",
      notes: "Proper disposal protocols followed",
      inspector: "Environmental Officer",
      certificate: "ENV-2024-003",
      nextDue: "2024-09-01",
    },
    {
      id: "4",
      activity: "Biosecurity Protocol Review",
      category: "Biosecurity",
      date: "",
      dueDate: "2024-12-15",
      status: "pending",
      notes: "Quarterly review scheduled",
      nextDue: "2025-03-15",
    },
    {
      id: "5",
      activity: "Feed Quality Testing",
      category: "Nutrition",
      date: "",
      dueDate: "2024-11-30",
      status: "overdue",
      notes: "Monthly feed quality assessment",
      nextDue: "2024-12-30",
    },
    {
      id: "6",
      activity: "Poultry Health Check - Coop B",
      category: "Health Management",
      date: "",
      dueDate: "2024-12-10",
      status: "pending",
      notes: "Routine health monitoring",
      nextDue: "2025-01-10",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [newRecord, setNewRecord] = useState<NewRecord>({
    activity: "",
    category: "",
    date: "",
    dueDate: "",
    notes: "",
    inspector: "",
  })

  const categories = [
    "Health Management",
    "Vaccination",
    "Environmental",
    "Biosecurity",
    "Nutrition",
    "Safety",
    "Documentation",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredRecords = records.filter((record) => {
    const matchesCategory = filterCategory === "all" || record.category === filterCategory
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    return matchesCategory && matchesStatus
  })

  const completedCount = records.filter((r) => r.status === "completed").length
  const pendingCount = records.filter((r) => r.status === "pending").length
  const overdueCount = records.filter((r) => r.status === "overdue").length
  const complianceRate = (completedCount / records.length) * 100

  const handleAddRecord = () => {
    const record: ComplianceRecord = {
      id: Date.now().toString(),
      ...newRecord,
      status: new Date(newRecord.dueDate) < new Date() ? "overdue" : "pending",
    }
    setRecords([...records, record])
    setNewRecord({
      activity: "",
      category: "",
      date: "",
      dueDate: "",
      notes: "",
      inspector: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleMarkComplete = (id: string) => {
    setRecords(
      records.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "completed" as const,
              date: new Date().toISOString().split("T")[0],
            }
          : record,
      ),
    )
  }

  const aiRecommendations = [
    "Schedule upcoming biosecurity review before December 15th deadline",
    "Feed quality testing is overdue - immediate action required",
    "Consider implementing automated compliance reminders",
    "Your vaccination schedule shows good compliance - maintain current practices",
  ]

  const upcomingDeadlines = records
    .filter((r) => r.status === "pending")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ClipboardCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Compliance Tracking</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Monitor and manage your farm's compliance activities, inspections, and regulatory requirements
          </p>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{Math.round(complianceRate)}%</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <Progress value={complianceRate} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {completedCount} of {records.length} activities completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{completedCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Activities completed on time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{pendingCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Activities awaiting completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{overdueCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Activities past due date</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Compliance Insights
                </CardTitle>
                <CardDescription>Intelligent recommendations to improve your compliance management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.map((recommendation, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{recommendation}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Records Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Compliance Records</CardTitle>
                    <CardDescription>Track all your farm compliance activities and their status</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Record
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Compliance Record</DialogTitle>
                          <DialogDescription>Create a new compliance activity record for tracking</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="activity">Activity Name</Label>
                            <Input
                              id="activity"
                              placeholder="e.g., Monthly Health Inspection"
                              value={newRecord.activity}
                              onChange={(e) => setNewRecord({ ...newRecord, activity: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={newRecord.category}
                              onValueChange={(value) => setNewRecord({ ...newRecord, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Completion Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={newRecord.date}
                                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="dueDate">Due Date</Label>
                              <Input
                                id="dueDate"
                                type="date"
                                value={newRecord.dueDate}
                                onChange={(e) => setNewRecord({ ...newRecord, dueDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="inspector">Inspector/Responsible Person</Label>
                            <Input
                              id="inspector"
                              placeholder="e.g., Dr. Smith, Farm Manager"
                              value={newRecord.inspector}
                              onChange={(e) => setNewRecord({ ...newRecord, inspector: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Additional details or observations"
                              value={newRecord.notes}
                              onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleAddRecord} className="flex-1">
                              Add Record
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Activity</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{record.activity}</div>
                              {record.notes && (
                                <div className="text-sm text-muted-foreground line-clamp-1">{record.notes}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{record.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {new Date(record.dueDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              {getStatusIcon(record.status)}
                              <span className="ml-1 capitalize">{record.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              {record.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkComplete(record.id)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredRecords.length === 0 && (
                  <div className="text-center py-8">
                    <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No records found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or add a new record</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <CardDescription>Activities requiring attention soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((record) => (
                    <div key={record.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">{record.activity}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(record.dueDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {record.category}
                      </Badge>
                    </div>
                  ))}
                  {upcomingDeadlines.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming deadlines</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-semibold">
                    {records.filter((r) => new Date(r.date || r.dueDate).getMonth() === new Date().getMonth()).length}{" "}
                    activities
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next 30 Days</span>
                  <span className="font-semibold">
                    {
                      records.filter((r) => {
                        const dueDate = new Date(r.dueDate)
                        const thirtyDaysFromNow = new Date()
                        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
                        return dueDate <= thirtyDaysFromNow && r.status === "pending"
                      }).length
                    }{" "}
                    due
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Completion Time</span>
                  <span className="font-semibold">2.3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compliance Score</span>
                  <span className="font-semibold text-green-600">{Math.round(complianceRate)}%</span>
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
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Records
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
