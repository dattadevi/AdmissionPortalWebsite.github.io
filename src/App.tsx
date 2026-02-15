import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Changed imports
import { HomePage } from './components/HomePage';
import { SignIn } from './components/SignIn';
import { Register } from './components/Register';
import { AdmissionSlotSelection } from './components/AdmissionSlotSelection';
import { StudentDetailsForm } from './components/StudentDetailsForm';
import { PaymentPage } from './components/PaymentPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { AboutUs } from './components/AboutUs';
import { Achievements } from './components/Achievements';
import { ARTour } from './components/ARTour';
import { AdminLogin } from './components/AdminLogin';
import { ARLogin } from './components/ARLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ApplicationManagement } from './components/admin/ApplicationManagement';
import { SeatManagement } from './components/admin/SeatManagement';
import { ARContentManagement } from './components/admin/ARContentManagement';
import { NotificationManagement } from './components/admin/NotificationManagement';
import { Toaster } from './components/ui/sonner';

export type Slot = {
  id: number;
  filled: boolean;
};

export type BookingData = {
  selectedSlot: number | null;
  studentDetails: {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    guardianName: string;
    guardianPhone: string;
    previousSchool: string;
    percentage: string;
  } | null;
  bookingId: string | null;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isARAuthenticated, setIsARAuthenticated] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedSlot: null,
    studentDetails: null,
    bookingId: null,
  });

  useEffect(() => {
    // Initialize slots (150-200 slots)
    const totalSlots = 180;
    const initialSlots: Slot[] = [];
    
    for (let i = 1; i <= totalSlots; i++) {
      // Randomly mark some slots as filled for demo purposes
      initialSlots.push({
        id: i,
        filled: Math.random() > 0.6, // About 40% filled
      });
    }
    
    setSlots(initialSlots);
  }, []);

  const updateSlot = (slotId: number) => {
    setSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === slotId ? { ...slot, filled: true } : slot
      )
    );
  };

  return (
    // <Router> removed here because it's in main.tsx
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Student Authentication Routes */}
        <Route 
          path="/signin" 
          element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/register" 
          element={<Register onRegister={() => setIsAuthenticated(true)} />} 
        />
        
        {/* Admin Authentication Route */}
        <Route 
          path="/admin/login" 
          element={<AdminLogin onAdminSignIn={() => setIsAdminAuthenticated(true)} />} 
        />
        
        {/* AR Authentication Route */}
        <Route 
          path="/ar/login" 
          element={<ARLogin onARSignIn={() => setIsARAuthenticated(true)} />} 
        />
        
        {/* Student Admission Flow - Protected Routes */}
        <Route 
          path="/admission" 
          element={
            isAuthenticated ? (
              <AdmissionSlotSelection 
                slots={slots}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            ) : (
              <Navigate to="/signin" />
            )
          } 
        />
        <Route 
          path="/student-details" 
          element={
            isAuthenticated && bookingData.selectedSlot ? (
              <StudentDetailsForm 
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            ) : (
              <Navigate to="/admission" />
            )
          } 
        />
        <Route 
          path="/payment" 
          element={
            isAuthenticated && bookingData.studentDetails ? (
              <PaymentPage 
                bookingData={bookingData}
                setBookingData={setBookingData}
                updateSlot={updateSlot}
              />
            ) : (
              <Navigate to="/admission" />
            )
          } 
        />
        <Route 
          path="/confirmation" 
          element={
            isAuthenticated && bookingData.bookingId ? (
              <ConfirmationPage bookingData={bookingData} />
            ) : (
              <Navigate to="/admission" />
            )
          } 
        />
        
        {/* Public Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/achievements" element={<Achievements />} />
        
        {/* AR Tour - Can be accessed publicly or with AR authentication */}
        <Route path="/ar-tour" element={<ARTour />} />
        
        {/* Admin Routes - Protected */}
        <Route 
          path="/admin/dashboard" 
          element={
            isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        <Route 
          path="/admin/applications" 
          element={
            isAdminAuthenticated ? (
              <ApplicationManagement />
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        <Route 
          path="/admin/seats" 
          element={
            isAdminAuthenticated ? (
              <SeatManagement />
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        <Route 
          path="/admin/ar-content" 
          element={
            isAdminAuthenticated ? (
              <ARContentManagement />
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        <Route 
          path="/admin/notifications" 
          element={
            isAdminAuthenticated ? (
              <NotificationManagement />
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;