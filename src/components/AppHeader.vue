<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">Hazmat Equipment Location Management</h1>
      <p class="app-subtitle">Fire Rescue Victoria - Internal System</p>
    </div>
    
    <div class="header-right">
      <!-- Help dropdown -->
      <div class="dropdown">
        <button class="dropdown-button">Help</button>
        <div class="dropdown-content">
          <router-link to="/about">About</router-link>
          <router-link to="/help">Help & FAQ</router-link>
        </div>
      </div>
      
      <button class="logout-btn" @click="handleLogout" title="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        <span class="logout-text">Logout</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.header-content {
  display: flex;
  flex-direction: column;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.app-subtitle {
  font-size: 0.85rem;
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.dropdown-button:hover {
  background: rgba(255,255,255,0.3);
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  top: 100%;
  overflow: hidden;
}

.dropdown-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropdown-button {
  background: rgba(255,255,255,0.3);
}

.logout-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.logout-text {
  display: none;
}

@media (min-width: 768px) {
  .logout-text {
    display: inline;
  }
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .header-right {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .app-title {
    font-size: 1.1rem;
  }

  .dropdown-content {
    position: static;
    box-shadow: none;
    background: rgba(255,255,255,0.1);
  }

  .dropdown-content a {
    color: white;
  }

  .dropdown-content a:hover {
    background-color: rgba(255,255,255,0.2);
  }

  .dropdown:hover .dropdown-content {
    display: none;
  }

  .dropdown-content {
    display: block;
  }
}
</style>
