<template>
  <div class="location-change-selection-page">
    <div class="page-container">
      <h1>Change Location</h1>
      
      <div class="selection-container">
        <div class="selection-card" @click="goToChangeDetectorLocation">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm5.707 4.707-3 3a.5.5 0 0 0 .708.708L7 8.707V13.5a.5.5 0 0 0 1 0V8.707l1.646 1.646a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <h2>Detector</h2>
          <p>Change detector location</p>
          <button class="btn btn-primary">Select</button>
        </div>
        
        <div class="selection-card" @click="goToChangeCylinderLocation">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm5.707 4.707-3 3a.5.5 0 0 0 .708.708L7 8.707V13.5a.5.5 0 0 0 1 0V8.707l1.646 1.646a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <h2>Cylinder</h2>
          <p>Change cylinder location</p>
          <button class="btn btn-primary">Select</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToChangeDetectorLocation = () => {
  router.push('/change-detector-location');
};

const goToChangeCylinderLocation = () => {
  router.push('/change-cylinder-location');
};
</script>

<style scoped>
.location-change-selection-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
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

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
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

.selection-card h2 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.selection-card p {
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
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
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #36966d;
}

/* Responsive design */
@media (max-width: 768px) {
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