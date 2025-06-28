import { useState } from 'react';

interface Algorithm {
  title: string;
  description: string;
  githubLink: string;
}

interface AlgorithmFormProps {
  onSubmit: (algorithm: Algorithm) => void;
}

const AlgorithmForm = ({ onSubmit }: AlgorithmFormProps) => {
  const [algorithm, setAlgorithm] = useState<Algorithm>({
    title: '',
    description: '',
    githubLink: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(algorithm);
      
      // Reset form
      setAlgorithm({
        title: '',
        description: '',
        githubLink: '',
      });
    } catch (error) {
      console.error('Error submitting algorithm:', error);
      alert('Failed to submit algorithm. Please try again.');
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
          value={algorithm.title}
          onChange={(e) => setAlgorithm({ ...algorithm, title: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background"
          required
          placeholder="e.g., Advanced Sorting Algorithms"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={algorithm.description}
          onChange={(e) => setAlgorithm({ ...algorithm, description: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background min-h-[100px]"
          required
          placeholder="Describe the algorithm and its importance..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="githubLink">
          GitHub Link
        </label>
        <input
          id="githubLink"
          type="url"
          value={algorithm.githubLink}
          onChange={(e) => setAlgorithm({ ...algorithm, githubLink: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-input bg-background"
          required
          placeholder="https://github.com/username/algorithms/sorting"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Add Algorithm
      </button>
    </form>
  );
};

export default AlgorithmForm;
