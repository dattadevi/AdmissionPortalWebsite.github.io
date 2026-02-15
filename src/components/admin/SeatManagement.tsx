import { useState } from 'react';
import { Lock, Unlock, RefreshCw, Armchair } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

type SeatCategory = {
  id: string;
  name: string;
  total: number;
  filled: number;
  locked: number;
  reserved: number;
};

export function SeatManagement() {
  const [seatCategories, setSeatCategories] = useState<SeatCategory[]>([
    { id: '1', name: 'General', total: 100, filled: 78, locked: 5, reserved: 10 },
    { id: '2', name: 'Management Quota', total: 40, filled: 32, locked: 2, reserved: 5 },
    { id: '3', name: 'Sports Quota', total: 20, filled: 12, locked: 1, reserved: 3 },
    { id: '4', name: 'NRI Quota', total: 20, filled: 10, locked: 0, reserved: 2 },
  ]);

  const totalSeats = seatCategories.reduce((sum, cat) => sum + cat.total, 0);
  const totalFilled = seatCategories.reduce((sum, cat) => sum + cat.filled, 0);
  const totalLocked = seatCategories.reduce((sum, cat) => sum + cat.locked, 0);
  const totalReserved = seatCategories.reduce((sum, cat) => sum + cat.reserved, 0);
  const totalAvailable = totalSeats - totalFilled - totalLocked - totalReserved;

  const handleLockSeats = (categoryId: string, count: number) => {
    setSeatCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, locked: cat.locked + count }
          : cat
      )
    );
  };

  const handleUnlockSeats = (categoryId: string, count: number) => {
    setSeatCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, locked: Math.max(0, cat.locked - count) }
          : cat
      )
    );
  };

  const handleReserveSeats = (categoryId: string, count: number) => {
    setSeatCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, reserved: cat.reserved + count }
          : cat
      )
    );
  };

  const handleReleaseSeats = (categoryId: string, count: number) => {
    setSeatCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, reserved: Math.max(0, cat.reserved - count) }
          : cat
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-purple-900">Seat Management</h1>
        <p className="text-slate-600">Manage seat allocation and availability</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">{totalSeats}</div>
              <Armchair className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Filled Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">{totalFilled}</div>
              <Armchair className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">{((totalFilled / totalSeats) * 100).toFixed(1)}% capacity</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Available Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">{totalAvailable}</div>
              <Armchair className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Ready for booking</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Reserved/Locked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-purple-900">{totalReserved + totalLocked}</div>
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Temporarily unavailable</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-900">Overall Seat Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Seat Occupancy</span>
              <span className="text-purple-900">{totalFilled} / {totalSeats} ({((totalFilled / totalSeats) * 100).toFixed(1)}%)</span>
            </div>
            <Progress value={(totalFilled / totalSeats) * 100} className="h-3" />
            <div className="flex gap-4 text-xs mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span className="text-slate-600">Filled: {totalFilled}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-slate-600">Available: {totalAvailable}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-600 rounded"></div>
                <span className="text-slate-600">Reserved: {totalReserved}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                <span className="text-slate-600">Locked: {totalLocked}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category-wise Management */}
      <div className="space-y-4">
        <h2 className="text-purple-900">Category-wise Management</h2>
        {seatCategories.map((category) => {
          const available = category.total - category.filled - category.locked - category.reserved;
          const filledPercentage = (category.filled / category.total) * 100;

          return (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-900">{category.name}</CardTitle>
                  <Badge className="bg-purple-600">
                    {available} / {category.total} Available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={filledPercentage} className="h-2" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-slate-600">Filled</p>
                    <p className="text-xl text-green-700">{category.filled}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-slate-600">Available</p>
                    <p className="text-xl text-blue-700">{available}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-slate-600">Reserved</p>
                    <p className="text-xl text-amber-700">{category.reserved}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-slate-600">Locked</p>
                    <p className="text-xl text-red-700">{category.locked}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-700 hover:bg-red-50"
                    onClick={() => handleLockSeats(category.id, 1)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Lock 1 Seat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                    onClick={() => handleUnlockSeats(category.id, 1)}
                    disabled={category.locked === 0}
                  >
                    <Unlock className="h-4 w-4 mr-2" />
                    Unlock 1 Seat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-50"
                    onClick={() => handleReserveSeats(category.id, 1)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reserve 1 Seat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleReleaseSeats(category.id, 1)}
                    disabled={category.reserved === 0}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Release 1 Seat
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}