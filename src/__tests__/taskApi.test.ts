import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchTasks, createTask, deleteTask, toggleTask } from '../api/taskApi';

describe('taskApi', () => {
  // Store the original fetch
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore original fetch after tests
    global.fetch = originalFetch;
  });

  describe('fetchTasks', () => {
    it('returns tasks on successful response', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ];

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);

      const result = await fetchTasks();

      expect(result).toEqual(mockTasks);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks');
    });

    it('throws error on failed response', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchTasks()).rejects.toThrow('Failed to fetch tasks');
    });
  });

  // TODO: Add tests for createTask
  // - Test successful creation (mock POST request, verify body and headers)
  // - Test error handling
  describe('createTask', () => {
    it('creates a task successfully', async () => {
      const newTask = { id: '1', title: 'New Task', completed: false };

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(newTask),
      } as Response);

      const result = await createTask({ title: 'New Task' });

      expect(result).toEqual(newTask);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Task' }),
      });
    });

    it('throws error when creation fails', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 400,
      } as Response);

      await expect(
        createTask({ title: 'Bad Task' })
      ).rejects.toThrow('Failed to create task');
    });
  });

  // TODO: Add tests for deleteTask
  // - Test successful deletion (mock DELETE request)
  // - Test error handling
  describe('deleteTask', () => {
    it('deletes a task successfully', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
      } as Response);

      await deleteTask('123');

      expect(global.fetch).toHaveBeenCalledWith('/api/tasks/123', {
        method: 'DELETE',
      });
    });

    it('throws error when deletion fails', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(deleteTask('123')).rejects.toThrow(
        'Failed to delete task'
      );
    });
  });

  // TODO: Add tests for toggleTask
  // - Test successful toggle (mock PATCH request, verify body)
  // - Test error handling
  describe('toggleTask', () => {
    it('toggles task completion successfully', async () => {
      const updatedTask = {
        id: '1',
        title: 'Task',
        completed: true,
      };

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(updatedTask),
      } as Response);

      const result = await toggleTask('1', true);

      expect(result).toEqual(updatedTask);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
    });

    it('throws error when toggle fails', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(toggleTask('1', true)).rejects.toThrow(
        'Failed to update task'
      );
    });
  });
});