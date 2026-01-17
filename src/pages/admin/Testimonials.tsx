import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Star, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  isActive: boolean;
}

const defaultFormData = {
  name: '',
  role: '',
  company: '',
  content: '',
  rating: 5,
  featured: false,
  isActive: true,
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
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
    if (!formData.name || !formData.content) {
      toast.error('Please fill in name and content');
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
        ? `${API_URL}/admin/testimonials/${editingItem.id}`
        : `${API_URL}/admin/testimonials`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Save failed');

      toast.success(`Testimonial ${editingItem ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingItem(null);
      setImageFile(null);
      setImagePreview(null);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const openDialog = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        role: item.role || '',
        company: item.company || '',
        content: item.content || '',
        rating: item.rating || 5,
        featured: item.featured || false,
        isActive: item.isActive !== false,
      });
      setImagePreview(item.image || null);
    } else {
      setEditingItem(null);
      setFormData({ ...defaultFormData });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No testimonials yet</p>
          <p className="text-sm">Click "Add Testimonial" to create one</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <Card key={item.id} className={`p-4 ${!item.isActive ? 'opacity-50' : ''}`}>
              <div className="flex gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{item.name}</h3>
                    {item.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  {(item.role || item.company) && (
                    <p className="text-sm text-gray-500">
                      {item.role}{item.role && item.company ? ', ' : ''}{item.company}
                    </p>
                  )}
                  <div className="flex gap-0.5 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => openDialog(item)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
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
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </div>

            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Customer name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Homeowner"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., ABC Developers"
                />
              </div>
            </div>

            <div>
              <Label>Testimonial Content *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                placeholder="What did they say about your service?"
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                Active
              </label>
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
