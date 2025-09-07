import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">FarmSecure</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Digital Farm Management Portal - Making biosecurity simple and effective for pig and poultry farmers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/risk-assessment"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Risk Assessment
              </Link>
              <Link
                href="/training"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Training Modules
              </Link>
              <Link
                href="/compliance"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Compliance Tracking
              </Link>
              <Link href="/alerts" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Disease Alerts
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@farmsecure.gov</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Ministry of Agriculture</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Ministry of Agriculture. All rights reserved. | Digital Farm Management Portal
          </p>
        </div>
      </div>
    </footer>
  )
}
