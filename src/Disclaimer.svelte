<script lang="ts">
  import { appName } from "./constants";
  import { Info } from "lucide-svelte";

  let dialogElement: HTMLDialogElement;
</script>

<button
  class="btn btn-circle btn-ghost btn-sm opacity-70 hover:opacity-100"
  aria-label="info"
  on:click={() => dialogElement.showModal()}
>
  <Info size={"1.25em"} />
</button>
<dialog id="my_modal_3" class="modal" bind:this={dialogElement}>
  <div class="modal-box">
    <form method="dialog">
      <button
        class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
        aria-label="Close"
      >
        ✕
      </button>
    </form>
    <h3 class="text-lg font-bold">Disclaimer</h3>
    <p class="py-4">
      {`${appName} is meant to be used merely as a source of
      inspriation, and makes no copyright claims or warranties on the content
      generated. The content may not be original or appropriate. Use at your own
      risk, and please use responsibly.`}
    </p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>
