import { useState } from 'react';
import { Search, Filter, ChevronRight, Download, X, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Textarea } from '../ui/textarea';

type Application = {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  academicScore: number;
  documentStatus: 'complete' | 'incomplete' | 'pending';
  applicationStatus: 'approved' | 'rejected' | 'pending';
  appliedDate: string;
  documents: {
    marksheet: boolean;
    certificate: boolean;
    idProof: boolean;
    photo: boolean;
  };
};

const mockApplications: Application[] = [
  {
    id: 'APP001',
    studentName: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 98765 43210',
    academicScore: 92.5,
    documentStatus: 'complete',
    applicationStatus: 'pending',
    appliedDate: '2025-01-08',
    documents: { marksheet: true, certificate: true, idProof: true, photo: true }
  },
  {
    id: 'APP002',
    studentName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    academicScore: 88.3,
    documentStatus: 'complete',
    applicationStatus: 'approved',
    appliedDate: '2025-01-07',
    documents: { marksheet: true, certificate: true, idProof: true, photo: true }
  },
  {
    id: 'APP003',
    studentName: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 98765 43212',
    academicScore: 85.7,
    documentStatus: 'incomplete',
    applicationStatus: 'pending',
    appliedDate: '2025-01-09',
    documents: { marksheet: true, certificate: true, idProof: false, photo: true }
  },
  {
    id: 'APP004',
    studentName: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 98765 43213',
    academicScore: 94.2,
    documentStatus: 'complete',
    applicationStatus: 'pending',
    appliedDate: '2025-01-06',
    documents: { marksheet: true, certificate: true, idProof: true, photo: true }
  },
  {
    id: 'APP005',
    studentName: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 43214',
    academicScore: 78.5,
    documentStatus: 'complete',
    applicationStatus: 'rejected',
    appliedDate: '2025-01-05',
    documents: { marksheet: true, certificate: true, idProof: true, photo: true }
  },
];

export function ApplicationManagement() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const handleRowClick = (application: Application) => {
    setSelectedApplication(application);
    setDrawerOpen(true);
    setAdminNotes('');
  };

  const handleApprove = () => {
    if (selectedApplication) {
      console.log('Approving application:', selectedApplication.id);
      setDrawerOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedApplication) {
      console.log('Rejecting application:', selectedApplication.id);
      setDrawerOpen(false);
    }
  };

  const filteredApplications = mockApplications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-purple-900">Application Management</h1>
          <p className="text-slate-600">Review and manage student applications</p>
        </div>
        <Button className="bg-purple-700 hover:bg-purple-800">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or application ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-900">Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Application ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Academic Score</TableHead>
                <TableHead>Document Status</TableHead>
                <TableHead>Application Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow
                  key={application.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleRowClick(application)}
                >
                  <TableCell className="text-purple-700">{application.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-slate-900">{application.studentName}</p>
                      <p className="text-sm text-slate-500">{application.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-purple-900">{application.academicScore}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.documentStatus === 'complete' ? 'default' :
                        application.documentStatus === 'incomplete' ? 'destructive' :
                        'secondary'
                      }
                      className={
                        application.documentStatus === 'complete' ? 'bg-green-600' :
                        application.documentStatus === 'incomplete' ? 'bg-red-600' :
                        'bg-amber-600'
                      }
                    >
                      {application.documentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.applicationStatus === 'approved' ? 'default' :
                        application.applicationStatus === 'rejected' ? 'destructive' :
                        'secondary'
                      }
                      className={
                        application.applicationStatus === 'approved' ? 'bg-green-600' :
                        application.applicationStatus === 'rejected' ? 'bg-red-600' :
                        'bg-slate-600'
                      }
                    >
                      {application.applicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-purple-900">Application Details</SheetTitle>
          </SheetHeader>
          
          {selectedApplication && (
            <div className="space-y-6 py-6">
              {/* Student Info */}
              <div>
                <h3 className="text-purple-900 mb-3">Student Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Application ID:</span>
                    <span className="text-purple-700">{selectedApplication.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Name:</span>
                    <span className="text-slate-900">{selectedApplication.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email:</span>
                    <span className="text-slate-900">{selectedApplication.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Phone:</span>
                    <span className="text-slate-900">{selectedApplication.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Academic Score:</span>
                    <span className="text-purple-900">{selectedApplication.academicScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Applied Date:</span>
                    <span className="text-slate-900">{selectedApplication.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-purple-900 mb-3">Documents</h3>
                <div className="space-y-2">
                  {Object.entries(selectedApplication.documents).map(([doc, uploaded]) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-600" />
                        <span className="text-sm text-slate-900 capitalize">{doc}</span>
                      </div>
                      {uploaded ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3 border-purple-600 text-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Documents
                </Button>
              </div>

              {/* Admin Notes */}
              <div>
                <h3 className="text-purple-900 mb-3">Admin Notes</h3>
                <Textarea
                  placeholder="Add notes about this application..."
                  className="min-h-[100px]"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              {selectedApplication.applicationStatus === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleApprove}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleReject}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
