import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function CategoriesPage() {
  const categories = [
    { name: 'Grocery', color: 'bg-green-100 text-green-800' },
    { name: 'Beverage', color: 'bg-blue-100 text-blue-800' },
    { name: 'Snack', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                <Badge className={category.color}>—</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sub Categories Table */}
      <Card className="bg-white">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub Category</TableHead>
                <TableHead>Parent Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-slate-500">
                  No sub-categories loaded
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
