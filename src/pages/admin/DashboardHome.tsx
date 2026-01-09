import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Image, Mail, TrendingUp } from 'lucide-react';

interface Stats {
  productsCount: number;
  galleryCount: number;
  newContactsCount: number;
  totalContactsCount: number;
}

export default function DashboardHome() {
  const { stats } = useOutletContext<{ stats: Stats }>();

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.productsCount || 0,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Gallery Items',
      value: stats?.galleryCount || 0,
      icon: Image,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'New Contacts',
      value: stats?.newContactsCount || 0,
      icon: Mail,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      title: 'Total Contacts',
      value: stats?.totalContactsCount || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/dashboard/products"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Products</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove products</p>
            </a>
            <a
              href="/admin/dashboard/gallery"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Gallery</h3>
              <p className="text-sm text-gray-600">Update project gallery</p>
            </a>
            <a
              href="/admin/dashboard/contacts"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold">View Contacts</h3>
              <p className="text-sm text-gray-600">Review customer inquiries</p>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Activity tracking coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
