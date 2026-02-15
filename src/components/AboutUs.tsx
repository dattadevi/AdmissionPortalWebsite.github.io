import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Target, Eye, Award, Users, BookOpen, Lightbulb } from 'lucide-react';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

export function AboutUs() {
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
          <h1 className="text-4xl md:text-5xl mb-4">About Our Department</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Pioneering excellence in Information Technology education since our inception
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Department Overview */}
        <section className="max-w-5xl mx-auto mb-16">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6 text-purple-900">Department of Information Technology</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  The Department of Information Technology at Dr. M.G.R. Educational and Research Institute 
                  stands as a beacon of technological excellence and innovation. Established with a vision 
                  to produce world-class IT professionals, our department has consistently maintained its 
                  position as one of the premier IT education centers in the region.
                </p>
                <p>
                  We offer a comprehensive B.Tech program in Information Technology that combines 
                  theoretical knowledge with practical skills. Our curriculum is designed in collaboration 
                  with industry experts to ensure our graduates are well-prepared for the challenges of 
                  the modern IT industry.
                </p>
                <p>
                  With state-of-the-art laboratories, experienced faculty members, and strong industry 
                  partnerships, we provide our students with an environment that fosters learning, 
                  innovation, and professional growth. Our alumni have gone on to successful careers at 
                  leading technology companies worldwide, making significant contributions to the field 
                  of Information Technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Eye className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-2xl text-purple-900">Our Vision</h3>
                </div>
                <p className="text-slate-700">
                  To be a globally recognized center of excellence in Information Technology education, 
                  fostering innovation, research, and entrepreneurship while producing ethical and 
                  socially responsible IT professionals who contribute to the advancement of technology 
                  and society.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Target className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-2xl text-purple-900">Our Mission</h3>
                </div>
                <p className="text-slate-700">
                  To provide high-quality education in Information Technology through innovative teaching 
                  methodologies, cutting-edge research, and industry collaboration. We aim to develop 
                  technically competent professionals with strong ethical values, leadership skills, and 
                  a commitment to lifelong learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl text-center mb-8 text-purple-900">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Expert Faculty</h3>
                <p className="text-slate-600">
                  Our faculty members are highly qualified, experienced professionals with expertise in 
                  diverse areas of Information Technology. They are dedicated to providing quality 
                  education and mentoring students.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Industry-Aligned Curriculum</h3>
                <p className="text-slate-600">
                  Our curriculum is regularly updated to reflect the latest industry trends and 
                  technological advancements, ensuring our students learn the most relevant and 
                  in-demand skills.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Innovation Hub</h3>
                <p className="text-slate-600">
                  We encourage research, innovation, and entrepreneurship through various initiatives, 
                  hackathons, and project-based learning opportunities that prepare students for 
                  real-world challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Placement Support</h3>
                <p className="text-slate-600">
                  Our dedicated placement cell works tirelessly to connect students with top companies. 
                  We maintain a strong track record of placing students in leading IT firms.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Modern Infrastructure</h3>
                <p className="text-slate-600">
                  State-of-the-art computer labs, high-speed internet connectivity, cloud computing 
                  resources, and access to the latest software and development tools.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl mb-3 text-purple-900">Holistic Development</h3>
                <p className="text-slate-600">
                  We focus on overall personality development through technical clubs, cultural activities, 
                  sports, and leadership programs that shape well-rounded professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Areas of Specialization */}
        <section className="max-w-5xl mx-auto mb-16">
          <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6 text-purple-900 text-center">Areas of Specialization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Artificial Intelligence & Machine Learning',
                  'Data Science & Analytics',
                  'Cloud Computing & DevOps',
                  'Cybersecurity',
                  'Web & Mobile App Development',
                  'Internet of Things (IoT)',
                  'Blockchain Technology',
                  'Software Engineering',
                  'Database Management Systems',
                  'Computer Networks',
                ].map((area, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-slate-700">{area}</span>
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
              <h2 className="text-3xl mb-4">Ready to Join Us?</h2>
              <p className="text-lg mb-6 text-purple-100">
                Take the first step towards a successful career in Information Technology
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                    Apply Now
                  </Button>
                </Link>
                <Link to="/ar-tour">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Take a Virtual Tour
                  </Button>
                </Link>
              </div>
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
