import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Search, X, Upload, Image as ImageIcon, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface GalleryImage {
  url: string;
  file?: File;
  isNew?: boolean;
}

interface ProductSpecification {
  color: string;
  finish: string[];
  thickness: string[];
  sizes: string[];
}

interface ProductApplication {
  name: string;
  description: string;
}

interface FormData {
  name: string;
  category: string;
  subCategory: string;
  origin: string;
  description: string;
  isImported: boolean;
  isPopular: boolean;
  inStock: boolean;
  specifications: ProductSpecification;
  applications: ProductApplication[];
}

const defaultSpecifications: ProductSpecification = {
  color: '',
  finish: [],
  thickness: [],
  sizes: [],
};

const defaultFormData: FormData = {
  name: '',
  category: 'Marble',
  subCategory: '',
  origin: '',
  description: '',
  isImported: false,
  isPopular: false,
  inStock: true,
  specifications: { ...defaultSpecifications },
  applications: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({ ...defaultFormData });
  const [newFinish, setNewFinish] = useState('');
  const [newThickness, setNewThickness] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newApplication, setNewApplication] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const subCategories = {
    Marble: ['Italian Marble', 'Indian Marble', 'Imported Marble'],
    Granite: ['Indian Granite', 'Imported Granite'],
    Quartz: ['Engineered Quartz'],
    Onyx: ['Natural Onyx'],
    Other: ['Other Stone'],
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
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

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB per image.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Create preview URLs for new files
    const newImages: GalleryImage[] = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      file,
      isNew: true,
    }));

    setGalleryImages(prev => [...prev, ...newImages]);
    setNewGalleryFiles(prev => [...prev, ...validFiles]);

    // Reset input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    const imageToRemove = galleryImages[index];

    // Revoke object URL if it's a new image
    if (imageToRemove.isNew && imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }

    // Remove from gallery images
    setGalleryImages(prev => prev.filter((_, i) => i !== index));

    // If it was a new file, remove from newGalleryFiles too
    if (imageToRemove.isNew && imageToRemove.file) {
      setNewGalleryFiles(prev => prev.filter(f => f !== imageToRemove.file));
    }
  };

  const moveGalleryImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= galleryImages.length) return;

    const newImages = [...galleryImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setGalleryImages(newImages);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.subCategory) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const formDataToSend = new FormData();

      // Get existing gallery URLs (non-new images)
      const existingGalleryUrls = galleryImages
        .filter(img => !img.isNew)
        .map(img => img.url);

      // Include existing gallery URLs in data
      const dataWithGallery = {
        ...formData,
        existingGallery: existingGalleryUrls,
      };

      formDataToSend.append('data', JSON.stringify(dataWithGallery));

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      // Append new gallery images
      newGalleryFiles.forEach((file, index) => {
        formDataToSend.append(`gallery_${index}`, file);
      });
      formDataToSend.append('galleryCount', newGalleryFiles.length.toString());

      const url = editingProduct
        ? `${API_URL}/admin/products/${editingProduct.id}`
        : `${API_URL}/admin/products`;

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Save failed');

      toast.success(`Product ${editingProduct ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingProduct(null);
      setImageFile(null);
      setImagePreview(null);
      setGalleryImages([]);
      setNewGalleryFiles([]);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const openDialog = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      const specs = typeof product.specifications === 'string'
        ? JSON.parse(product.specifications)
        : product.specifications || { ...defaultSpecifications };
      const apps = typeof product.applications === 'string'
        ? JSON.parse(product.applications)
        : product.applications || [];
      setFormData({
        name: product.name || '',
        category: product.category || 'Marble',
        subCategory: product.subCategory || '',
        origin: product.origin || '',
        description: product.description || '',
        isImported: product.isImported || false,
        isPopular: product.isPopular || false,
        inStock: product.inStock !== false,
        specifications: specs,
        applications: apps,
      });
      setImagePreview(product.image || null);

      // Load existing gallery images
      const existingGallery: GalleryImage[] = (product.gallery || []).map((url: string) => ({
        url,
        isNew: false,
      }));
      setGalleryImages(existingGallery);
    } else {
      setEditingProduct(null);
      setFormData({ ...defaultFormData, specifications: { ...defaultSpecifications }, applications: [] });
      setImagePreview(null);
      setGalleryImages([]);
    }
    setImageFile(null);
    setNewGalleryFiles([]);
    setIsDialogOpen(true);
  };

  const addToArray = (field: 'finish' | 'thickness' | 'sizes', value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [field]: [...formData.specifications[field], value.trim()],
      },
    });
    setter('');
  };

  const removeFromArray = (field: 'finish' | 'thickness' | 'sizes', index: number) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [field]: formData.specifications[field].filter((_, i) => i !== index),
      },
    });
  };

  const addApplication = () => {
    if (!newApplication.name.trim()) return;
    setFormData({
      ...formData,
      applications: [...formData.applications, { ...newApplication }],
    });
    setNewApplication({ name: '', description: '' });
  };

  const removeApplication = (index: number) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_, i) => i !== index),
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category} - {product.subCategory}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(product)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit' : 'Add'} Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="border rounded-lg p-4">
              <Label className="mb-2 block">Product Image</Label>
              <div className="flex items-start gap-4">
                <div className="w-40 h-40 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2" />
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
                    Recommended: 800x800px, Max 5MB
                  </p>
                  {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                      New image selected: {imageFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="border rounded-lg p-4">
              <Label className="mb-2 block">Gallery Images (Multiple views of the product)</Label>
              <p className="text-xs text-gray-500 mb-3">
                Add multiple images to show different angles and details. First image will be shown after the main image.
              </p>

              {/* Gallery grid */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {galleryImages.map((img, index) => (
                    <div
                      key={`${img.url}-${index}`}
                      className="relative group border rounded-lg overflow-hidden aspect-square bg-gray-50"
                    >
                      <img
                        src={img.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=200&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveGalleryImage(index, index - 1)}
                            className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100"
                            title="Move left"
                          >
                            ←
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="p-1 bg-red-500 rounded text-white hover:bg-red-600"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index < galleryImages.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveGalleryImage(index, index + 1)}
                            className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100"
                            title="Move right"
                          >
                            →
                          </button>
                        )}
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                      {img.isNew && (
                        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                          New
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              <div>
                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryImagesChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => galleryInputRef.current?.click()}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Gallery Images
                </Button>
                <span className="text-xs text-gray-500 ml-3">
                  {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} in gallery
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>Origin *</Label>
                <Input
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="e.g., Italy, India"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: '' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marble">Marble</SelectItem>
                    <SelectItem value="Granite">Granite</SelectItem>
                    <SelectItem value="Quartz">Quartz</SelectItem>
                    <SelectItem value="Onyx">Onyx</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sub Category *</Label>
                <Select
                  value={formData.subCategory}
                  onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories[formData.category as keyof typeof subCategories]?.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Detailed description of the product"
              />
            </div>

            {/* Specifications */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Specifications</h3>

              <div className="space-y-4">
                <div>
                  <Label>Color</Label>
                  <Input
                    value={formData.specifications.color}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, color: e.target.value }
                    })}
                    placeholder="e.g., White with gray veining"
                  />
                </div>

                <div>
                  <Label>Available Finishes</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newFinish}
                      onChange={(e) => setNewFinish(e.target.value)}
                      placeholder="e.g., Polished, Honed"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('finish', newFinish, setNewFinish))}
                    />
                    <Button type="button" onClick={() => addToArray('finish', newFinish, setNewFinish)}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications.finish.map((f, i) => (
                      <span key={i} className="bg-stone-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {f}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFromArray('finish', i)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Available Thickness</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newThickness}
                      onChange={(e) => setNewThickness(e.target.value)}
                      placeholder="e.g., 16mm, 20mm"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('thickness', newThickness, setNewThickness))}
                    />
                    <Button type="button" onClick={() => addToArray('thickness', newThickness, setNewThickness)}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications.thickness.map((t, i) => (
                      <span key={i} className="bg-stone-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {t}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFromArray('thickness', i)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Standard Sizes</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="e.g., 600x600mm, 800x800mm"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('sizes', newSize, setNewSize))}
                    />
                    <Button type="button" onClick={() => addToArray('sizes', newSize, setNewSize)}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications.sizes.map((s, i) => (
                      <span key={i} className="bg-stone-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {s}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFromArray('sizes', i)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Applications</h3>

              <div className="space-y-2 mb-4">
                {formData.applications.map((app, i) => (
                  <div key={i} className="bg-stone-50 p-3 rounded flex justify-between items-start">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </div>
                    <X className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => removeApplication(i)} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={newApplication.name}
                  onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                  placeholder="Application name (e.g., Flooring)"
                />
                <Input
                  value={newApplication.description}
                  onChange={(e) => setNewApplication({ ...newApplication, description: e.target.value })}
                  placeholder="Description"
                />
              </div>
              <Button type="button" variant="outline" className="mt-2" onClick={addApplication}>
                Add Application
              </Button>
            </div>

            {/* Flags */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isImported}
                  onChange={(e) => setFormData({ ...formData, isImported: e.target.checked })}
                />
                Imported
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                Popular
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                />
                In Stock
              </label>
            </div>

            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? 'Saving...' : (editingProduct ? 'Update' : 'Create')} Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
