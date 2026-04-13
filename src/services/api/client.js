export async function apiClient(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error('API 요청에 실패했습니다.')
  }

  return response.json()
}
