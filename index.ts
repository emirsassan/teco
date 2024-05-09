/**
 * Reads a Teco configuration file and returns its content as a parsed object.
 * @param filePath Path to the configuration file.
 * @returns A promise that resolves to the parsed configuration object.
 */
async function readTecoConfig(filePath: string): Promise<Record<string, string | Record<string, string> | string[]>> {
  // Read the file contents
  const configText = await Bun.file(filePath).text();

  // Split the file into lines and parse each line as a key-value pair
  const configEntries = configText.split('\n').map((line) => line.split(':', 2).map((part) => part.trim()));

  // The final configuration object
  const config: Record<string, string | Record<string, string> | string[]> = {};

  // The key of the currently parsed object
  let currentObjectKey: string | null = null;

  // The content of the currently parsed object
  let currentObjectContent = '';

  // Loop over the configuration entries
  for (const [key, value] of configEntries) {
    if (!value) {
      // Ignore empty lines
      continue;
    }

    if (value.startsWith('{')) {
      // Start of a new object
      currentObjectKey = key;
      currentObjectContent = value;
    } else if (value.startsWith('[')) {
      // JSON array
      config[key] = JSON.parse(value);
    } else if (currentObjectKey && currentObjectContent) {
      // Continuation of the current object
      currentObjectContent += `\n${value}`;
      if (value.endsWith('}')) {
        // End of the current object
        config[currentObjectKey] = JSON.parse(currentObjectContent);
        currentObjectKey = null;
        currentObjectContent = '';
      }
    } else {
      // Regular key-value pair
      config[key] = value.replace(/"/g, '');
    }
  }

  return config;
}
