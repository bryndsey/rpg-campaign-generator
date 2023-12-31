<script lang="ts">
  import { fetchStory } from "./network/fetchStory";
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import { state, tone, topic } from "./stores/campaign";
  import { tones } from "./types/tones";

  let className: string | undefined | null = null;

  export { className as class };
</script>

<div class={className}>
  <div class="flex flex-row gap-2 md:flex-col">
    <label class="form-control w-full max-md:flex-1">
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

    <label class="form-control max-md:flex-1">
      <div class="label">
        <span class="label-text">Topic</span>
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
    class="btn mt-4 w-full"
    on:click={fetchStory}
    disabled={$state.state === "loading"}>Submit</button
  >
</div>
