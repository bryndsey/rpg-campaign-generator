import { safeGetError } from "../safeGetError";
import { tone, topic, state, setting } from "../stores/campaign";
import { validateResponseBody, type ResponseBody } from "../types/ResponseBody";

export const fetchStory = async () => {
  state.set({ state: "loading" });
  try {
    const queryParams = new URLSearchParams();
    const $tone = tone.get();
    if ($tone !== "Unspecified") {
      queryParams.append("tone", $tone);
    }

    const $topic = topic.get();
    if ($topic) {
      queryParams.append("topic", $topic);
    }

    const $setting = setting.get();
    if ($setting !== "Unspecified") {
      queryParams.append("setting", $setting);
    }

    const fetchResult = await fetch(`./story?${queryParams.toString()}`).then(
      (x) => x.json(),
    );

    const data = validateResponseBody(fetchResult);

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
