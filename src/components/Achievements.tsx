import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Trophy, Award, Users, Target, Star, Medal, TrendingUp } from 'lucide-react';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

export function Achievements() {
  const achievements = [
    {
      year: '2024',
      title: 'National Hackathon Champions',
      description: 'Our students won first place at the National Smart India Hackathon, competing against 500+ teams from across India.',
      category: 'Competition',
      icon: Trophy,
    },
    {
      year: '2024',
      title: 'Best Department Award',
      description: 'Recognized as the Best IT Department in South India by the Indian Technical Education Association.',
      category: 'Recognition',
      icon: Award,
    },
    {
      year: '2023',
      title: '100% Placement Record',
      description: 'Achieved 100% placement with average package of ₹8.5 LPA and highest package of ₹42 LPA.',
      category: 'Placement',
      icon: TrendingUp,
    },
    {
      year: '2023',
      title: 'Research Excellence Award',
      description: 'Published 45+ research papers in international journals and conferences, receiving the Excellence in Research Award.',
      category: 'Research',
      icon: Star,
    },
    {
      year: '2023',
      title: 'AI/ML Innovation Prize',
      description: 'Student project on healthcare AI won the National Innovation Award and ₹5 lakh grant.',
      category: 'Innovation',
      icon: Medal,
    },
    {
      year: '2022',
      title: 'Industry Collaboration',
      description: 'Established partnerships with 25+ leading IT companies including TCS, Infosys, Wipro, and Google.',
      category: 'Partnership',
      icon: Users,
    },
  ];

  const studentAchievements = [
    {
      name: 'Rajesh Kumar',
      achievement: 'Google Summer of Code',
      year: '2024',
      description: 'Selected for Google Summer of Code for contributing to open-source ML frameworks.',
    },
    {
      name: 'Priya Sharma',
      achievement: 'International Paper Award',
      year: '2024',
      description: 'Best Paper Award at IEEE International Conference on Cloud Computing.',
    },
    {
      name: 'Amit Patel',
      achievement: 'Startup Founder',
      year: '2023',
      description: 'Founded AI-based EdTech startup, raised ₹2 crore in seed funding.',
    },
    {
      name: 'Sneha Reddy',
      achievement: 'ACM ICPC Finalist',
      year: '2023',
      description: 'Represented India at ACM ICPC World Finals in competitive programming.',
    },
  ];

  const statistics = [
    { label: 'National Awards', value: '50+', icon: Trophy },
    { label: 'Research Papers', value: '200+', icon: Star },
    { label: 'Patents Filed', value: '15', icon: Award },
    { label: 'Industry Partners', value: '25+', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img src={instituteLogo} alt="Institute Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-lg text-purple-900">Dr. M.G.R. Educational and Research Institute</h1>
                <p className="text-slate-600 text-sm">B. Tech - Information Technology</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Our Achievements</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Celebrating excellence, innovation, and success in Information Technology education
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-10 w-10 mx-auto mb-3 opacity-80" />
                  <div className="text-4xl mb-2">{stat.value}</div>
                  <p className="text-purple-100">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Department Achievements */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl text-center mb-8 text-purple-900">Department Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-purple-100 rounded-full p-3">
                      <achievement.icon className="h-6 w-6 text-purple-700" />
                    </div>
                    <Badge variant="outline" className="border-purple-600 text-purple-700">
                      {achievement.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-purple-900">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-3">{achievement.description}</p>
                  <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                    {achievement.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Student Achievements */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl text-center mb-8 text-purple-900">Outstanding Student Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentAchievements.map((student, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-full w-12 h-12 flex items-center justify-center text-white flex-shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg text-purple-900">{student.name}</h3>
                        <Badge variant="outline" className="border-purple-600 text-purple-700">
                          {student.year}
                        </Badge>
                      </div>
                      <p className="text-purple-700 mb-2">{student.achievement}</p>
                      <p className="text-sm text-slate-600">{student.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Placement Highlights */}
        <section className="max-w-6xl mx-auto mb-16">
          <Card className="shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3 justify-center">
                <Target className="h-8 w-8 text-green-700" />
                <CardTitle className="text-3xl text-green-900">Placement Highlights 2023-24</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl text-green-700 mb-2">100%</div>
                  <p className="text-slate-600">Placement Rate</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl text-green-700 mb-2">₹8.5 LPA</div>
                  <p className="text-slate-600">Average Package</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl text-green-700 mb-2">₹42 LPA</div>
                  <p className="text-slate-600">Highest Package</p>
                </div>
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg text-purple-900 mb-3">Top Recruiters</h3>
                <div className="flex flex-wrap gap-3">
                  {['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 
                    'IBM', 'Oracle', 'Adobe', 'Flipkart', 'Paytm', 'Zoho'].map((company, index) => (
                    <Badge key={index} variant="outline" className="border-purple-300 text-purple-700 px-3 py-1">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hackathons & Competitions */}
        <section className="max-w-6xl mx-auto mb-16">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900 text-center">
                Recent Competition Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    event: 'Smart India Hackathon 2024',
                    position: '1st Place',
                    prize: '₹1,00,000',
                  },
                  {
                    event: 'TCS CodeVita 2024',
                    position: 'Top 10 Nationwide',
                    prize: 'Direct Interview',
                  },
                  {
                    event: 'Google Hash Code 2024',
                    position: 'Top 50 in India',
                    prize: 'Recognition',
                  },
                  {
                    event: 'Microsoft Imagine Cup',
                    position: 'Regional Finalists',
                    prize: '₹50,000',
                  },
                ].map((competition, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors">
                    <div>
                      <p className="text-purple-900">{competition.event}</p>
                      <p className="text-sm text-slate-600">{competition.position}</p>
                    </div>
                    <Badge className="bg-purple-700 hover:bg-purple-800">
                      {competition.prize}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center">
          <Card className="shadow-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
            <CardContent className="p-8">
              <Medal className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl mb-4">Be Part of Our Success Story</h2>
              <p className="text-lg mb-6 text-purple-100">
                Join us and create your own achievements in the field of Information Technology
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  Apply Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">
            &copy; 2025 Dr. M.G.R. Educational and Research Institute. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
