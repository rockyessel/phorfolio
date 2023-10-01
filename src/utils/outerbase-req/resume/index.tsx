import { EditorContentOutputProps } from '@/interface';
import { decodeBase64ToObject, deserialize } from '@/utils/helpers';
import { OutputData } from '@editorjs/editorjs';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

export const getContent = async (): Promise<OutputData | undefined> => {
  try {
    const { data } = await axios.get<EditorContentOutputProps>(
      `${baseURL}/content`
    );
    if (data.success) {
      const doesContentExist = data.response.items[0]?.editorcontentoutput;
      if (doesContentExist) {
        const json = decodeBase64ToObject(doesContentExist);
        const content = deserialize(json);
        if (content) {
          return content;
        }
      }
    }
  } catch (error) {
    console.error('Error fetching content:', error);
  }
  return undefined;
};
