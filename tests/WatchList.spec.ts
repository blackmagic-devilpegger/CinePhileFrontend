import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import WatchList from '@/views/WatchList.vue'; // Passe den Pfad an
import.meta.env.VITE_APP_BACKEND_BASE_URL = 'http://localhost:8080';

// Mock für Axios
const mockAxios = new MockAdapter(axios);
const apiEndpoint = 'http://localhost:8080/films';

describe('WatchList.vue Tests', () => {
    beforeEach(() => {
      mockAxios.reset(); // Setzt den Mock vor jedem Test zurück
    });

    it('should show page title', () => {
      // when
      const wrapper = mount(WatchList);

      // then
      expect(wrapper.text()).toMatch('🎬 Meine Watch-Liste');
    });

    it('should show a warning message when no films are available', async () => {
      // Arrange
      mockAxios.onGet(apiEndpoint).reply(200, []);

      // Act
      const wrapper = mount(WatchList);
      await wrapper.vm.$nextTick();

      // Assert
      const warning = wrapper.find('.warning');
      expect(warning.exists()).toBe(true);
      expect(warning.text()).toBe('Keine Filme vorhanden');
    });
  });
