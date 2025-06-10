<template>
  <div class="w-full p-4 h-full flex flex-col">
    <div class="flex items-center mb-6">
      <div class="flex items-center gap-2">
        <div
          :class="`h-12 w-12 rounded-xl flex items-center justify-center text-2xl`"
          :style="{ backgroundColor: currentApp?.iconBgColor }"
        >
          {{ currentApp?.icon }}
        </div>
        <h1 class="text-xl font-semibold">
          {{ currentApp?.name || "文本生成型应用" }}
        </h1>
      </div>
      <div class="ml-auto md:hidden">
        <Button
          class="text-primary active:text-primary hover:text-primary"
          size="sm"
          variant="outline"
          @click="openDrawer"
        >
          <LucideSparkle />
          AI 智能书写
        </Button>
      </div>
    </div>

    <Tabs
      class="w-full flex flex-col flex-grow overflow-y-hidden"
      v-model="activeTab"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="run">运行</TabsTrigger>
        <TabsTrigger value="saved"
          >已保存
          <Button
            class="px-2 rounded-md"
            v-if="completionSavedList.length"
            variant="outline"
            size="sm"
            >{{ completionSavedList.length }}</Button
          >
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="run"
        v-if="activeTab === 'run'"
        class="flex flex-col justify-between flex-grow overflow-y-auto"
      >
        <Card>
          <CardContent class="space-y-6 pt-6">
            <div v-if="isLoadingApp">
              <div class="space-y-4">
                <Skeleton class="h-4 w-1/4 mb-2" />
                <Skeleton class="h-10" />
                <Skeleton class="h-4 w-1/4 mb-2" />
                <Skeleton class="h-10" />
                <Skeleton class="h-4 w-1/4 mb-2" />
                <Skeleton class="h-10" />
              </div>
            </div>
            <template v-else-if="userInputFormList.length > 0">
              <DifyForm layout="vertical" />
            </template>

            <!-- dify文本生成类应用采用视觉时 -->
            <template v-if="type === 'completion' && enableFileUpload">
              <DifyFileInput
                v-if="appParameters?.file_upload"
                :input="fileUploadInput"
                layout="vertical"
              />
            </template>
            <div class="flex justify-between gap-4">
              <Button variant="outline" @click="clearForm">清空</Button>
              <Button @click="runGeneration" :disabled="isLoadingMessage">
                <LucideLoader2
                  v-if="isLoadingMessage"
                  class="h-4 w-4 animate-spin"
                />
                <LucidePlay v-else class="h-4 w-4" />
                {{ isLoadingMessage ? "生成中..." : "运行" }}
              </Button>
            </div>
          </CardContent>
        </Card>

        <ChatUserTokenBar />
      </TabsContent>

      <TabsContent
        class="flex-grow overflow-y-auto"
        value="saved"
        v-if="activeTab === 'saved'"
      >
        <CompletionSaved @switchToRun="handleSwitchToRun" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useDifyChatStore } from "@/stores/dify-chat";
import { computed } from "vue";
import type { FileInput } from "@/modules/ai/types/dify.type";

const difyChatStore = useDifyChatStore();
const {
  currentApp,
  appParameters,
  isLoadingMessage,
  userInputs,
  isLoadingApp,
  completionSavedList,
  type,
  enableFileUpload,
} = storeToRefs(difyChatStore);

const activeTab = ref("run");
const emit = defineEmits(["openDrawer"]);

const fileUploadInput = computed(() => {
  const file_upload = appParameters.value?.file_upload;
  const image = file_upload?.image;

  return {
    label: image?.enabled ? "上传图片" : "上传文件",
    type: "file" as const,
    variable: "file_upload",
    required: false,
    max_length: file_upload?.number_limits || 1,
    allowed_file_types: file_upload?.allowed_file_types || [],
    allowed_file_extensions: file_upload?.allowed_file_extensions || [],
    allowed_file_upload_methods: file_upload?.allowed_file_upload_methods || [],
  } as FileInput;
});

const userInputFormList = computed(() => {
  const list: any[] = [];
  (appParameters.value?.user_input_form || []).forEach((field) => {
    Object.entries(field).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        value.type = value.type || key;
        list.push(value);
      }
    });
  });
  return list;
});

function clearForm() {
  userInputs.value = {};
}

function runGeneration() {
  if (type.value === "workflow") {
    difyChatStore.startWorkflow();
  } else {
    difyChatStore.startTextGeneration();
  }
}

function handleSwitchToRun() {
  activeTab.value = "run";
}

function openDrawer() {
  emit("openDrawer");
}
</script>
