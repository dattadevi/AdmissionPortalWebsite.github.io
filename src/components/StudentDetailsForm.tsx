import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingData } from '../App';
import { toast } from 'sonner@2.0.3';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type StudentDetailsFormProps = {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
};

export function StudentDetailsForm({ bookingData, setBookingData }: StudentDetailsFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    previousSchool: '',
    percentage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value);
    
    if (emptyFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setBookingData({
      ...bookingData,
      studentDetails: formData,
    });
    
    toast.success('Details saved successfully');
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img src={instituteLogo} alt="Institute Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-lg text-purple-900">Dr. M.G.R. Educational and Research Institute</h1>
                <p className="text-slate-600 text-sm">B. Tech IT - Admission Portal</p>
              </div>
            </Link>
            <Link to="/admission">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-green-700">Select Slot</span>
            </div>
            <div className="flex-1 h-1 bg-green-600 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center">2</div>
              <span className="text-purple-900">Student Details</span>
            </div>
            <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center">3</div>
              <span className="text-slate-500">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center">4</div>
              <span className="text-slate-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900">Student Details</CardTitle>
              <p className="text-slate-600">
                Selected Slot: <span className="text-purple-700">#{bookingData.selectedSlot}</span>
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg text-purple-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(value) => handleSelectChange('gender', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h3 className="text-lg text-purple-900 mb-4">Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Guardian Name *</Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        placeholder="Enter guardian's name"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                      <Input
                        id="guardianPhone"
                        name="guardianPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.guardianPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg text-purple-900 mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="previousSchool">Previous School/College *</Label>
                      <Input
                        id="previousSchool"
                        name="previousSchool"
                        placeholder="Name of your previous institution"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="percentage">12th Percentage/CGPA *</Label>
                      <Input
                        id="percentage"
                        name="percentage"
                        placeholder="e.g., 85% or 8.5 CGPA"
                        value={formData.percentage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-blue-800">
                  <p>
                    Please ensure all information is accurate. You will need to provide original documents 
                    during the verification process.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admission')}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-purple-700 hover:bg-purple-800"
                  >
                    Proceed to Payment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
