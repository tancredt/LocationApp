<template>
  <div class="location-change-selection-page">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">Hazmat Equipment Location Management</h1>
        <p class="app-subtitle">Fire Rescue Victoria - Internal System</p>
      </div>
      <button class="logout-btn" @click="logout" title="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      </button>
    </header>

    <div class="page-container">
      <h2 class="page-title">Select Equipment Type</h2>

      <div class="selection-container">
        <div class="selection-card" @click="goToMicroRaeSwap">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm5.707 4.707-3 3a.5.5 0 0 0 .708.708L7 8.707V13.5a.5.5 0 0 0 1 0V8.707l1.646 1.646a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <h3>MicroRAE</h3>
          <p>Swap MicroRAE detector between stations and Burnley</p>
          <button class="btn btn-primary">Select</button>
        </div>

        <div class="selection-card" @click="goToChangeDetectorLocation">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm5.707 4.707-3 3a.5.5 0 0 0 .708.708L7 8.707V13.5a.5.5 0 0 0 1 0V8.707l1.646 1.646a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <h3>Hazmat Detector</h3>
          <p>Change location for any hazmat detector</p>
          <button class="btn btn-primary">Select</button>
        </div>

        <div class="selection-card" @click="goToChangeCylinderLocation">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm5.707 4.707-3 3a.5.5 0 0 0 .708.708L7 8.707V13.5a.5.5 0 0 0 1 0V8.707l1.646 1.646a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <h3>Cylinder</h3>
          <p>Change calibration cylinder location</p>
          <button class="btn btn-primary">Select</button>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <p>&copy; 2026 Fire Rescue Victoria. Internal use only. Authorized personnel only.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const goToMicroRaeSwap = () => {
  router.push('/microrae-swap');
};

const goToChangeDetectorLocation = () => {
  router.push('/change-detector-location');
};

const goToChangeCylinderLocation = () => {
  router.push('/change-cylinder-location');
};

const logout = async () => {
  await authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.location-change-selection-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

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

.logout-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.page-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.selection-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.selection-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 300px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.card-icon {
  margin-bottom: 1.5rem;
  color: #42b883;
}

.selection-card h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.selection-card p {
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.4;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: 100%;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #36966d;
}

.app-footer {
  background: #2c3e50;
  color: #999;
  padding: 1rem 2rem;
  text-align: center;
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 0.85rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .app-title {
    font-size: 1.1rem;
  }

  .selection-container {
    flex-direction: column;
    align-items: center;
  }

  .selection-card {
    width: 100%;
    max-width: 400px;
  }
}
</style>