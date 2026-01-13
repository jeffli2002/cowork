# 无需 API 的静态内容方案

## 概述

这个项目现在支持两种模式：
1. **动态模式**（默认）：使用 Gemini API 实时生成内容
2. **静态模式**：使用预定义的静态内容，无需任何 API

## 切换到静态模式

### 方法 1：修改导入（推荐）

编辑 `App.tsx` 文件，将第 7 行：

```typescript
import { fetchSectionContent, searchDocumentation } from './services/geminiService';
```

改为：

```typescript
import { fetchSectionContent, searchDocumentation } from './services/staticContentService';
```

### 方法 2：使用环境变量控制

可以创建一个配置来动态选择服务：

```typescript
// 在 App.tsx 中
const USE_STATIC_CONTENT = import.meta.env.VITE_USE_STATIC_CONTENT === 'true';

const { fetchSectionContent, searchDocumentation } = USE_STATIC_CONTENT
  ? await import('./services/staticContentService')
  : await import('./services/geminiService');
```

## 静态内容的优势

✅ **无需 API Key** - 完全免费运行  
✅ **加载速度快** - 无需等待 API 响应  
✅ **离线可用** - 不依赖网络连接  
✅ **内容可控** - 完全控制显示的内容  
✅ **无成本** - 没有 API 调用费用  

## 自定义静态内容

编辑 `services/staticContentService.ts` 文件，修改 `STATIC_CONTENT` 对象中的内容：

```typescript
const STATIC_CONTENT: Record<SectionKey, { content: string; sources: Array<...> }> = {
  introduction: {
    content: `你的 Markdown 内容...`,
    sources: [
      { title: '视频标题', uri: 'https://youtube.com/watch?v=...' }
    ]
  },
  // ... 其他章节
};
```

## 添加 YouTube 视频

在 `sources` 数组中添加视频链接：

```typescript
sources: [
  {
    title: 'Claude Cowork 介绍视频',
    uri: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
  }
]
```

## 搜索功能

静态模式使用简单的文本匹配搜索，在 `staticContentService.ts` 的 `searchDocumentation` 函数中实现。

## 注意事项

- 静态内容需要手动维护和更新
- 搜索功能比 AI 搜索简单，但速度更快
- 如果需要动态内容，可以随时切换回 `geminiService.ts`

