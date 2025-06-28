import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  githubLink: string;
}

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
}

const ProjectForm = ({ onSubmit }: ProjectFormProps) => {
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    githubLink: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(project);
      
      // Reset form
      setProject({
        title: '',
        description: '',
        githubLink: '',
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background min-h-[100px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="githubLink">
          GitHub Link
        </label>
        <input
          id="githubLink"
          type="url"
          value={project.githubLink}
          onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background"
          required
          placeholder="https://github.com/username/repo"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
