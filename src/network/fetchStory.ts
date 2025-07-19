import { setting, state, tone, topic } from "../features/story/stores/campaign";
import {
  validateResponseBody,
  type ResponseBody,
} from "../features/story/types/ResponseBody";
import { safeGetError } from "../safeGetError";

export const fetchStory = async () => {
  state.set({ state: "loading" });
  try {
    const queryParams = new URLSearchParams();
    const $tone = tone.get();
    if ($tone !== "-") {
      queryParams.append("tone", $tone);
    }

    const $topic = topic.get();
    if ($topic) {
      queryParams.append("topic", $topic);
    }

    const $setting = setting.get();
    if ($setting !== "-") {
      queryParams.append("setting", $setting);
    }

    const fetchResult = await fetch(`./story?${queryParams.toString()}`);
    if (!fetchResult.ok) {
      const error = `Error: ${fetchResult.status} - ${fetchResult.statusText}`;
      throw new Error(error, { cause: "API_ERROR" });
    }
    const fetchJson = await fetchResult.json();

    const data = validateResponseBody(fetchJson);

    state.set({
      state: "data",
      data,
    });
  } catch (error) {
    console.log(error);
    const data: ResponseBody = {
      result: "error",
      errorMessage: safeGetError(error).message,
    };
    state.set({
      state: "data",
      data,
    });
  }
};
