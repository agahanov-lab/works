const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Projects
  async getProjects() {
    const response = await fetch(`${API_URL}/projects`);
    return response.json();
  },

  async createProject(project) {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    return response.json();
  },

  // Math Topics
  async getMathTopics() {
    const response = await fetch(`${API_URL}/math-topics`);
    return response.json();
  },

  async createMathTopic(topic) {
    const response = await fetch(`${API_URL}/math-topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topic),
    });
    return response.json();
  },

  // Algorithms
  async getAlgorithms() {
    const response = await fetch(`${API_URL}/algorithms`);
    return response.json();
  },

  async createAlgorithm(algorithm) {
    const response = await fetch(`${API_URL}/algorithms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(algorithm),
    });
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
