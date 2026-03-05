<template>
  <div class="change-location-form-page">
    <div class="page-container">
      <h1>Detector Swap</h1>

      <div class="form-container">
        <form @submit.prevent="changeDetectorLocation" class="change-location-form">
          <!-- Detector Model (MicroRAE only) -->
          <div class="form-row">
            <div class="form-group">
              <label for="detector-model">Detector Model *</label>
              <select 
                id="detector-model" 
                v-model="formData.detector_model_id" 
                required 
                class="form-control"
                @change="onDetectorModelChange"
              >
                <option value="">Select Detector Model</option>
                <option 
                  v-for="model in microRaeDetectorModels" 
                  :key="model.id" 
                  :value="model.id"
                >
                  {{ model.label }}
                </option>
              </select>
            </div>

            <!-- Origin (Priority 2 and 3 only) -->
            <div class="form-group">
              <label for="original-location">Origin *</label>
              <select
                id="original-location"
                v-model="formData.original_location_id"
                required
                class="form-control"
                @change="onOriginalLocationChange"
              >
                <option value="">Select Location</option>
                <option
                  v-for="location in priority3Locations"
                  :key="location.id"
                  :value="location.id"
                >
                  {{ location.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Incoming and Outgoing Detectors -->
          <div class="form-row">
            <div class="form-group">
              <label for="incoming-detector">Detector Returned *</label>
              <select
                id="incoming-detector"
                v-model="formData.incoming_detector_id"
                required
                class="form-control"
              >
                <option value="">Select Detector Returned</option>
                <option
                  v-for="detector in filteredIncomingDetectors"
                  :key="detector.id"
                  :value="detector.id"
                >
                  {{ detector.label }} ({{ detector.serial }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="outgoing-detector">Outgoing Detector (from Burnley) *</label>
              <select
                id="outgoing-detector"
                v-model="formData.outgoing_detector_id"
                required
                class="form-control"
              >
                <option value="">Select Outgoing Detector</option>
                <option
                  v-for="detector in filteredOutgoingDetectors"
                  :key="detector.id"
                  :value="detector.id"
                >
                  {{ detector.label }} ({{ detector.serial }})
                </option>
              </select>
            </div>
          </div>

          <!-- Reason for Return -->
          <div class="form-row">
            <div class="form-group">
              <label for="reason-for-return">Reason for Return *</label>
              <select
                id="reason-for-return"
                v-model="formData.fault_type"
                required
                class="form-control"
              >
                <option value="">Select Reason for Return</option>
                <option
                  v-for="faultType in faultTypes"
                  :key="faultType.value"
                  :value="faultType.value"
                >
                  {{ faultType.label }}
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { post, get } from '@/utils/api.js';

const router = useRouter();

// State for form data
const formData = ref({
  detector_model_id: '',
  original_location_id: '',
  incoming_detector_id: '',
  outgoing_detector_id: '',
  fault_type: ''
});

// State for related data
const detectorModels = ref([]);
const locations = ref([]);
const detectors = ref([]);
const faultTypes = ref([]);

// State for submission
const isSubmitting = ref(false);

// State for success dialog
const showSuccessDialog = ref(false);
const successMessage = ref('');

// State for error dialog
const showErrorDialog = ref(false);
const errorMessages = ref([]);

// Computed: Filter detector models to only MicroRAE models
const microRaeDetectorModels = computed(() => {
  return detectorModels.value.filter(model => 
    model.label.toLowerCase().includes('microrae')
  );
});

// Computed: Filter locations to priority 2 and 3
const priority3Locations = computed(() => {
  return locations.value.filter(location => location.priority === 2 || location.priority === 3);
});

// Computed: Filter incoming detectors based on selected model and location
const filteredIncomingDetectors = computed(() => {
  if (!formData.value.detector_model_id || !formData.value.original_location_id) {
    return [];
  }
  return detectors.value.filter(detector => 
    detector.detector_model === formData.value.detector_model_id &&
    detector.location === formData.value.original_location_id
  );
});

// Computed: Filter outgoing detectors (Burnley location, same detector model)
const filteredOutgoingDetectors = computed(() => {
  if (!formData.value.detector_model_id) {
    return [];
  }
  const burnleyLocation = locations.value.find(loc => 
    loc.label.toLowerCase().includes('burnley')
  );
  if (!burnleyLocation) {
    return [];
  }
  return detectors.value.filter(detector => 
    detector.detector_model === formData.value.detector_model_id &&
    detector.location === burnleyLocation.id
  );
});

// Fetch all data
const fetchData = async () => {
  try {
    // Fetch detector models
    const detectorModelsResult = await get('/api/inventory/detectormodels/');
    if (detectorModelsResult.ok) {
      detectorModels.value = detectorModelsResult.data;
    }

    // Fetch locations
    const locationsResult = await get('/api/inventory/locations/');
    if (locationsResult.ok) {
      locations.value = locationsResult.data;
    }

    // Fetch detectors
    const detectorsResult = await get('/api/inventory/detectors/');
    if (detectorsResult.ok) {
      detectors.value = detectorsResult.data;
    }

    // Fetch fault types
    const faultTypesResult = await get('/api/inventory/detector-fault-types/');
    if (faultTypesResult.ok) {
      faultTypes.value = faultTypesResult.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Handler for detector model change
const onDetectorModelChange = () => {
  // Reset dependent selections
  formData.value.incoming_detector_id = '';
  formData.value.outgoing_detector_id = '';
};

// Handler for original location change
const onOriginalLocationChange = () => {
  // Reset incoming detector selection
  formData.value.incoming_detector_id = '';
};

// Change detector location function - swaps detectors between origin and Burnley
const changeDetectorLocation = async () => {
  isSubmitting.value = true;

  try {
    // Find Burnley location
    const burnleyLocation = locations.value.find(loc =>
      loc.label.toLowerCase().includes('burnley')
    );

    if (!burnleyLocation) {
      errorMessages.value = ['Burnley location not found'];
      showErrorDialog.value = true;
      isSubmitting.value = false;
      return;
    }

    // Swap detectors:
    // 1. Move incoming detector (from origin) to Burnley
    // 2. Move outgoing detector (from Burnley) to origin
    const incomingDetectorId = parseInt(formData.value.incoming_detector_id);
    const outgoingDetectorId = parseInt(formData.value.outgoing_detector_id);
    const originLocationId = parseInt(formData.value.original_location_id);
    const burnleyLocationId = burnleyLocation.id;

    // Move incoming detector to Burnley
    const result1 = await post('/api/inventory/change-detector-location/', {
      detector_id: incomingDetectorId,
      location_id: burnleyLocationId
    });

    if (!result1.ok) {
      if (result1.status === 400) {
        const errorData = result1.data;
        errorMessages.value = [];
        for (const [field, errors] of Object.entries(errorData.errors || errorData)) {
          if (Array.isArray(errors)) {
            errorMessages.value.push(`${field}: ${errors.join(', ')}`);
          } else {
            errorMessages.value.push(`${field}: ${errors}`);
          }
        }
        showErrorDialog.value = true;
      } else {
        throw new Error(`HTTP error! status: ${result1.status}`);
      }
      return;
    }

    // Move outgoing detector to origin
    const result2 = await post('/api/inventory/change-detector-location/', {
      detector_id: outgoingDetectorId,
      location_id: originLocationId
    });

    if (!result2.ok) {
      if (result2.status === 400) {
        const errorData = result2.data;
        errorMessages.value = [];
        for (const [field, errors] of Object.entries(errorData.errors || errorData)) {
          if (Array.isArray(errors)) {
            errorMessages.value.push(`${field}: ${errors.join(', ')}`);
          } else {
            errorMessages.value.push(`${field}: ${errors}`);
          }
        }
        showErrorDialog.value = true;
      } else {
        throw new Error(`HTTP error! status: ${result2.status}`);
      }
      return;
    }

    // Create detector fault for the returned detector
    const today = new Date().toISOString().split('T')[0];
    const faultResult = await post('/api/inventory/detectorfaults/', {
      detector: incomingDetectorId,
      report_dt: today,
      report_location: originLocationId,
      status: 'OP',
      fault_type: formData.value.fault_type,
      submit_notes: ''
    });

    if (!faultResult.ok) {
      if (faultResult.status === 400) {
        const errorData = faultResult.data;
        errorMessages.value = [];
        for (const [field, errors] of Object.entries(errorData.errors || errorData)) {
          if (Array.isArray(errors)) {
            errorMessages.value.push(`${field}: ${errors.join(', ')}`);
          } else {
            errorMessages.value.push(`${field}: ${errors}`);
          }
        }
        showErrorDialog.value = true;
      } else {
        throw new Error(`HTTP error! status: ${faultResult.status}`);
      }
      return;
    }

    // Show success message
    successMessage.value = 'Detector swap completed successfully';
    showSuccessDialog.value = true;
  } catch (error) {
    console.error('Error swapping detectors:', error);
    errorMessages.value = [error.message || 'An error occurred'];
    showErrorDialog.value = true;
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
  gap: 3rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
  flex-basis: calc(50% - 0.75rem);
  position: relative;
}

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
