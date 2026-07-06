# CJF 个人主页

这是一个可部署到 GitHub Pages 的 React + Vite 个人主页项目，主题为浅色科技风、未来感和中英双语个人作品集。

## 项目结构

```text
my-github-homepage/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/profile.js
│   ├── components/
│   ├── styles/index.css
│   └── utils/animations.js
└── public/
    ├── resume/Blank_Resume.docx
    └── assets/
        ├── avatar.png
        ├── honors/
        ├── team/
        ├── social/
        └── projects/
```

## 安装和运行

```bash
npm install
npm run dev
npm run build
npm run preview
```

本地开发地址默认是 `http://127.0.0.1:5173`，preview 地址默认是 `http://localhost:4173/`。

## GitHub Pages 部署

1. 如果部署到 `saioppuykakapuy.github.io` 用户主页仓库，保持 `vite.config.js` 中 `base` 为 `/`。
2. 如果部署到普通项目仓库，在构建前设置环境变量，例如 `GITHUB_PAGES_BASE=/my-github-homepage/`。
3. 执行 `npm run build`。
4. 将 `dist` 目录作为 GitHub Pages 的发布内容，或使用 GitHub Actions 部署静态站点。

## 联系方式匿名化

当前公开联系方式已匿名化：

- Email: `xxx`
- Phone: `xxx`

GitHub 链接保留为 `https://github.com/saioppuykakapuy`。

## 下载简历

下载简历按钮当前指向空白 Word 文档：

```text
public/resume/Blank_Resume.docx
```

部署后访问路径为：

```text
https://saioppuykakapuy.github.io/resume/Blank_Resume.docx
```

请将需要公开下载的空白 Word 文档放置到：

```text
public/resume/Blank_Resume.docx
```

## 替换资源

- 头像：替换 `public/assets/avatar.png`。
- 荣誉图片：放入 `public/assets/honors/honor-01.jpg` 等文件。
- 团队图片：放入 `public/assets/team/team-01.jpg` 等文件。
- 社交平台图片：放入 `public/assets/social/social-01.jpg` 等文件。
- 项目图片：放入 `public/assets/projects/project-placeholder-01.png` 等文件。

如果图片暂时不存在，页面会自动显示科技风占位卡片。

## 修改个人信息

主要个人信息、联系方式、简介、教育背景、技能、荣誉、荣誉图片墙和中英文文案都集中在 `src/data/profile.js`，后期优先修改这个文件。

## 注意事项

- 外部链接已使用 `target="_blank"` 和 `rel="noopener noreferrer"`。
- Email 和 Phone 当前仅显示 `xxx`，不会触发邮件或拨号。
- 页面默认中文，可在右上角切换英文。
- 页面默认浅色科技风，也支持深色主题切换。
