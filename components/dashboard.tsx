'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApplications, addApplication, deleteApplication, updateApplication } from '@/lib/api/internships';
import { Navbar } from '@/components/navbar';
import { StatCards } from '@/components/stat-cards';
import { ApplicationForm } from '@/components/application-form';
import { ApplicationsTable } from '@/components/applications-table';
import { KanbanBoard } from '@/components/kanban-board';
import type { Application } from '@/lib/types';

export default function Dashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('Student');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedName = localStorage.getItem('name');
    if (!token) {
      router.push('/login');
      return;
    }
    if (savedName) setName(savedName);

    getApplications()
      .then((data) => {
        setApplications(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  // Add application
  const handleAddApplication = async (app: Application) => {
    try {
      const saved = await addApplication(app);
      setApplications((prev) => [saved, ...prev]);
    } catch (err) {
      console.error('Failed to add:', err);
    }
  };

  // Delete application
  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  // Update status (Kanban drag & drop)
  const handleStatusChange = async (id: string, newStatus: Application["status"]) => {
    try {
      await updateApplication(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-muted/50" />
              ))}
            </div>
            <div className="h-40 animate-pulse rounded-xl border border-border bg-muted/50" />
            <div className="h-64 animate-pulse rounded-xl border border-border bg-muted/50" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Welcome back, {name}! 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your internship applications
          </p>
        </div>
        <div className="space-y-6 lg:space-y-8">
          <StatCards applications={applications} />

          <KanbanBoard
            applications={applications}
            onDelete={handleDeleteApplication}
            onStatusChange={handleStatusChange}
          />

          <ApplicationForm onAdd={handleAddApplication} />
          <ApplicationsTable
            applications={applications}
            onDelete={handleDeleteApplication}
          />
        </div>
      </main>
    </div>
  );
}