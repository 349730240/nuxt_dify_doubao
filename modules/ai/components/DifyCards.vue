<script setup lang="ts">
import { useUser } from "@/modules/saas/auth/composables/useUser";
import { useToast } from "@/modules/ui/components/toast/use-toast";
import aiConfig, { type DifyAppConfig } from "@/config/ai/index";

const { user } = useUser();
const { toast } = useToast();

const difyApps = Object.values(aiConfig.apps);

const handleClick = (difyApp: DifyAppConfig) => {
  if (!user.value) {
    toast({
      title: "请先登录",
      description: "登录后才能使用AI助手哦~",
      duration: 2000,
    });
    navigateTo("/auth/signin");
  } else {
    window.open(difyApp.path, "_blank");
  }
};
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6 mt-8">
    <Card
      class="flex h-full hover:border-primary transition-colors cursor-pointer"
      v-for="app in difyApps"
      :key="app.path"
      @click="handleClick(app)"
    >
      <div class="flex gap-4 p-6">
        <div
          :class="`h-16 w-16 rounded-xl flex items-center justify-center text-3xl`"
          :style="{ backgroundColor: app.iconBgColor }"
        >
          {{ app.icon }}
        </div>

        <div class="flex flex-col flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-medium text-lg">{{ app.name }}</h3>
            <Badge variant="secondary" class="text-xs">{{
              app.typeName
            }}</Badge>
            <Badge
              v-for="tag in app?.tags"
              :key="tag"
              variant="secondary"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
          <p class="text-sm text-muted-foreground mt-2">
            {{ app.description }}
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>
