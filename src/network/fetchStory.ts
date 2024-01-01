import { tone, topic, state } from "../stores/campaign";
import type { ResponseBody } from "../types/ResponseBody";

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
    const data = await fetch(`./story?${queryParams.toString()}`).then((x) =>
      x.json(),
    );
    state.set({
      state: "data",
      data,
    });
  } catch {
    const data: ResponseBody = {
      result: "error",
      error: "Ran into an unexpected error. Try again",
    };
    state.set({
      state: "data",
      data,
    });
  }
};
