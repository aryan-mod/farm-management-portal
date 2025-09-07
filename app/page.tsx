import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  BookOpen,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Leaf,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react"

export default function HomePage() {
  const quickActions = [
    {
      title: "Risk Assessment",
      description: "Evaluate your farm's biosecurity risks",
      href: "/risk-assessment",
      icon: Shield,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      title: "Training",
      description: "Access biosecurity training modules",
      href: "/training",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Compliance",
      description: "Track compliance activities",
      href: "/compliance",
      icon: ClipboardCheck,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Alerts",
      description: "View disease alerts and updates",
      href: "/alerts",
      icon: AlertTriangle,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      title: "Records",
      description: "Manage farm records and documentation",
      href: "/profile",
      icon: FileText,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access to veterinary experts and agricultural specialists for personalized advice and support.",
    },
    {
      icon: TrendingUp,
      title: "Improved Productivity",
      description: "Optimize your farm operations with data-driven insights and best practice recommendations.",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Streamline compliance tracking and reduce administrative overhead with automated tools.",
    },
    {
      icon: CheckCircle,
      title: "Compliance Assurance",
      description: "Stay up-to-date with regulations and maintain comprehensive audit trails effortlessly.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Monitor farm performance with detailed analytics and predictive health assessments.",
    },
    {
      icon: Shield,
      title: "Enhanced Biosecurity",
      description: "Implement robust biosecurity measures to protect your livestock and prevent disease outbreaks.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Leaf className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Digital Farm Management Portal
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
            Biosecurity Made Easy
          </p>

          <p className="text-lg text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
            Comprehensive biosecurity management for pig and poultry farmers. Protect your livestock, ensure compliance,
            and optimize your operations with our integrated platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/risk-assessment">
                <Shield className="mr-2 h-5 w-5" />
                Start Risk Assessment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/training">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Training
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Actions</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Access key features and tools to manage your farm's biosecurity effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Card
                  key={action.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${action.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="mb-4 text-pretty">{action.description}</CardDescription>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={action.href}>Access Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose FarmSecure?</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover the benefits of modern digital farm management and biosecurity solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-pretty">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Secure Your Farm?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Join thousands of farmers who trust FarmSecure to protect their livestock and optimize their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/profile">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/alerts">View Latest Alerts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
