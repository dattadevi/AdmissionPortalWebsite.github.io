import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, MapPin } from 'lucide-react';
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
  DialogTrigger,
} from '../ui/dialog';

type ARContent = {
  id: string;
  title: string;
  description: string;
  location: string;
  assetType: '3D Model' | 'Image' | 'Video';
  assetUrl: string;
  createdDate: string;
  status: 'active' | 'inactive';
};

export function ARContentManagement() {
  const [arContents, setArContents] = useState<ARContent[]>([
    {
      id: '1',
      title: 'Computer Lab Equipment',
      description: 'High-performance workstations and servers',
      location: 'Computer Lab 1',
      assetType: '3D Model',
      assetUrl: '/assets/computer-lab.glb',
      createdDate: '2025-01-05',
      status: 'active',
    },
    {
      id: '2',
      title: 'Network Lab Setup',
      description: 'Cisco routers and switches demonstration',
      location: 'Network Lab',
      assetType: '3D Model',
      assetUrl: '/assets/network-lab.glb',
      createdDate: '2025-01-03',
      status: 'active',
    },
    {
      id: '3',
      title: 'Library Resources',
      description: 'Digital library and study spaces',
      location: 'Central Library',
      assetType: 'Image',
      assetUrl: '/assets/library.jpg',
      createdDate: '2025-01-01',
      status: 'active',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ARContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    assetType: '3D Model' as ARContent['assetType'],
    assetUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      // Update existing content
      setArContents(prev =>
        prev.map(content =>
          content.id === editingContent.id
            ? { ...content, ...formData }
            : content
        )
      );
    } else {
      // Create new content
      const newContent: ARContent = {
        id: Date.now().toString(),
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setArContents(prev => [...prev, newContent]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      assetType: '3D Model',
      assetUrl: '',
    });
    setEditingContent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (content: ARContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      location: content.location,
      assetType: content.assetType,
      assetUrl: content.assetUrl,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this AR content?')) {
      setArContents(prev => prev.filter(content => content.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setArContents(prev =>
      prev.map(content =>
        content.id === id
          ? { ...content, status: content.status === 'active' ? 'inactive' : 'active' }
          : content
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-purple-900">AR Content Management</h1>
          <p className="text-slate-600">Manage augmented reality content and assets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="h-4 w-4 mr-2" />
              Add AR Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-purple-900">
                {editingContent ? 'Edit AR Content' : 'Add New AR Content'}
              </DialogTitle>
              <DialogDescription>
                Upload and configure AR content for virtual tours
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Computer Lab Equipment"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Computer Lab 1"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the AR content"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type</Label>
                  <select
                    id="assetType"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.assetType}
                    onChange={(e) => setFormData({ ...formData, assetType: e.target.value as ARContent['assetType'] })}
                  >
                    <option value="3D Model">3D Model</option>
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetUrl">Asset URL</Label>
                  <Input
                    id="assetUrl"
                    placeholder="/assets/model.glb"
                    value={formData.assetUrl}
                    onChange={(e) => setFormData({ ...formData, assetUrl: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-600">Upload AR Asset File</p>
                <p className="text-xs text-slate-500 mt-1">Supports .glb, .gltf, .jpg, .png, .mp4</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Browse Files
                </Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
                  {editingContent ? 'Update' : 'Create'} Content
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arContents.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-purple-900 text-lg">{content.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{content.location}</span>
                  </div>
                </div>
                <Badge
                  variant={content.status === 'active' ? 'default' : 'secondary'}
                  className={content.status === 'active' ? 'bg-green-600' : 'bg-slate-600'}
                >
                  {content.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 line-clamp-2">{content.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Asset Type:</span>
                <Badge variant="outline" className="border-purple-600 text-purple-700">
                  {content.assetType}
                </Badge>
              </div>

              <div className="text-xs text-slate-500">
                Created: {content.createdDate}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(content)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus(content.id)}
                  className={content.status === 'active' ? 'text-amber-700 border-amber-600' : 'text-green-700 border-green-600'}
                >
                  {content.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-700 border-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(content.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {arContents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <svg
              className="h-16 w-16 mx-auto mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <p className="text-slate-600">No AR content available</p>
            <p className="text-sm text-slate-500 mt-1">Click "Add AR Content" to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
