import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const profileOptions = [
  'https://www.w3schools.com/howto/img_avatar.png',
  'https://www.w3schools.com/howto/img_avatar2.png',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/lego/6.jpg'
];

export default function Profile() {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', about: '', email: '', profileImageUrl: '' });

  const BACKEND_URL = 'http://localhost:8080/api/user/profile';
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("ss")
    fetch(BACKEND_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched user data:', data);
        setUser(data);
        setForm({
          name: data.name,
          about: data.about,
          email: data.email,
          profileImageUrl: data.profileImageUrl
        });
      });
      console.log("sds")

  }, [editing]);

  const handleSave = () => {
    fetch(BACKEND_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditing(false);
      });
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading profile...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>👤 Your Profile</h1>

      <div style={{ textAlign: 'right' }}>
        {!editing ? (
          <button onClick={() => setEditing(true)}>✏️ Edit</button>
        ) : (
          <button onClick={handleSave}>💾 Save</button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <img
          src={editing ? form.profileImageUrl : user.profileImageUrl || profileOptions[0]}
          alt="Profile"
          style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #004080', objectFit: 'cover' }}
        />

        <div style={{ flex: 1 }}>
          {editing ? (
            <>
              <label>Name:</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              /><br />

              <label>Email:</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              /><br />

              <label>About:</label>
              <textarea
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
              /><br />

              <label>Select Profile Image:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {profileOptions.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="option"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: form.profileImageUrl === url ? '3px solid green' : '1px solid #ccc',
                      cursor: 'pointer'
                    }}
                    onClick={() => setForm({ ...form, profileImageUrl: url })}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p style={{ fontStyle: 'italic' }}>{user.about}</p>
            </>
          )}
        </div>
      </div>

      <div style={{ background: '#f0f4ff', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
        <h3>📊 Phishing Campaign Stats</h3>
        <p>📤 Links Created: <strong>{user.linksCreated || 0}</strong></p>
        <p>⚡ Links Clicked: <strong>{user.linksClicked || 0}</strong></p>

        <div style={{ height: '200px', marginTop: '20px', background: '#fff', borderRadius: '10px', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)', display: 'flex' }}>
          <div
            style={{
              background: '#0074D9',
              width: `${(user.linksClicked / Math.max(user.linksCreated, 1)) * 100}%`,
              transition: 'width 0.5s',
              borderRadius: '10px'
            }}
          ></div>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>
          Click rate: {(user.linksCreated > 0 ? (user.linksClicked / user.linksCreated) * 100 : 0).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
