import { getArchiveSections } from '$lib/server/content';

export async function load() {
  return {
    sections: await getArchiveSections()
  };
}
