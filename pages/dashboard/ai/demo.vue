<script setup lang="ts">
import DifyCards from "@/modules/ai/components/DifyCards.vue";

definePageMeta({
  layout: "saas-dashboard",
});

useHead({
  title: "AI应用",
});
</script>

<template>
  <div class="container py-8">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold tracking-tight text-foreground">
        AI + Dify 应用演示
      </h2>
      <p class="text-sm text-muted-foreground">Dify + Chatbox应用示例</p>
      <DifyCards />
    </div>
  </div>
</template>
