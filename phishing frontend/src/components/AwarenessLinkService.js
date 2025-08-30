const API_BASE_URL = '/api/awareness-links';

const AwarenessLinkService = {
  // Generate a new awareness link - now returns frontend URL
  generateLink: async ({ platformType, expiryHours, maxClicks }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Generating link with:', { platformType, expiryHours, maxClicks });

      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          platformType,
          expiryHours,
          maxClicks
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Build frontend URL instead of backend URL
      if (data.success && data.token) {
        const frontendUrl = `http://localhost:5173/${platformType}?token=${data.token}`;
        data.link = frontendUrl; // Override with frontend URL
      }
      
      console.log('API Success:', data);
      return data;
    } catch (error) {
      console.error('Error generating link:', error);
      throw error;
    }
  },

  // New method to record click from fake pages
  recordClick: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error recording click:', error);
      throw error;
    }
  },

  // Get all user's generated links
  getUserLinks: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/my-links`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Get Links Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user links:', error);
      throw error;
    }
  },

  // Get user profile with updated stats
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Profile Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

export default AwarenessLinkService;
