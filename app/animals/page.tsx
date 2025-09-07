"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, Heart, Calendar, Activity, Upload, Eye } from "lucide-react"

// Sample animal data
const initialAnimals = [
  {
    id: 1,
    name: "Bella",
    type: "Pig",
    breed: "Yorkshire",
    age: "2 years",
    healthStatus: "Healthy",
    lastVaccination: "2024-01-15",
    image: "/placeholder-ei7sm.png",
    notes: "Active and healthy. Good appetite.",
    weight: "180 kg",
  },
  {
    id: 2,
    name: "Charlie",
    type: "Poultry",
    breed: "Rhode Island Red",
    age: "8 months",
    healthStatus: "Under Treatment",
    lastVaccination: "2024-02-01",
    image: "/rhode-island-red-chicken.jpg",
    notes: "Minor respiratory issue, responding well to treatment.",
    weight: "2.5 kg",
  },
  {
    id: 3,
    name: "Daisy",
    type: "Pig",
    breed: "Duroc",
    age: "1.5 years",
    healthStatus: "Healthy",
    lastVaccination: "2024-01-20",
    image: "/placeholder-6gwf4.png",
    notes: "Excellent breeding stock. Very docile.",
    weight: "150 kg",
  },
  {
    id: 4,
    name: "Henrietta",
    type: "Poultry",
    breed: "Leghorn",
    age: "1 year",
    healthStatus: "Healthy",
    lastVaccination: "2024-02-10",
    image: "/placeholder-06hme.png",
    notes: "High egg production. Very active.",
    weight: "2.2 kg",
  },
  {
    id: 5,
    name: "Babe",
    type: "Pig",
    breed: "Hampshire",
    age: "6 months",
    healthStatus: "Healthy",
    lastVaccination: "2024-02-05",
    image: "/placeholder-hwkt9.png",
    notes: "Young and growing well. Good genetics.",
    weight: "80 kg",
  },
  {
    id: 6,
    name: "Clucky",
    type: "Poultry",
    breed: "Buff Orpington",
    age: "2 years",
    healthStatus: "Healthy",
    lastVaccination: "2024-01-25",
    image: "/placeholder-mgkj7.png",
    notes: "Excellent mother hen. Calm temperament.",
    weight: "3.1 kg",
  },
]

export default function AnimalsPage() {
  const [animals, setAnimals] = useState(initialAnimals)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterHealth, setFilterHealth] = useState("all")
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    healthStatus: "Healthy",
    lastVaccination: "",
    notes: "",
    weight: "",
    image: "",
  })

  // Filter animals based on search and filters
  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || animal.type.toLowerCase() === filterType.toLowerCase()
    const matchesHealth = filterHealth === "all" || animal.healthStatus.toLowerCase() === filterHealth.toLowerCase()

    return matchesSearch && matchesType && matchesHealth
  })

  const handleAddAnimal = () => {
    if (newAnimal.name && newAnimal.type && newAnimal.breed) {
      const animal = {
        ...newAnimal,
        id: animals.length + 1,
        image:
          newAnimal.image || `/placeholder.svg?height=200&width=200&query=${newAnimal.breed} ${newAnimal.type} farm`,
      }
      setAnimals([...animals, animal])
      setNewAnimal({
        name: "",
        type: "",
        breed: "",
        age: "",
        healthStatus: "Healthy",
        lastVaccination: "",
        notes: "",
        weight: "",
        image: "",
      })
      setIsAddModalOpen(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewAnimal({ ...newAnimal, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const getHealthStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "under treatment":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sick":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const stats = {
    total: animals.length,
    pigs: animals.filter((a) => a.type === "Pig").length,
    poultry: animals.filter((a) => a.type === "Poultry").length,
    healthy: animals.filter((a) => a.healthStatus === "Healthy").length,
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Animal Profiles</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your livestock health and records</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Animal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Animal Profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Animal Name</Label>
                  <Input
                    id="name"
                    value={newAnimal.name}
                    onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                    placeholder="Enter animal name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newAnimal.type} onValueChange={(value) => setNewAnimal({ ...newAnimal, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pig">Pig</SelectItem>
                      <SelectItem value="Poultry">Poultry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={newAnimal.breed}
                    onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                    placeholder="Enter breed"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={newAnimal.age}
                    onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })}
                    placeholder="e.g., 2 years, 6 months"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={newAnimal.weight}
                    onChange={(e) => setNewAnimal({ ...newAnimal, weight: e.target.value })}
                    placeholder="e.g., 180 kg, 2.5 kg"
                  />
                </div>
                <div>
                  <Label htmlFor="health">Health Status</Label>
                  <Select
                    value={newAnimal.healthStatus}
                    onValueChange={(value) => setNewAnimal({ ...newAnimal, healthStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Healthy">Healthy</SelectItem>
                      <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                      <SelectItem value="Sick">Sick</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="vaccination">Last Vaccination Date</Label>
                <Input
                  id="vaccination"
                  type="date"
                  value={newAnimal.lastVaccination}
                  onChange={(e) => setNewAnimal({ ...newAnimal, lastVaccination: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="image">Animal Image</Label>
                <div className="flex items-center gap-4">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                  <Upload className="h-4 w-4 text-gray-400" />
                </div>
                {newAnimal.image && (
                  <div className="mt-2">
                    <img
                      src={newAnimal.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAnimal.notes}
                  onChange={(e) => setNewAnimal({ ...newAnimal, notes: e.target.value })}
                  placeholder="Additional notes about the animal..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAnimal}>Add Animal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Animals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pigs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pigs}</p>
              </div>
              <div className="text-2xl">🐖</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Poultry</p>
                <p className="text-2xl font-bold text-gray-900">{stats.poultry}</p>
              </div>
              <div className="text-2xl">🐓</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Healthy</p>
                <p className="text-2xl font-bold text-green-600">{stats.healthy}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pig">Pigs</SelectItem>
              <SelectItem value="poultry">Poultry</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterHealth} onValueChange={setFilterHealth}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Health Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="under treatment">Under Treatment</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={animal.image || "/placeholder.svg"}
                  alt={animal.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setSelectedAnimal(animal)
                    setIsViewModalOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900">{animal.name}</h3>
                  <Badge className={getHealthStatusColor(animal.healthStatus)}>{animal.healthStatus}</Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{animal.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Breed:</span>
                    <span className="font-medium">{animal.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-medium">{animal.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-medium">{animal.weight}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Vaccination:</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-medium">{new Date(animal.lastVaccination).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No animals found</h3>
          <p className="text-gray-600">Try adjusting your search or filters, or add a new animal profile.</p>
        </div>
      )}

      {/* Animal Detail Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAnimal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  {selectedAnimal.name} - Detailed Profile
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedAnimal.image || "/placeholder.svg"}
                    alt={selectedAnimal.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedAnimal.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Breed:</span>
                        <span className="font-medium">{selectedAnimal.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedAnimal.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{selectedAnimal.weight}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Health Status</h4>
                    <Badge className={getHealthStatusColor(selectedAnimal.healthStatus)}>
                      {selectedAnimal.healthStatus}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Last Vaccination</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(selectedAnimal.lastVaccination).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedAnimal.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedAnimal.notes}</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
