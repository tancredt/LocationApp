<template>
  <div class="login-container">
    <div class="login-header">
      <div class="header-content">
        <h1 class="app-title">Hazmat Equipment Location Management</h1>
        <p class="app-subtitle">Fire Rescue Victoria - Internal System</p>
      </div>
    </div>
    
    <div class="login-form">
      <h2>Login</h2>
      <p class="login-info">Sign in with your FRV inventory system credentials to access equipment location management.</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="form-control"
            :disabled="authStore.loading"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="form-control"
            :disabled="authStore.loading"
            autocomplete="current-password"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="authStore.loading"
        >
          <span v-if="authStore.loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      
      <div class="login-footer">
        <p class="footer-text">This system is for authorized Fire Rescue Victoria personnel only.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  const result = await authStore.login(username.value, password.value);

  if (result.success) {
    // Redirect to location change selection page after successful login
    router.push('/change-location');
  } else {
    errorMessage.value = result.message || 'Login failed';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-header {
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.header-content {
  color: white;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.app-subtitle {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.login-info {
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

.error-message {
  color: #e74c3c;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fdeded;
  border: 1px solid #f1c1c1;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #36966d;
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
}

.footer-text {
  color: #999;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.25rem;
  }
  
  .app-subtitle {
    font-size: 0.8rem;
  }
  
  .login-form {
    padding: 1.5rem;
  }
}
</style>