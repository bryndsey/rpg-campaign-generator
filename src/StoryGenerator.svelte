<script lang="ts">
  import OutputDisplay from "./OutputDisplay.svelte";

  import InputControls from "./InputControls.svelte";

  import Footer from "./Footer.svelte";
</script>

<div class="m-auto flex h-dvh max-h-dvh flex-col overflow-y-clip px-4 md:px-8">
  <header class="my-4">
    <h1 class="text-lg md:text-2xl">RPG Campaign Generator</h1>
  </header>
  <main class="flex flex-1 flex-col gap-4 overflow-y-clip md:flex-row">
    <div class="flex flex-1 place-items-stretch">
      <OutputDisplay></OutputDisplay>
    </div>
    <InputControls class="w-full md:max-w-xs" />
  </main>
  <Footer></Footer>
</div>
