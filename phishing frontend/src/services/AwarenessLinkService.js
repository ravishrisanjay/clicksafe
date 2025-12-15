// ✅ UPDATED: Pointing explicitly to the Spring Boot Backend Port (8080)
const API_BASE_URL = 'http://localhost:8080/api/awareness-links';
const USER_API_URL = 'http://localhost:8080/api/user';

const AwarenessLinkService = {
  
  // 1. Generate a new awareness link
  generateLink: async ({ platformType, expiryHours, maxClicks }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

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
        throw new Error(`API Error: ${errorText}`);
      }

      const data = await response.json();
      
      // Construct the FRONTEND URL for the simulation
      // This creates a link like: http://localhost:5173/facebook?token=12345
      if (data.success && data.token) {
        const frontendUrl = `${window.location.origin}/${platformType}?token=${data.token}`;
        data.link = frontendUrl; 
      }
      
      return data;
    } catch (error) {
      console.error('Error generating link:', error);
      throw error;
    }
  },

  // 2. Record a click (Used by the fake login pages)
  recordClick: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Failed to record click');
      }

      return await response.json();
    } catch (error) {
      console.error('Error recording click:', error);
      throw error; // Propagate error so frontend can handle it (e.g. redirect to "Expired")
    }
  },

  // 3. Get all user's generated links
  getUserLinks: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${API_BASE_URL}/my-links`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch links');

      return await response.json();
    } catch (error) {
      console.error('Error fetching user links:', error);
      throw error;
    }
  },

  // 4. Get User Profile (Used for stats)
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${USER_API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

export default AwarenessLinkService;