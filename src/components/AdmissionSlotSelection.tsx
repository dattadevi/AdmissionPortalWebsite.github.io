import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, ArrowRight, CheckCircle2, IndianRupee } from 'lucide-react';
import { BookingData, Slot } from '../App';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type AdmissionSlotSelectionProps = {
  slots: Slot[];
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
};

export function AdmissionSlotSelection({ 
  slots, 
  bookingData, 
  setBookingData 
}: AdmissionSlotSelectionProps) {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(bookingData.selectedSlot);

  const filledSlotsCount = slots.filter(slot => slot.filled).length;
  const availableSlotsCount = slots.length - filledSlotsCount;

  const handleSlotClick = (slotId: number, filled: boolean) => {
    if (!filled) {
      setSelectedSlot(slotId);
    }
  };

  const handleProceed = () => {
    if (selectedSlot) {
      setBookingData({
        ...bookingData,
        selectedSlot,
      });
      navigate('/student-details');
    }
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
                <ArrowLeft className="h-4 w-4 mr-2" />
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
              <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center">1</div>
              <span className="text-purple-900">Select Slot</span>
            </div>
            <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center">2</div>
              <span className="text-slate-500">Student Details</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slot Grid */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-900">Select Your Admission Slot</CardTitle>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-slate-300 rounded"></div>
                      <span>Filled</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    {availableSlotsCount} Available
                  </Badge>
                  <Badge variant="outline" className="border-slate-400 text-slate-700">
                    {filledSlotsCount} Filled
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotClick(slot.id, slot.filled)}
                      disabled={slot.filled}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm transition-all
                        ${slot.filled 
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                          : selectedSlot === slot.id
                          ? 'bg-green-500 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-green-500 text-green-700 hover:bg-green-50 hover:scale-105'
                        }
                      `}
                      title={slot.filled ? 'Slot Filled' : `Slot ${slot.id}`}
                    >
                      {slot.id}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Details Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-purple-900">Fee Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSlot ? (
                  <>
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-600 mb-2">Selected Slot</p>
                      <div className="text-3xl text-green-700">#{selectedSlot}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Slot Booking Fee</span>
                        <span className="flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          1,000
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Processing Fee</span>
                        <span className="flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          0
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span>Total Amount</span>
                        <span className="flex items-center text-purple-900">
                          <IndianRupee className="h-5 w-5" />
                          1,000
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-800">
                      <p className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>The slot booking fee of ₹1,000 is non-refundable.</span>
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-purple-700 hover:bg-purple-800"
                      onClick={handleProceed}
                    >
                      Proceed
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>Please select a slot to view fee details</p>
                  </div>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Secure payment gateway</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Downloadable receipt</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
