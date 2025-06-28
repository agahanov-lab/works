import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from '@/lib/api';
import type { Project, MathTopic, Algorithm } from '@/lib/api';

type Item = Project | MathTopic | Algorithm;

const ManageItems = () => {
  const [items, setItems] = useState<{ projects: Item[], mathTopics: Item[], algorithms: Item[] }>({
    projects: [],
    mathTopics: [],
    algorithms: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const [projects, mathTopics, algorithms] = await Promise.all([
        api.getProjects(),
        api.getMathTopics(),
        api.getAlgorithms()
      ]);
      setItems({ projects, mathTopics, algorithms });
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  const handleDelete = async (type: 'projects' | 'mathTopics' | 'algorithms', id: string) => {
    try {
      let endpoint = '';
      switch (type) {
        case 'projects':
          await api.deleteProject(id);
          break;
        case 'mathTopics':
          await api.deleteMathTopic(id);
          break;
        case 'algorithms':
          await api.deleteAlgorithm(id);
          break;
      }

      // Update local state after successful deletion
      setItems(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item._id !== id)
      }));

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderItemList = (title: string, items: Item[], type: 'projects' | 'mathTopics' | 'algorithms') => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No items found</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} 
                 className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground">
              <div>
                <h4 className="font-medium">{item.title || item.name}</h4>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this item.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDelete(type, item._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">Manage Content</h2>
      {renderItemList('Projects', items.projects, 'projects')}
      {renderItemList('Math Topics', items.mathTopics, 'mathTopics')}
      {renderItemList('Algorithms', items.algorithms, 'algorithms')}
    </div>
  );
};

export default ManageItems;
