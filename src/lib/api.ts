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
  const url = 'https://dark-math-horizon-api.onrender.com/api';
  
  console.log('Using API URL:', url);
  
  return url;
})();

export const api = {
  // Projects
  async getProjects(): Promise<Project[]> {
    console.log('Fetching projects from:', `${API_URL}/projects`);
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      console.log('Projects response status:', response.status);
      const data = await response.json();
      console.log('Projects data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
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
    console.log('Deleting project with ID:', id);
    console.log('Using API URL:', `${API_URL}/projects/${id}`);
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Delete response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        throw new Error(`Failed to delete project: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
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
    console.log('Deleting math topic with ID:', id);
    console.log('Using API URL:', `${API_URL}/math-topics/${id}`);
    try {
      const response = await fetch(`${API_URL}/math-topics/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'include'
      });
      console.log('Delete response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        throw new Error(`Failed to delete math topic: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
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
    console.log('Deleting algorithm with ID:', id);
    console.log('Using API URL:', `${API_URL}/algorithms/${id}`);
    try {
      const response = await fetch(`${API_URL}/algorithms/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'include'
      });
      console.log('Delete response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        throw new Error(`Failed to delete algorithm: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  // Resume Operations
  async getCurrentResume() {
    const response = await fetch(`${API_URL}/resume/current`);
    return response.json();
  },

  async uploadResume(formData) {
    // Add client-side file type validation before upload
    const file = formData.get('resume');
    if (file) {
      const fileType = file.type;
      const validTypes = [
        'application/pdf',                     // PDF files
        'application/msword',                  // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
      ];
      
      if (!validTypes.includes(fileType)) {
        throw new Error('Invalid file type. Please upload a PDF or Word document (.pdf, .doc, or .docx)');
      }
    }

    const response = await fetch(`${API_URL}/resume/upload`, {
      method: 'POST',
      body: formData, // FormData handles its own Content-Type header
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to upload resume');
    }
    
    return response.json();
  },

  async deleteResume() {
    console.log('Deleting current resume');
    console.log('Using API URL:', `${API_URL}/resume/current`);
    try {
      const response = await fetch(`${API_URL}/resume/current`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'include'
      });
      console.log('Delete response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        throw new Error(`Failed to delete resume: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  getResumeDownloadUrl() {
    return `${API_URL}/resume/download`;
  }
};
