import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Trophy, Cuboid, ArrowRight, Users, BookOpen, Award, Download, Shield, Glasses } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

export function HomePage() {
  const handlePDFExport = async () => {
    try {
      // Using browser's print functionality which can save as PDF
      window.print();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export is not available in this browser. Please use Print to PDF functionality from the browser menu.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={instituteLogo} alt="Dr. M.G.R. Educational and Research Institute" className="h-16 w-16" />
              <div>
                <h1 className="text-purple-900">Dr. M.G.R. Educational and Research Institute</h1>
                <p className="text-slate-600 text-sm">B. Tech - Information Technology</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-slate-700 hover:text-purple-700 transition-colors">Home</Link>
              <Link to="/about" className="text-slate-700 hover:text-purple-700 transition-colors">About Us</Link>
              <Link to="/achievements" className="text-slate-700 hover:text-purple-700 transition-colors">Achievements</Link>
              <Link to="/admin/login">
                <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-900 hover:bg-purple-50">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-purple-700 hover:bg-purple-800">
                  Register
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm">Admissions Open for 2025-2026</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">
              Welcome to the Future of Information Technology
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Join the prestigious B. Tech IT program at Dr. M.G.R. Educational and Research Institute. 
              Experience world-class education, cutting-edge facilities, and limitless opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ar-tour">
                <Button size="lg" variant="outline" className="border-white text-[rgb(110,0,118)] hover:bg-white/10 bg-[rgb(255,255,255)]">
                  <Cuboid className="mr-2 h-5 w-5" />
                  Virtual AR Tour
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-[rgb(110,0,118)] hover:bg-white/10 bg-[rgb(255,255,255)]" onClick={handlePDFExport}>
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:border-purple-300 transition-all">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-purple-700" />
                <div className="text-3xl mb-2 text-purple-900">1000+</div>
                <p className="text-slate-600">Students Enrolled</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-purple-300 transition-all">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-700" />
                <div className="text-3xl mb-2 text-purple-900">50+</div>
                <p className="text-slate-600">Expert Faculty</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-purple-300 transition-all">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-purple-700" />
                <div className="text-3xl mb-2 text-purple-900">95%</div>
                <p className="text-slate-600">Placement Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-purple-300 transition-all">
              <CardContent className="pt-6">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-700" />
                <div className="text-3xl mb-2 text-purple-900">200+</div>
                <p className="text-slate-600">Awards Won</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl mb-4 text-purple-900">Department Overview</h2>
            <p className="text-lg text-slate-700">
              The Department of Information Technology at Dr. M.G.R. Educational and Research Institute 
              is committed to excellence in education, research, and innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <GraduationCap className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl mb-3 text-purple-900">World-Class Curriculum</h3>
                <p className="text-slate-600">
                  Our curriculum is designed to meet industry standards and prepare students for 
                  the challenges of tomorrow. With a perfect blend of theory and practical knowledge.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Building2 className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl mb-3 text-purple-900">State-of-the-Art Infrastructure</h3>
                <p className="text-slate-600">
                  Experience learning in modern laboratories equipped with the latest technology, 
                  high-speed internet, and collaborative spaces designed for innovation.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Trophy className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl mb-3 text-purple-900">Industry Partnerships</h3>
                <p className="text-slate-600">
                  Strong collaborations with leading tech companies provide students with internship 
                  opportunities, industry exposure, and excellent placement prospects.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl mb-3 text-purple-900">Research & Innovation</h3>
                <p className="text-slate-600">
                  Engage in cutting-edge research projects, participate in hackathons, and contribute 
                  to open-source initiatives under the guidance of experienced faculty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 text-purple-900">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link to="/ar-tour">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-400 h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Cuboid className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl mb-2 text-purple-900">AR Tour</h3>
                  <p className="text-slate-600 text-sm">
                    Take a virtual tour of our IT department and explore our facilities
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/admission">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-400 h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl mb-2 text-purple-900">Admissions</h3>
                  <p className="text-slate-600 text-sm">
                    Book your slot and start your journey towards excellence
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/about">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-400 h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl mb-2 text-purple-900">About Us</h3>
                  <p className="text-slate-600 text-sm">
                    Learn more about our department's history and mission
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/achievements">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-400 h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl mb-2 text-purple-900">Achievements</h3>
                  <p className="text-slate-600 text-sm">
                    Discover our students' and faculty's accomplishments
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={instituteLogo} alt="Institute Logo" className="h-12 w-12" />
                <div>
                  <h3 className="text-lg">Dr. M.G.R. Educational and Research Institute</h3>
                  <p className="text-purple-200 text-sm">Strive to Excel</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm">
                Deemed to be University under Section 3 of the UGC Act, 1956
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/admission" className="hover:text-white transition-colors">Admissions</Link></li>
                <li><Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link></li>
                <li><Link to="/ar-tour" className="hover:text-white transition-colors">AR Tour</Link></li>
                <li><Link to="/ar/login" className="hover:text-white transition-colors text-purple-300 flex items-center gap-1">
                  <Glasses className="h-3 w-3" />
                  AR Login
                </Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors text-purple-300 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Admin Portal
                </Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>Maduravoyal, Chennai - 600095</li>
                <li>Tamil Nadu, India</li>
                <li>Phone: +91 44 2378 2176</li>
                <li>Email: info@drmgrdu.ac.in</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-200 text-sm">
            <p>&copy; 2025 Dr. M.G.R. Educational and Research Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}