import { ref } from 'vue'

export function useAsyncData(loader) {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const execute = async (...args) => {
    isLoading.value = true
    error.value = null

    try {
      data.value = await loader(...args)
      return data.value
    } catch (caughtError) {
      error.value = caughtError
      data.value = null
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    execute
  }
}
