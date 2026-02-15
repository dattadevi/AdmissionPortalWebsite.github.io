import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { CheckCircle2, Download, Home, IndianRupee, Mail, Phone, User, Calendar, MapPin } from 'lucide-react';
import { BookingData } from '../App';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type ConfirmationPageProps = {
  bookingData: BookingData;
};

export function ConfirmationPage({ bookingData }: ConfirmationPageProps) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const downloadReceipt = () => {
    // Create a printable receipt
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admission Receipt - ${bookingData.bookingId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #7c3aed;
              padding-bottom: 20px;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 15px;
            }
            h1 {
              color: #581c87;
              margin: 10px 0;
              font-size: 24px;
            }
            .subtitle {
              color: #64748b;
              font-size: 14px;
            }
            .success-badge {
              background: #dcfce7;
              color: #166534;
              padding: 10px 20px;
              border-radius: 8px;
              display: inline-block;
              margin: 20px 0;
              font-weight: bold;
            }
            .booking-id {
              background: #f1f5f9;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
              font-size: 20px;
              font-weight: bold;
              color: #7c3aed;
              border: 2px solid #e9d5ff;
            }
            .section {
              margin: 25px 0;
            }
            .section-title {
              color: #581c87;
              font-size: 16px;
              margin-bottom: 12px;
              border-bottom: 2px solid #e9d5ff;
              padding-bottom: 8px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #f1f5f9;
            }
            .info-label {
              color: #64748b;
              font-weight: 500;
            }
            .info-value {
              color: #1e293b;
              font-weight: 600;
            }
            .total {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e9d5ff;
              text-align: center;
              color: #64748b;
              font-size: 12px;
            }
            .important-note {
              background: #fef3c7;
              border: 1px solid #fbbf24;
              padding: 12px;
              border-radius: 8px;
              margin: 20px 0;
              font-size: 13px;
              color: #92400e;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${instituteLogo}" alt="Institute Logo" class="logo" />
            <h1>Dr. M.G.R. Educational and Research Institute</h1>
            <p class="subtitle">Deemed to be University | B. Tech - Information Technology</p>
            <p class="subtitle">Maduravoyal, Chennai - 600095, Tamil Nadu, India</p>
          </div>

          <div style="text-align: center;">
            <div class="success-badge">✓ ADMISSION SLOT BOOKED SUCCESSFULLY</div>
          </div>

          <div class="booking-id">
            Booking ID: ${bookingData.bookingId}
          </div>

          <div class="section">
            <div class="section-title">Slot Details</div>
            <div class="info-row">
              <span class="info-label">Slot Number</span>
              <span class="info-value">#${bookingData.selectedSlot}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Booking Date</span>
              <span class="info-value">${currentDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Academic Year</span>
              <span class="info-value">2025-2026</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="info-row">
              <span class="info-label">Full Name</span>
              <span class="info-value">${bookingData.studentDetails?.fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value">${bookingData.studentDetails?.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone</span>
              <span class="info-value">${bookingData.studentDetails?.phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date of Birth</span>
              <span class="info-value">${bookingData.studentDetails?.dob}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Gender</span>
              <span class="info-value">${bookingData.studentDetails?.gender}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Guardian Information</div>
            <div class="info-row">
              <span class="info-label">Guardian Name</span>
              <span class="info-value">${bookingData.studentDetails?.guardianName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Guardian Phone</span>
              <span class="info-value">${bookingData.studentDetails?.guardianPhone}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Academic Background</div>
            <div class="info-row">
              <span class="info-label">Previous School/College</span>
              <span class="info-value">${bookingData.studentDetails?.previousSchool}</span>
            </div>
            <div class="info-row">
              <span class="info-label">12th Percentage/CGPA</span>
              <span class="info-value">${bookingData.studentDetails?.percentage}</span>
            </div>
          </div>

          <div class="total">
            <div class="section-title">Payment Details</div>
            <div class="info-row">
              <span class="info-label">Slot Booking Fee</span>
              <span class="info-value">₹ 1,000</span>
            </div>
            <div class="info-row">
              <span class="info-label">GST (18%)</span>
              <span class="info-value">₹ 180</span>
            </div>
            <div class="info-row" style="border-bottom: none; padding-top: 12px;">
              <span class="info-label" style="font-size: 18px;">Total Paid</span>
              <span class="info-value" style="font-size: 18px; color: #7c3aed;">₹ 1,180</span>
            </div>
          </div>

          <div class="important-note">
            <strong>Important Note:</strong> This slot booking fee is non-refundable. Please keep this receipt safe 
            for future reference. You will need to present this during document verification.
          </div>

          <div class="section">
            <div class="section-title">Next Steps</div>
            <ol style="color: #475569; line-height: 1.8;">
              <li>Keep this receipt safe for document verification</li>
              <li>Watch your email for further instructions</li>
              <li>Complete document verification on the scheduled date</li>
              <li>Pay remaining fees as per the fee structure</li>
            </ol>
          </div>

          <div class="footer">
            <p><strong>Dr. M.G.R. Educational and Research Institute</strong></p>
            <p>Maduravoyal, Chennai - 600095 | Phone: +91 44 2378 2176 | Email: info@drmgrdu.ac.in</p>
            <p style="margin-top: 10px;">© 2025 Dr. M.G.R. Educational and Research Institute. All rights reserved.</p>
            <p style="margin-top: 10px; font-style: italic;">This is a computer-generated receipt and does not require a signature.</p>
          </div>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    // Wait for content to load before printing
    setTimeout(() => {
      receiptWindow.print();
    }, 250);
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
            <Link to="/">
              <Button variant="ghost">
                <Home className="h-4 w-4 mr-2" />
                Home
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
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-green-700">Student Details</span>
            </div>
            <div className="flex-1 h-1 bg-green-600 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-green-700">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-green-600 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-green-700">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <Card className="shadow-xl border-2 border-green-500 mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl mb-2 text-green-700">Booking Confirmed!</h1>
                <p className="text-lg text-slate-600 mb-4">
                  Your admission slot has been successfully booked.
                </p>
                <div className="bg-purple-50 border-2 border-purple-600 rounded-lg p-4 inline-block">
                  <p className="text-sm text-slate-600 mb-1">Booking ID</p>
                  <p className="text-2xl text-purple-900">{bookingData.bookingId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Slot Information */}
              <div>
                <h3 className="text-lg text-purple-900 mb-3">Slot Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Slot Number</p>
                    <p className="text-xl text-purple-900">#{bookingData.selectedSlot}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Booking Date</p>
                    <p className="text-xl text-purple-900">{currentDate}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Academic Year</p>
                    <p className="text-xl text-purple-900">2025-2026</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Student Details */}
              <div>
                <h3 className="text-lg text-purple-900 mb-3">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Full Name</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Date of Birth</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.dob}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Address</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-purple-700 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Guardian</p>
                      <p className="text-purple-900">{bookingData.studentDetails?.guardianName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Summary */}
              <div>
                <h3 className="text-lg text-purple-900 mb-3">Payment Summary</h3>
                <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Slot Booking Fee</span>
                    <span className="flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      1,000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">GST (18%)</span>
                    <span className="flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      180
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total Paid</span>
                    <span className="flex items-center text-purple-900">
                      <IndianRupee className="h-5 w-5" />
                      1,180
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-blue-800">
                <p className="mb-2">
                  <strong>Next Steps:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check your email for admission confirmation and further instructions</li>
                  <li>Keep this receipt safe for document verification</li>
                  <li>Complete document verification on the scheduled date</li>
                  <li>Pay remaining fees as per the fee structure</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={downloadReceipt}
              size="lg"
              className="bg-purple-700 hover:bg-purple-800"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Receipt
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
