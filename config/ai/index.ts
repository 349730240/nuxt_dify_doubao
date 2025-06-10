const aiConfig: AiConfig = {
  enable: true,
  apps: {
    // 应用1： 前端面试（请自行修改）
    interview: {
      id: "interview",
      name: "前端面试",
      description:
        "一个模拟的前端面试官，通过提问的方式对前端开发的技能水平进行检验。",
      icon: "👨‍💻‍",
      iconBgColor: "#e0f2fe",
      type: "chat",
      typeName: "聊天助手",
      path: "/ai/chat/interview",
      apikey: "DIFY_API_KEY_APP_INTERVIEW",
    },
    // 应用2： 翻译专家
    translator: {
      id: "translator",
      name: "中英文互译",
      description: "翻译专家：提供中英文互译",
      icon: "🗣️",
      iconBgColor: "#f5f5f4",
      type: "chat",
      typeName: "聊天助手",
      path: "/ai/chat/translator",
      apikey: "DIFY_API_KEY_APP_TRANSLATOR",
    },
    // 应用3： 代码解释器
    ["code-interpreter"]: {
      id: "code-interpreter",
      name: "代码解释器",
      description: "我希望您能够充当代码解释器，澄清代码的语法和语义。",
      icon: "👁️‍🗨️",
      iconBgColor: "#f5f5f4",
      type: "chat",
      typeName: "聊天助手",
      tags: ["markdwon渲染"],
      path: "/ai/chat/code-interpreter",
      apikey: "DIFY_API_KEY_APP_CODE_INTERPRETER",
    },
    // 应用4： 图片解释器
    ["image-interpreter"]: {
      id: "image-interpreter",
      name: "解释图片",
      description:
        "我希望您能够充当解释图片，利用qwen-vl-max模型，分析和解释图片中的内容。",
      icon: "🖼",
      iconBgColor: "#f5f5f4",
      type: "chat",
      typeName: "聊天助手",
      tags: ["支持图片上传"],
      path: "/ai/chat/image-interpreter",
      apikey: "DIFY_API_KEY_APP_IMAGE_INTERPRETER",
    },
    // 应用5： PDF聊天
    ["pdf-chat"]: {
      id: "pdf-chat",
      name: "PDF工作流（对话框上传）",
      description: "PDF上传聊天工作流",
      icon: "💾",
      iconBgColor: "#f5f5f4",
      type: "chat",
      typeName: "工作流编排对话型应用",
      tags: ["PDF对话框上传"],
      path: "/ai/chat/pdf-chat",
      apikey: "DIFY_API_KEY_APP_PDF_CHAT",
    },
    // 应用6： ChatPaper
    ["pdf-paper-input"]: {
      id: "pdf-paper-input",
      name: "PDF工作流（前置上传）",
      description: "PDF上传聊天工作流(前置上传)",
      icon: "📃",
      iconBgColor: "#f5f5f4",
      type: "chat",
      typeName: "工作流编排对话型应用",
      tags: ["PDF前置上传"],
      path: "/ai/chat/pdf-paper-input",
      apikey: "DIFY_API_KEY_APP_PDF_PAPER_INPUT",
    },
    // 应用7： 文献综述写作（文本生成类）
    ["literature-review"]: {
      id: "literature-review",
      name: "文献综述写作",
      description:
        "文献综述写作类应用，左侧面板用户输入关键字，右侧面板AI生成写作内容",
      icon: "📋",
      iconBgColor: "#f5f5f4",
      type: "completion",
      typeName: "文本生成类",
      tags: ["文本生成型应用API"],
      path: "/ai/completion/literature-review",
      apikey: "DIFY_API_KEY_APP_LITERATURE_REVIEW",
    },
    // 应用8：SEO文章生成专家
    ["seo-article-generator"]: {
      id: "seo-article-generator",
      name: "SEO文章生成专家",
      description: "SEO文章生成专家",
      icon: "🖋",
      iconBgColor: "#f5f5f4",
      type: "completion",
      typeName: "文本生成类",
      tags: ["文本生成型应用API"],
      path: "/ai/completion/seo-article-generator",
      apikey: "DIFY_API_KEY_APP_SEO_ARTICLE_GENERATOR",
    },
    // 应用9： 书籍翻译
    ["book-translator"]: {
      id: "book-translator",
      name: "全书翻译",
      description:
        "书籍翻译类应用，左侧面板用户输入书籍名称，右侧面板AI生成翻译内容",
      icon: "📚",
      iconBgColor: "#f5f5f4",
      type: "workflow",
      typeName: "工作流",
      tags: ["工作流API"],
      path: "/ai/workflow/book-translator",
      apikey: "DIFY_API_KEY_APP_BOOK_TRANSLATOR",
    },
    // 应用10： 文本情感分析工作流
    ["text-sentiment-analysis"]: {
      id: "text-sentiment-analysis",
      name: "文本情感分析工作流",
      description: "文本情感分析工作流",
      icon: "💖",
      iconBgColor: "#FFE4E8",
      type: "workflow",
      typeName: "工作流",
      tags: ["工作流API"],
      path: "/ai/workflow/text-sentiment-analysis",
      apikey: "DIFY_API_KEY_APP_TEXT_SENTIMENT_ANALYSIS",
    },
  },
};

interface AiConfig {
  enable: boolean;
  apps: {
    [key: string]: DifyAppConfig;
  };
}

export type AppKey = keyof typeof aiConfig.apps;

export interface DifyAppConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBgColor: string;
  type: string;
  typeName: string;
  path: string;
  tags?: string[];
  apikey: string;
}

export default aiConfig;
