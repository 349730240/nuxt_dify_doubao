<template>
  <div class="w-full h-full bg-white rounded-lg border flex flex-col">
    <!-- Empty State -->
    <div
      v-if="isShowEmptyState"
      class="flex-1 flex items-center justify-center text-gray-500"
    >
      <div class="text-center">
        <div class="mb-4">
          <LucideSparkles
            :size="48"
            :class="[
              'mx-auto',
              isLoadingMessage
                ? 'animate-pulse text-primary/50'
                : 'text-primary/50',
            ]"
          />
        </div>
        <p>{{ isLoadingMessage ? "生成中...." : "AI会在这里给你惊喜。" }}</p>
      </div>
    </div>

    <!-- Content State -->
    <div v-else class="flex-1 flex flex-col p-6 overflow-hidden">
      <!-- Workflow Nodes -->
      <ChatWorkflow v-if="type === 'workflow'" :nodes="workflowNodes" />

      <!-- Markdown Content -->
      <div class="flex-1 overflow-auto mb-6">
        <MarkdownRender :content="contentToShow || ''" is-bot-message />
      </div>

      <!-- Action Bar -->
      <div class="flex items-center justify-between border-t pt-4 mt-auto">
        <div class="text-sm text-gray-500">{{ wordCount }} 个字符</div>
        <div class="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            class="gap-2"
            @click="copyContent"
          >
            <LucideCopy />
            复制
          </Button>
          <Button
            variant="outline"
            size="sm"
            class="gap-2"
            @click="saveContent"
            :disabled="isSaving"
          >
            <LucideLoader2 v-if="isSaving" class="h-4 w-4 animate-spin" />
            <LucideBookmark v-else />
            {{ isSaving ? "保存中..." : "保存" }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDifyChatStore } from "@/stores/dify-chat";
import { useToast } from "@/modules/ui/components/toast/use-toast";
import ChatWorkflow from "@/modules/ai/components/chat/ChatWorkflow.vue";

const difyChatStore = useDifyChatStore();
const {
  generatedContent,
  workflowContent,
  workflowNodes,
  isLoadingMessage,
  type,
} = storeToRefs(difyChatStore);
const { toast } = useToast();
const isSaving = ref(false);

const isWorkflow = computed(() => {
  return type.value === "workflow";
});

const isCompletion = computed(() => {
  return type.value === "completion";
});

const isShowEmptyState = computed(() => {
  if (isCompletion.value) {
    return !generatedContent.value;
  }
  if (isWorkflow.value) {
    // 使用 workflowContent 判断是否为空
    return !workflowNodes.value.length && !workflowContent.value;
  }
  return true;
});

// 简化内容显示逻辑
const contentToShow = computed((): string => {
  if (isWorkflow.value) {
    return workflowContent.value || '';
  }
  return generatedContent.value || '';
});

const wordCount = computed(() => {
  if (!contentToShow.value) return 0;
  return contentToShow.value.length;
});

async function copyContent() {
  if (!contentToShow.value) return;
  try {
    await navigator.clipboard.writeText(contentToShow.value);
    toast({
      title: "复制成功",
      description: "内容已复制",
      variant: "success",
      duration: 2000,
    });
  } catch (error) {
    toast({
      title: "复制失败",
      description: "无法复制内容",
      variant: "destructive",
      duration: 2000,
    });
  }
}

async function saveContent() {
  if (!contentToShow.value || isSaving.value) return;
  isSaving.value = true;
  try {
    await difyChatStore.saveCompletionContent();
  } finally {
    isSaving.value = false;
  }
}
</script>
