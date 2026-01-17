import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
}

const defaultFormData = {
  question: '',
  answer: '',
  category: '',
  order: 0,
  isActive: true,
};

const categories = [
  { value: '', label: 'General' },
  { value: 'products', label: 'Products' },
  { value: 'ordering', label: 'Ordering' },
  { value: 'shipping', label: 'Shipping & Delivery' },
  { value: 'installation', label: 'Installation' },
  { value: 'maintenance', label: 'Maintenance' },
];

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/faqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Delete failed');

      toast.success('FAQ deleted successfully');
      fetchFAQs();
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      toast.error('Please fill in question and answer');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');

      const url = editingItem
        ? `${API_URL}/admin/faqs/${editingItem.id}`
        : `${API_URL}/admin/faqs`;

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Save failed');

      toast.success(`FAQ ${editingItem ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchFAQs();
    } catch (error) {
      toast.error('Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  const openDialog = (item?: FAQ) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        question: item.question || '',
        answer: item.answer || '',
        category: item.category || '',
        order: item.order || 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({ ...defaultFormData, order: faqs.length });
    }
    setIsDialogOpen(true);
  };

  const groupedFaqs = faqs.reduce((acc, faq) => {
    const cat = faq.category || '';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">FAQs</h2>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Add FAQ
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No FAQs yet</p>
          <p className="text-sm">Click "Add FAQ" to create one</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3">
                {categories.find(c => c.value === category)?.label || 'General'}
              </h3>
              <div className="space-y-2">
                {categoryFaqs.map((faq) => (
                  <Card
                    key={faq.id}
                    className={`overflow-hidden ${!faq.isActive ? 'opacity-50' : ''}`}
                  >
                    <div
                      className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs text-gray-400 w-6">{faq.order}</span>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); openDialog(faq); }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 pt-0 border-t bg-gray-50">
                        <p className="text-gray-600 whitespace-pre-wrap ml-9">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} FAQ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Question *</Label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="e.g., How do I request a sample?"
              />
            </div>

            <div>
              <Label>Answer *</Label>
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={5}
                placeholder="Provide a detailed answer..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  min={0}
                />
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Active
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
