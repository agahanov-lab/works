import { useState } from 'react';

interface MathTopic {
  title: string;
  description: string;
  equations: string[];
  applications: string[];
}

interface MathTopicFormProps {
  onSubmit: (topic: MathTopic) => void;
}

const MathTopicForm = ({ onSubmit }: MathTopicFormProps) => {
  const [topic, setTopic] = useState<MathTopic>({
    title: '',
    description: '',
    equations: [''],
    applications: [''],
  });

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...topic.equations];
    newEquations[index] = value;
    setTopic({ ...topic, equations: newEquations });
  };

  const handleApplicationChange = (index: number, value: string) => {
    const newApplications = [...topic.applications];
    newApplications[index] = value;
    setTopic({ ...topic, applications: newApplications });
  };

  const addEquation = () => {
    setTopic({ ...topic, equations: [...topic.equations, ''] });
  };

  const addApplication = () => {
    setTopic({ ...topic, applications: [...topic.applications, ''] });
  };

  const removeEquation = (index: number) => {
    const newEquations = topic.equations.filter((_, i) => i !== index);
    setTopic({ ...topic, equations: newEquations });
  };

  const removeApplication = (index: number) => {
    const newApplications = topic.applications.filter((_, i) => i !== index);
    setTopic({ ...topic, applications: newApplications });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out empty equations and applications
      const filteredTopic = {
        ...topic,
        equations: topic.equations.filter(eq => eq.trim() !== ''),
        applications: topic.applications.filter(app => app.trim() !== ''),
      };
      await onSubmit(filteredTopic);
      
      // Reset form
      setTopic({
        title: '',
        description: '',
        equations: [''],
        applications: [''],
      });
    } catch (error) {
      console.error('Error submitting math topic:', error);
      alert('Failed to submit math topic. Please try again.');
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
          value={topic.title}
          onChange={(e) => setTopic({ ...topic, title: e.target.value })}
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
          value={topic.description}
          onChange={(e) => setTopic({ ...topic, description: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Key Equations</label>
        {topic.equations.map((equation, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={equation}
              onChange={(e) => handleEquationChange(index, e.target.value)}
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background font-mono"
              placeholder="f(x) = x²"
            />
            {topic.equations.length > 1 && (
              <button
                type="button"
                onClick={() => removeEquation(index)}
                className="px-3 py-2 text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addEquation}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          + Add equation
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Applications</label>
        {topic.applications.map((application, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={application}
              onChange={(e) => handleApplicationChange(index, e.target.value)}
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              placeholder="Application example"
            />
            {topic.applications.length > 1 && (
              <button
                type="button"
                onClick={() => removeApplication(index)}
                className="px-3 py-2 text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addApplication}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          + Add application
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Add Mathematics Topic
      </button>
    </form>
  );
};

export default MathTopicForm;
