<script lang="ts">
  import { fetchStory } from "./network/fetchStory";
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import { setting, state, tone, topic } from "./stores/campaign";
  import { settings } from "./types/settings";
  import { tones } from "./types/tones";
</script>

<div class="flex h-full flex-col gap-2 overflow-clip landscape:md:gap-4">
  <div
    class="card card-compact overflow-y-auto border-2 border-base-content/5 landscape:flex-1"
  >
    <form id="settings" class="card-body">
      <h2 class="font-semibold landscape:text-lg">
        Customize <span class="text-xs font-normal opacity-80">(optional)</span>
      </h2>
      <div
        class="flex flex-row gap-2 portrait:flex-wrap landscape:flex-col landscape:md:gap-4"
      >
        <label class="form-control w-full portrait:flex-1">
          <div class="label">
            <span class="label-text text-xs md:text-sm">Tone</span>
          </div>
          <select
            class="select select-bordered select-sm landscape:md:select-md"
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
            <span class="label-text text-xs md:text-sm">Setting</span>
          </div>
          <select
            class="select select-bordered select-sm landscape:md:select-md"
            disabled={$state.state === "loading"}
            bind:value={$setting}
          >
            {#each settings as setting}
              <option>{setting}</option>
            {/each}
          </select>
        </label>

        <label class="form-control portrait:flex-1">
          <div class="label">
            <span class="label-text text-xs md:text-sm">Topic</span>
            <span class="label-text-alt text-xs md:text-sm"
              >{`${$topic?.length ?? 0}/${MAX_INPUT_CHARACTERS}`}</span
            >
          </div>
          <input
            bind:value={$topic}
            type="text"
            class="input input-bordered select-sm max-w-prose landscape:md:select-md placeholder:opacity-60"
            disabled={$state.state === "loading"}
            maxlength={MAX_INPUT_CHARACTERS}
            placeholder="Enter a word or phrase"
          />
        </label>
      </div>
    </form>
  </div>
  <button
    type="submit"
    form="settings"
    class="btn btn-secondary w-full"
    on:click={fetchStory}
    disabled={$state.state === "loading"}>Generate</button
  >
</div>
