"use client";

import { useState } from "react";
import Toggle from "@/components/system/Toggle";

interface NotificationItem {
  name: string;
  description: string;
  enabled: boolean;
}

const initialNotifications: NotificationItem[] = [
  { name: "Email Notifications", description: "Receive admin alerts by email", enabled: true },
  { name: "New Order Alert", description: "Get notified when a new order is placed", enabled: true },
  { name: "Low Stock Alert", description: "Alert when a product's stock drops below 10 units", enabled: true },
];

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function toggleNotification(name: string) {
    setNotifications((prev) => prev.map((n) => (n.name === name ? { ...n, enabled: !n.enabled } : n)));
  }

  return (
    <div className="mt-6 rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Notifications</p>
      <p className="text-sm text-neutral-500">Choose which alerts you receive by email.</p>

      <div className="mt-5 flex flex-col divide-y divide-neutral-100">
        {notifications.map((notification) => (
          <div key={notification.name} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">{notification.name}</p>
              <p className="text-xs text-neutral-500">{notification.description}</p>
            </div>
            <Toggle checked={notification.enabled} onChange={() => toggleNotification(notification.name)} label={notification.name} />
          </div>
        ))}
      </div>
    </div>
  );
}