import { ref } from 'vue';

/*
 * A reusable composable to manage loading state for async operations.
 *
 * 💡 Purpose:
 * Encapsulates a reactive `loading` flag and helper methods to toggle it,
 * so you can easily show/hide loading indicators in your components
 * without repeating boilerplate code.
 *
 * 🧠 Typical Use:
 * const { loading, withLoading } = useLoading()
 * await withLoading(async () => {
 *   await fetchData()
 * })
 *
 * The `withLoading()` wrapper ensures that:
 * - loading.value is set to true before your task starts
 * - loading.value is reset to false afterward (even if the task throws)
 *
 * */

export function useLoading(initial = false) {
  const loading = ref(initial);

  function show() {
    loading.value = true;
  }

  function hide() {
    loading.value = false;
  }

  /*
   * Wraps any async function and automatically handles
   * setting and clearing the loading state.
   */

  async function withLoading(task) {
    try {
      show();
      return await task();
    } finally {
      // Always reset loading state, even if an error occurs
      hide();
    }
  }

  return { loading, show, hide, withLoading };
}
