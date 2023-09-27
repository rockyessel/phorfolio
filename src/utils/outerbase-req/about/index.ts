import { EditorContentOutputProps } from "@/interface";
import { decodeBase64ToObject, deserialize } from "@/utils/helpers";
import { OutputData } from "@editorjs/editorjs";
import axios from "axios";

export const getContent = async (): Promise<OutputData | undefined> => {
  try {
    const { data } = await axios.get<EditorContentOutputProps>(
      `https://minimum-aqua.cmd.outerbase.io/content`
    );
    if (data.success) {
      const doesContentExist = data.response.items[0]?.editorcontentoutput;
      // console.log('doesContentExist', doesContentExist);
      if (doesContentExist) {
        const json = decodeBase64ToObject(doesContentExist);
        const content = deserialize(json);
        // console.log('content', content);
        // console.log('json', json);
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
