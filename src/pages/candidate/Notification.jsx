import React, { useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import Seo from "../../components/common/Seo";

const Notification = () => {
  const [settings, setSettings] = useState({
    jobAlerts: true,
    messages: true,
    promotions: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationItems = [
    {
      key: "jobAlerts",
      title: "Job Alerts",
      description:
        "Get notified when new jobs match your skills and preferences.",
      icon: BriefcaseBusiness,
    },
    {
      key: "messages",
      title: "Messages",
      description:
        "Receive notifications about recruiter messages and updates.",
      icon: MessageSquare,
    },
    {
      key: "promotions",
      title: "Promotions",
      description:
        "Receive special offers, career tips, and promotional updates.",
      icon: Megaphone,
    },
  ];

  return (
    <div className="w-full">
      <Seo title="Notifications" noindex />

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Bell size={22} />
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage how you receive notifications and updates.
            </p>

          </div>

        </div>

      </div>


      {/* NOTIFICATION SETTINGS */}

      <div className="max-w-3xl space-y-4">

        {notificationItems.map((item) => {

          const Icon = item.icon;
          const isEnabled = settings[item.key];

          return (

            <div
              key={item.key}
              className="flex items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >

              {/* LEFT */}

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">

                  <Icon size={20} />

                </div>


                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>


              {/* TOGGLE */}

              <button
                type="button"
                onClick={() =>
                  toggleSetting(item.key)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  isEnabled
                    ? "bg-amber-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                    isEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          );

        })}

      </div>


      {/* INFO CARD */}

      <div className="mt-8 max-w-3xl rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">

        <h3 className="font-semibold text-amber-800 dark:text-amber-300">
          🔔 Stay updated
        </h3>

        <p className="mt-2 text-sm leading-6 text-amber-700 dark:text-amber-400">
          Keep job alerts enabled to discover new opportunities that match your profile.
        </p>

      </div>

    </div>
  );
};

export default Notification;