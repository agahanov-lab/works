export interface Project {
  _id: string;
  title: string;
  description?: string;
  githubLink?: string;
}

export interface MathTopic {
  _id: string;
  name: string;
  description?: string;
}

export interface Algorithm {
  _id: string;
  name: string;
  description?: string;
}

// Add this to fix the import.meta.env TypeScript error
declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  console.log('API_URL:', url);
  console.log('Environment:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    dev: import.meta.env.DEV
  });
  return url;
})();

export const api = {
  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`);
    return response.json();
  },

  async createProject(project: Omit<Project, '_id'>): Promise<Project> {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    return response.json();
  },

  async deleteProject(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    return response.json();
  },

  // Math Topics
  async getMathTopics(): Promise<MathTopic[]> {
    const response = await fetch(`${API_URL}/math-topics`);
    return response.json();
  },

  async createMathTopic(topic: Omit<MathTopic, '_id'>): Promise<MathTopic> {
    const response = await fetch(`${API_URL}/math-topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topic),
    });
    return response.json();
  },

  async deleteMathTopic(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/math-topics/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete math topic');
    }
    return response.json();
  },

  // Algorithms
  async getAlgorithms(): Promise<Algorithm[]> {
    const response = await fetch(`${API_URL}/algorithms`);
    return response.json();
  },

  async createAlgorithm(algorithm: Omit<Algorithm, '_id'>): Promise<Algorithm> {
    const response = await fetch(`${API_URL}/algorithms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(algorithm),
    });
    return response.json();
  },

  async deleteAlgorithm(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/algorithms/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete algorithm');
    }
    return response.json();
  },

  // Resume Operations
  async getCurrentResume() {
    const response = await fetch(`${API_URL}/resume/current`);
    return response.json();
  },

  async uploadResume(formData) {
    const response = await fetch(`${API_URL}/resume/upload`, {
      method: 'POST',
      body: formData, // FormData handles its own Content-Type header
    });
    return response.json();
  },

  async deleteResume() {
    const response = await fetch(`${API_URL}/resume/current`, {
      method: 'DELETE',
    });
    return response.json();
  },

  getResumeDownloadUrl() {
    return `${API_URL}/resume/download`;
  }
};
