import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  order: number;
  isActive: boolean;
}

const defaultFormData = {
  name: '',
  role: '',
  description: '',
  email: '',
  phone: '',
  linkedin: '',
  order: 0,
  isActive: true,
};

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/team`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('Team member deleted successfully');
      fetchTeam();
    } catch (error) {
      toast.error('Failed to delete team member');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) {
      toast.error('Please fill in name and role');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formData));

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = editingItem
        ? `${API_URL}/admin/team/${editingItem.id}`
        : `${API_URL}/admin/team`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Save failed');

      toast.success(`Team member ${editingItem ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingItem(null);
      setImageFile(null);
      setImagePreview(null);
      fetchTeam();
    } catch (error) {
      toast.error('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const openDialog = (item?: TeamMember) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        role: item.role || '',
        description: item.description || '',
        email: item.email || '',
        phone: item.phone || '',
        linkedin: item.linkedin || '',
        order: item.order || 0,
        isActive: item.isActive !== false,
      });
      setImagePreview(item.image || null);
    } else {
      setEditingItem(null);
      setFormData({ ...defaultFormData, order: team.length });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Team Members</h2>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : team.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No team members yet</p>
          <p className="text-sm">Click "Add Team Member" to create one</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <Card key={member.id} className={`p-4 ${!member.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  {member.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{member.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">Order: {member.order}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openDialog(member)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-xs text-gray-500 mt-1">Recommended: Square image</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label>Role *</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Managing Director"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief bio or description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 ..."
                />
              </div>
            </div>

            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  min={0}
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
