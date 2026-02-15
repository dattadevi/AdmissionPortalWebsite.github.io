import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { ArrowLeft, CreditCard, Wallet, Building2, Smartphone, IndianRupee, Shield } from 'lucide-react';
import { BookingData } from '../App';
import { toast } from 'sonner@2.0.3';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type PaymentPageProps = {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  updateSlot: (slotId: number) => void;
};

export function PaymentPage({ bookingData, setBookingData, updateSlot }: PaymentPageProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const generateBookingId = () => {
    const prefix = 'BTIT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingId = generateBookingId();
      
      setBookingData({
        ...bookingData,
        bookingId,
      });

      // Update the slot status
      if (bookingData.selectedSlot) {
        updateSlot(bookingData.selectedSlot);
      }

      toast.success('Payment successful! Your slot has been booked.');
      setProcessing(false);
      navigate('/confirmation');
    }, 2000);
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
            <Link to="/student-details">
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
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-green-700">Student Details</span>
            </div>
            <div className="flex-1 h-1 bg-green-600 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center">3</div>
              <span className="text-purple-900">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center">4</div>
              <span className="text-slate-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-900">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-slate-200'}`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-purple-700" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-purple-600 bg-purple-50' : 'border-slate-200'}`}>
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-purple-700" />
                          <span>UPI</span>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-purple-600 bg-purple-50' : 'border-slate-200'}`}>
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Building2 className="h-5 w-5 text-purple-700" />
                          <span>Net Banking</span>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-purple-600 bg-purple-50' : 'border-slate-200'}`}>
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Wallet className="h-5 w-5 text-purple-700" />
                          <span>Digital Wallet</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                      <h3 className="text-purple-900">Enter Card Details</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Name on card"
                          value={cardDetails.cardName}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={handleCardChange}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                      <h3 className="text-purple-900">Enter UPI ID</h3>
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                      <h3 className="text-purple-900">Select Your Bank</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak', 'Other'].map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            className="border-2 border-slate-300 rounded-lg p-3 hover:border-purple-600 hover:bg-purple-50 transition-all"
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                      <h3 className="text-purple-900">Select Wallet</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                          <button
                            key={wallet}
                            type="button"
                            className="border-2 border-slate-300 rounded-lg p-3 hover:border-purple-600 hover:bg-purple-50 transition-all"
                          >
                            {wallet}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-lg p-4">
                    <Shield className="h-5 w-5 text-green-700" />
                    <p className="text-sm text-green-800">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-800"
                    disabled={processing}
                  >
                    {processing ? 'Processing Payment...' : 'Pay Now'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-purple-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Slot Number</span>
                    <span className="text-purple-900">#{bookingData.selectedSlot}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Student Name</span>
                    <span className="text-purple-900">{bookingData.studentDetails?.fullName}</span>
                  </div>

                  <Separator />

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
                    <span>Total Amount</span>
                    <span className="flex items-center text-purple-900">
                      <IndianRupee className="h-5 w-5" />
                      1,180
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-800">
                  <p>
                    ⚠️ This fee is non-refundable. Please review all details before proceeding.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm text-slate-600">
                  <p>By completing this payment, you agree to:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Terms and conditions</li>
                    <li>Admission policies</li>
                    <li>Non-refund policy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
