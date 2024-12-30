import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FilmList from '@/views/FilmList.vue'; // Passe den Pfad an
import type { Film } from '@/model/Film';
import.meta.env.VITE_APP_BACKEND_BASE_URL = 'http://localhost:8080';


// Mock für Axios
const mockAxios = new MockAdapter(axios);
const apiEndpoint = 'http://localhost:8080/films'; // Dein API-Endpunkt

describe('FilmList.vue Tests', () => {
  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onGet(apiEndpoint).reply(200, []); // Stelle sicher, dass der Mock für alle Tests gilt
  });

  it('should show a warning message when no films are available', async () => {
    // Arrange
    mockAxios.onGet(apiEndpoint).reply(200, []);

    // Act
    const wrapper = mount(FilmList);
    await wrapper.vm.$nextTick();

    // Assert
    const warning = wrapper.find('.warning');
    expect(warning.exists()).toBe(true);
    expect(warning.text()).toBe('Keine Filme vorhanden');
  });

  it('should show an error message if inputs are invalid', async () => {
    // Arrange
    const wrapper = mount(FilmList);

    // Act
    await wrapper.find('.add-button').trigger('click');

    // Assert
    const error = wrapper.find('.error-message');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Bitte geben Sie einen Titel ein.');
  });

  it('should show page title', () => {
    // when
    const wrapper = mount(FilmList);

    // then
    expect(wrapper.text()).toMatch('🎬 Meine Film-Liste');
  });

  it('should have an input for the film title', () => {
    // when
    const wrapper = mount(FilmList);

    // then
    const input = wrapper.find('.film-input');
    expect(input.exists()).toBeTruthy();
    expect(input.attributes('placeholder')).toBe('Film hinzufügen');
  });

  it('should have an input for the film year', () => {
    // when
    const wrapper = mount(FilmList);

    // then
    const yearInput = wrapper.find('.year-input');
    expect(yearInput.exists()).toBeTruthy();
    expect(yearInput.attributes('placeholder')).toBe('Jahr');
  });

  it('should have a button to add films', () => {
    // when
    const wrapper = mount(FilmList);

    // then
    const addButton = wrapper.find('.add-button');
    expect(addButton.exists()).toBeTruthy();
    expect(addButton.text()).toBe('Film hinzufügen');
  });

  it('should display a warning if no films are available', () => {
    // when
    const wrapper = mount(FilmList);

    // then
    const warning = wrapper.find('.warning');
    expect(warning.exists()).toBeTruthy();
    expect(warning.text()).toBe('Keine Filme vorhanden');
  });
});
