import { useState } from 'react';
import { Send, Eye, Users, Bell, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

type NotificationTemplate = {
  id: string;
  name: string;
  subject: string;
  message: string;
  category: 'admission' | 'payment' | 'general';
};

const templates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Application Received',
    subject: 'Your Application has been Received',
    message: 'Dear [Student Name],\n\nThank you for applying to the B.Tech IT program at Dr. M.G.R. Educational and Research Institute. Your application has been successfully received and is under review.\n\nApplication ID: [Application ID]\n\nWe will notify you once the review is complete.\n\nBest regards,\nAdmissions Team',
    category: 'admission',
  },
  {
    id: '2',
    name: 'Application Approved',
    subject: 'Congratulations! Your Application has been Approved',
    message: 'Dear [Student Name],\n\nCongratulations! We are pleased to inform you that your application for the B.Tech IT program has been approved.\n\nApplication ID: [Application ID]\n\nPlease complete the payment process to confirm your admission.\n\nBest regards,\nAdmissions Team',
    category: 'admission',
  },
  {
    id: '3',
    name: 'Payment Confirmation',
    subject: 'Payment Received - Admission Confirmed',
    message: 'Dear [Student Name],\n\nYour payment of ₹[Amount] has been successfully received. Your admission to the B.Tech IT program is now confirmed.\n\nBooking ID: [Booking ID]\nSlot Number: [Slot Number]\n\nWelcome to Dr. M.G.R. Educational and Research Institute!\n\nBest regards,\nAdmissions Team',
    category: 'payment',
  },
  {
    id: '4',
    name: 'Document Required',
    subject: 'Action Required: Submit Missing Documents',
    message: 'Dear [Student Name],\n\nWe noticed that some required documents are missing from your application.\n\nPlease upload the following documents:\n- [Document List]\n\nApplication ID: [Application ID]\n\nKindly submit these documents at your earliest convenience.\n\nBest regards,\nAdmissions Team',
    category: 'admission',
  },
];

export function NotificationManagement() {
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<'all' | 'pending' | 'approved' | 'specific'>('all');
  const [specificRecipient, setSpecificRecipient] = useState('');

  const handlePreview = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleSend = () => {
    if (selectedTemplate) {
      console.log('Sending notification:', {
        template: selectedTemplate.name,
        recipientType,
        specificRecipient,
      });
      alert('Notification sent successfully!');
      setPreviewOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-purple-900">Notification Management</h1>
        <p className="text-slate-600">Send notifications to students and applicants</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">1,247</div>
              <Send className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">98.5%</div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">225</div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Active applicants</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Templates */}
      <div>
        <h2 className="text-purple-900 mb-4">Notification Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-purple-900">{template.name}</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">{template.subject}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      template.category === 'admission' ? 'border-purple-600 text-purple-700' :
                      template.category === 'payment' ? 'border-green-600 text-green-700' :
                      'border-blue-600 text-blue-700'
                    }
                  >
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700 line-clamp-3 whitespace-pre-line">
                    {template.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview & Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-purple-900">Preview & Send Notification</DialogTitle>
            <DialogDescription>
              Review the notification and select recipients
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              {/* Recipient Selection */}
              <div className="space-y-3">
                <Label>Send To</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={recipientType === 'all' ? 'default' : 'outline'}
                    className={recipientType === 'all' ? 'bg-purple-700' : ''}
                    onClick={() => setRecipientType('all')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    All Applicants
                  </Button>
                  <Button
                    type="button"
                    variant={recipientType === 'pending' ? 'default' : 'outline'}
                    className={recipientType === 'pending' ? 'bg-purple-700' : ''}
                    onClick={() => setRecipientType('pending')}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Pending Applications
                  </Button>
                  <Button
                    type="button"
                    variant={recipientType === 'approved' ? 'default' : 'outline'}
                    className={recipientType === 'approved' ? 'bg-purple-700' : ''}
                    onClick={() => setRecipientType('approved')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approved Applications
                  </Button>
                  <Button
                    type="button"
                    variant={recipientType === 'specific' ? 'default' : 'outline'}
                    className={recipientType === 'specific' ? 'bg-purple-700' : ''}
                    onClick={() => setRecipientType('specific')}
                  >
                    Specific Student
                  </Button>
                </div>
                
                {recipientType === 'specific' && (
                  <Input
                    placeholder="Enter Application ID or Email"
                    value={specificRecipient}
                    onChange={(e) => setSpecificRecipient(e.target.value)}
                  />
                )}
              </div>

              {/* Message Preview */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={selectedTemplate.subject} readOnly className="bg-slate-50" />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={selectedTemplate.message}
                  readOnly
                  className="min-h-[200px] bg-slate-50"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Placeholders like [Student Name], [Application ID], etc. will be automatically replaced with actual values for each recipient.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setPreviewOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-purple-700 hover:bg-purple-800"
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
