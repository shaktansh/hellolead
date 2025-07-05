'use client'

import { Card } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Phone, Calendar, Users, TrendingUp } from 'lucide-react'

const AnalyticsDashboard = () => {
  // Mock data - in real app this would come from API
  const callData = [
    { day: 'Mon', calls: 12, appointments: 8 },
    { day: 'Tue', calls: 15, appointments: 10 },
    { day: 'Wed', calls: 18, appointments: 12 },
    { day: 'Thu', calls: 14, appointments: 9 },
    { day: 'Fri', calls: 20, appointments: 15 },
    { day: 'Sat', calls: 8, appointments: 6 },
    { day: 'Sun', calls: 5, appointments: 3 },
  ]

  const leadSourceData = [
    { name: 'Direct Calls', value: 45, color: '#3b82f6' },
    { name: 'Referrals', value: 25, color: '#10b981' },
    { name: 'Online', value: 20, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#ef4444' },
  ]

  const stats = [
    {
      title: 'Total Calls',
      value: '92',
      change: '+12%',
      icon: Phone,
      color: 'text-blue-600',
    },
    {
      title: 'Appointments Booked',
      value: '63',
      change: '+8%',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'New Leads',
      value: '28',
      change: '+15%',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last week</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Volume & Appointments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#3b82f6" name="Calls" />
              <Bar dataKey="appointments" fill="#10b981" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Lead Sources */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: '2 minutes ago', action: 'New call received from John Doe', status: 'Appointment booked' },
            { time: '15 minutes ago', action: 'Call from Sarah Smith', status: 'Lead captured' },
            { time: '1 hour ago', action: 'Follow-up call with Mike Johnson', status: 'Appointment confirmed' },
            { time: '2 hours ago', action: 'Inquiry from Lisa Brown', status: 'Information provided' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default AnalyticsDashboard 