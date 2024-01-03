<script lang="ts">
  import { fetchStory } from "./network/fetchStory";
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import { state, tone, topic } from "./stores/campaign";
  import { tones } from "./types/tones";

  let className: string | undefined | null = null;

  export { className as class };
</script>

<div class={className}>
  <div class="flex flex-row gap-2 landscape:flex-col">
    <label class="form-control w-full portrait:flex-1">
      <div class="label">
        <span class="label-text">Tone</span>
      </div>
      <select
        class="select select-bordered"
        disabled={$state.state === "loading"}
        bind:value={$tone}
      >
        {#each tones as tone}
          <option>{tone}</option>
        {/each}
      </select>
    </label>

    <label class="form-control portrait:flex-1">
      <div class="label">
        <span class="label-text">Topic</span>
        <span class="label-text-alt"
          >{`${$topic?.length ?? 0}/${MAX_INPUT_CHARACTERS}`}</span
        >
      </div>
      <input
        bind:value={$topic}
        type="text"
        class="input input-bordered max-w-prose placeholder:opacity-60"
        disabled={$state.state === "loading"}
        maxlength={MAX_INPUT_CHARACTERS}
        placeholder="e.g. 'Dragon', 'Yellow', 'Tuesday', etc."
      />
    </label>
  </div>
  <button
    class="btn mt-4 w-full [@media(prefers-color-scheme:light)]:btn-secondary"
    on:click={fetchStory}
    disabled={$state.state === "loading"}>Submit</button
  >
</div>
