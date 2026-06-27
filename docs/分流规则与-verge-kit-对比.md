# 分流规则：妙妙屋 / Sublink / Verge Kit 对比

| 项目 | 内容 |
|---|---|
| **创建时间** | 2026-06-28 |
| **最后更新** | 2026-06-28 |

## 更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-06-28 | 初稿：三工具定位与统一建议 |

## 1. 三者定位

| 维度 | **Verge Kit** | **Sublink** | **妙妙屋** |
|---|---|---|---|
| 真值形态 | `derive/parts/*.ini` → **完整 subconverter INI** | `rules.js` **GeoSite 类别** | 同源类别 + V3 模板 + 远程 ini URL |
| 维护入口 | `verge/derive/parts/rulesets/` | `src/config/rules.js` | 管理后台 / `rule_templates/` |
| 产出 | `houjia.local-template.ini` → gist | Clash YAML、**/subconverter ini 片段** | 每用户 Clash 订阅 |
| 多用户 | 否（个人规则稿） | 否 | **是** |
| 复杂策略组 | **最强**（filter 正则、底座组） | 中等（预设套餐） | 中等～强（模板模式可引 ini） |
| 典型场景 | Verge / subapi **全量 houjia 规则** | 单人 **B/C 轻量套餐** | 家庭 **多人各拿不同规则** |

## 2. 能否「统一」？

**不能指望三处实时互相同步**，因为运行时模型不同：

- Verge kit：**subconverter INI 语法**（`custom_proxy_group`、`ruleset=`）
- Sublink/妙妙屋类别：**GeoSite 勾选 → 内置 Clash rule-providers**

可选关系：

```text
Verge Kit（真值 INI）
    ↓ gist houjia.local-template.ini
subapi /sub?config=...          ← 全量订阅（推荐主链）

Sublink / 妙妙屋（类别视图）
    ↓ 可选 /subconverter 导出 ini 片段
    供 subapi 当外部 config（轻量套餐，非完整 houjia 规则）
```

## 3. 推荐分工（理由）

| 用途 | 用谁 | 理由 |
|---|---|---|
| **成熟全量分流**（Verge、OpenClash 主订阅） | **Verge Kit → subapi** | 已有 derive 流水线、gist、pytest；策略组最完整 |
| **快速试套餐**（仅 Google+AI 等） | **Sublink** | 勾选即得，无多用户负担 |
| **家人各不同规则/多订阅文件** | **妙妙屋** | 多用户、探针、订阅文件管理 |
| **从 Sublink 规则反推 Verge** | 人工对照迁移 | 无可靠自动转换；类别名 ≠ ini 策略组 |
| **从 Verge 同步到 Sublink 勾选** | 长期可选脚本 | 仅单向 diff 提示，仍须人工审 |

## 4. 与 subapi 的边界

- **SubConverter-Extended + sub-web** 是 **节点合并 + INI 模板** 的执行层，不是第四种规则编辑器。
- Sublink 的 `/subconverter` 产出的是 **外部 config URL 对应的 ini 文本**，可给 subapi 用，但**不能替代** `houjia.local-template.ini` 的全量策略。

## 5. 交叉引用

| 文档 | 路径 |
|---|---|
| Verge Kit | `clash-verge-split-kit/verge/README.md` |
| Sublink 维护 | `sublink-worker/docs/维护指南.md` |
| 妙妙屋维护 | `miaomiaowu/docs/维护指南.md` |
| sub-web 默认 config | `sub-web/src/config/remote-configs.js` → `houjia.local-template.ini` |
