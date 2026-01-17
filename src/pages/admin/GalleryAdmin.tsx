import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function AdminGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'flooring',
    location: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'flooring', label: 'Flooring' },
    { value: 'countertops', label: 'Countertops' },
    { value: 'bathrooms', label: 'Bathrooms' },
    { value: 'wall', label: 'Wall Cladding' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete item');
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
    if (!formData.title || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!editingItem && !imageFile) {
      toast.error('Please upload an image for the gallery item');
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
        ? `${API_URL}/admin/gallery/${editingItem.id}`
        : `${API_URL}/admin/gallery`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Save failed');

      toast.success(`Item ${editingItem ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingItem(null);
      setImageFile(null);
      setImagePreview(null);
      fetchItems();
    } catch (error) {
      toast.error('Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const openDialog = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'flooring',
        location: item.location || '',
        featured: item.featured || false,
      });
      setImagePreview(item.image || null);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        category: 'flooring',
        location: '',
        featured: false,
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No gallery items yet</p>
          <p className="text-sm">Click "Add Item" to create your first gallery item</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop'}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {categories.find(c => c.value === item.category)?.label || item.category}
              </p>
              {item.location && (
                <p className="text-sm text-gray-500 mb-2">{item.location}</p>
              )}
              {item.featured && (
                <span className="inline-block bg-gold-dark text-white text-xs px-2 py-1 rounded mb-2">
                  Featured
                </span>
              )}
              <div className="flex gap-2 mt-2">
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
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="border rounded-lg p-4">
              <Label className="mb-2 block">Image {!editingItem && '*'}</Label>
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
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
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 800x600px, Max 5MB
                  </p>
                  {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                      New image: {imageFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Luxury Villa Flooring"
              />
            </div>

            <div>
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Describe the project..."
              />
            </div>

            <div>
              <Label>Location (Optional)</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Delhi, India"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Featured (shown in Featured Projects section)
            </label>

            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
