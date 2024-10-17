export async function loadLocaleData(
  language: string,
  namespace: string
): Promise<string> {
  return fetch(`${window.location.origin}/i18n/${language}/${namespace}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching locale ${language}/${namespace}`);
      }
      return response.json(); // Devuelve la promesa de response.json()
    })
    .then((data) => JSON.stringify(data)) // Aplica JSON.stringify al resultado
    .catch((error) => {
      console.error(`Error loading locale ${language}/${namespace}:`, error);
      throw error;
    });
}
