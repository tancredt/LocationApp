<template>
  <div class="change-location-form-page">
    <div class="page-container">
      <h1>Change Detector Location</h1>

      <div class="form-container">
        <form @submit.prevent="changeDetectorLocation" class="change-location-form">
          <div class="form-row">
            <div class="form-group">
              <label for="outgoing-detector">Outgoing Detector *</label>
              <select id="outgoing-detector" v-model="formData.outgoing_detector_id" required class="form-control" @change="updateOutgoingLocation">
                <option value="">Select Outgoing Detector</option>
                <option v-for="detector in detectors" :key="detector.id" :value="detector.id">
                  {{ detector.label }} ({{ detector.serial }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="outgoing-location">Outgoing Location *</label>
              <select id="outgoing-location" v-model="formData.outgoing_location_id" required class="form-control">
                <option value="">Select Location</option>
                <option v-for="location in locations" :key="location.id" :value="location.id">
                  {{ location.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="returning-detector">Returning Detector *</label>
              <select id="returning-detector" v-model="formData.returning_detector_id" required class="form-control" @change="updateReturningLocation">
                <option value="">Select Returning Detector</option>
                <option v-for="detector in detectors" :key="detector.id" :value="detector.id">
                  {{ detector.label }} ({{ detector.serial }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="returning-location">Returning Location *</label>
              <select id="returning-location" v-model="formData.returning_location_id" required class="form-control">
                <option value="">Select Location</option>
                <option v-for="location in locations" :key="location.id" :value="location.id">
                  {{ location.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Change Location</button>
            <router-link to="/change-location" class="btn btn-secondary">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Dialog -->
    <div v-if="showSuccessDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-box" @click.stop>
        <h3>Success!</h3>
        <p>{{ successMessage }}</p>
        <div class="dialog-actions">
          <button @click="closeDialogAndReturn" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>

    <!-- Error Dialog -->
    <div v-if="showErrorDialog" class="dialog-overlay" @click="closeErrorDialog">
      <div class="dialog-box" @click.stop>
        <h3>Errors</h3>
        <div class="error-list">
          <p v-for="(error, index) in errorMessages" :key="index" class="error-item">
            {{ error }}
          </p>
        </div>
        <div class="dialog-actions">
          <button @click="closeErrorDialog" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { post, get } from '@/utils/api.js';

const router = useRouter();

// State for form data
const formData = ref({
  outgoing_detector_id: '',
  outgoing_location_id: '',
  returning_detector_id: '',
  returning_location_id: ''
});

// State for related data
const detectors = ref([]);
const locations = ref([]);

// State for submission
const isSubmitting = ref(false);

// State for success dialog
const showSuccessDialog = ref(false);
const successMessage = ref('');

// State for error dialog
const showErrorDialog = ref(false);
const errorMessages = ref([]);

// Fetch detectors and locations
const fetchData = async () => {
  try {
    // Fetch detectors
    const detectorsResult = await get('/api/inventory/detectors/');
    if (detectorsResult.ok) {
      detectors.value = detectorsResult.data;
    }

    // Fetch locations
    const locationsResult = await get('/api/inventory/locations/');
    if (locationsResult.ok) {
      locations.value = locationsResult.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Update location when detector is selected
const updateOutgoingLocation = async () => {
  if (formData.value.outgoing_detector_id) {
    const detector = detectors.value.find(d => d.id == formData.value.outgoing_detector_id);
    if (detector && detector.location) {
      // If location is an object, get its ID; otherwise, use it directly
      const locationId = typeof detector.location === 'object' ? detector.location.id : detector.location;
      formData.value.outgoing_location_id = locationId;
    }
  }
};

const updateReturningLocation = async () => {
  if (formData.value.returning_detector_id) {
    const detector = detectors.value.find(d => d.id == formData.value.returning_detector_id);
    if (detector && detector.location) {
      // If location is an object, get its ID; otherwise, use it directly
      const locationId = typeof detector.location === 'object' ? detector.location.id : detector.location;
      formData.value.returning_location_id = locationId;
    }
  }
};

// Change detector location function
const changeDetectorLocation = async () => {
  isSubmitting.value = true;

  try {
    // Call the API to change detector locations
    const result = await post('/api/inventory/change-detector-location/', {
      outgoing_detector_id: parseInt(formData.value.outgoing_detector_id),
      outgoing_location_id: parseInt(formData.value.outgoing_location_id),
      returning_detector_id: parseInt(formData.value.returning_detector_id),
      returning_location_id: parseInt(formData.value.returning_location_id)
    });

    if (!result.ok) {
      if (result.status === 400) {
        const errorData = result.data;
        errorMessages.value = [];

        for (const [field, errors] of Object.entries(errorData.errors)) {
          if (Array.isArray(errors)) {
            errorMessages.value.push(`${field}: ${errors.join(', ')}`);
          } else {
            errorMessages.value.push(`${field}: ${errors}`);
          }
        }

        showErrorDialog.value = true;
      } else {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      return;
    }

    // Show success message
    successMessage.value = result.data.message;
    showSuccessDialog.value = true;
  } catch (error) {
    console.error('Error changing detector location:', error);
    alert('Error changing detector location: ' + error.message);
  } finally {
    isSubmitting.value = false;
  }
};

// Close dialog and return to selection page
const closeDialogAndReturn = () => {
  showSuccessDialog.value = false;
  router.push('/change-location');
};

// Close dialog functions
const closeDialog = () => {
  showSuccessDialog.value = false;
};

const closeErrorDialog = () => {
  showErrorDialog.value = false;
  errorMessages.value = [];
};

// Initialize component
onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
.change-location-form-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  flex: 1;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.form-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.change-location-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
  flex-basis: calc(50% - 0.75rem); /* Two columns by default */
}

/* On smaller screens, make form groups full width */
@media (max-width: 768px) {
  .form-group {
    flex-basis: 100%;
  }
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
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
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #36966d;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
  z-index: 1001;
}

.dialog-box h3 {
  margin-top: 0;
  color: #2c3e50;
}

.dialog-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.error-list {
  max-height: 200px;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.error-item {
  margin: 0.25rem 0;
  color: #721c24;
  font-weight: 500;
}
</style>