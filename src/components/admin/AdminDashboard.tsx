import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Armchair, 
  CreditCard,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { toast } from 'sonner@2.0.3';

const applicationTrendData = [
  { month: 'Jan', applications: 45 },
  { month: 'Feb', applications: 52 },
  { month: 'Mar', applications: 68 },
  { month: 'Apr', applications: 71 },
  { month: 'May', applications: 89 },
  { month: 'Jun', applications: 95 },
];

const approvalData = [
  { name: 'Approved', value: 142, color: '#7c3aed' },
  { name: 'Rejected', value: 38, color: '#e11d48' },
  { name: 'Pending', value: 45, color: '#64748b' },
];

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <h2 className="text-purple-900">Admin Portal</h2>
          <p className="text-slate-600 text-sm">Dr. M.G.R. Institute</p>
        </div>
        <nav className="px-4 space-y-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-900 rounded-lg">
            <TrendingUp className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/applications" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
            <FileText className="h-5 w-5" />
            Applications
          </Link>
          <Link to="/admin/seats" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
            <Armchair className="h-5 w-5" />
            Seat Management
          </Link>
          <Link to="/admin/ar-content" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            AR Content
          </Link>
          <Link to="/admin/notifications" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
          <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start gap-2 text-slate-700" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-purple-900">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-white text-xs">
                  3
                </Badge>
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">admin@drmgrdu.ac.in</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  AU
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl text-purple-900">225</div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl text-purple-900">45</div>
                  <FileText className="h-8 w-8 text-amber-500" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Approved Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl text-purple-900">142</div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">63% approval rate</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Available Seats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl text-purple-900">38</div>
                  <Armchair className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Out of 180 total</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl text-purple-900">18</div>
                  <CreditCard className="h-8 w-8 text-rose-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">₹18,000 pending</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-purple-900">Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={applicationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#7c3aed" 
                      strokeWidth={2}
                      dot={{ fill: '#7c3aed', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={approvalData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {approvalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New application received', user: 'Rahul Kumar', time: '5 minutes ago', type: 'new' },
                  { action: 'Application approved', user: 'Priya Sharma', time: '1 hour ago', type: 'approved' },
                  { action: 'Payment confirmed', user: 'Amit Patel', time: '2 hours ago', type: 'payment' },
                  { action: 'Document uploaded', user: 'Sneha Reddy', time: '3 hours ago', type: 'document' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'new' ? 'bg-blue-600' :
                        activity.type === 'approved' ? 'bg-green-600' :
                        activity.type === 'payment' ? 'bg-purple-600' :
                        'bg-slate-600'
                      }`}></div>
                      <div>
                        <p className="text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}