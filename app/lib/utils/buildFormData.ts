/** Values that can be serialised into FormData */
type FormDataCompatible = string | number | boolean | Blob | null | undefined;

/**
 * Builds a FormData object from an arbitrary data record
 * and (optionally) a single file under the key `"image_blob"`.
 */
export function buildFormData<T extends Record<string, FormDataCompatible>>(data: T, file?: File): FormData {
  const formData = new FormData();

  // Object.entries() returns (string | FormDataCompatible)[]
  for (const [key, value] of Object.entries(data) as [keyof T, FormDataCompatible][]) {
    if (value == null) continue; // skip null & undefined

    if (value instanceof Blob) {
      // File | Blob → use Blob overload
      formData.append(key as string, value);
    } else {
      // primitives → stringify
      formData.append(key as string, String(value));
    }
  }

  if (file) {
    formData.append("image_blob", file);
  }

  return formData;
}
