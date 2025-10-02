import React from 'react';
import { Card, CardContent, CardHeader } from '../../../../components/ui/Card';
import { Calendar, File, MessageSquare, Users } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Team meeting',
    description: 'Weekly progress discussion',
    time: '2 hours ago',
    icon: <Calendar size={16} />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-500',
  },
  {
    id: 2,
    title: 'Project updated',
    description: 'New design proposal added',
    time: '4 hours ago',
    icon: <File size={16} />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-500',
  },
  {
    id: 3,
    title: 'New comment',
    description: 'Sarah commented on Task #42',
    time: '5 hours ago',
    icon: <MessageSquare size={16} />,
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-500',
  },
  {
    id: 4,
    title: 'New team member',
    description: 'Alex joined the design team',
    time: '1 day ago',
    icon: <Users size={16} />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-500',
  },
];

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center bg-white dark:bg-gray-800">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Actividad Reciente</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div
                className={`flex-shrink-0 mr-3 ${activity.iconBg} ${activity.iconColor} h-8 w-8 rounded-full flex items-center justify-center`}
              >
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {activity.description}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
