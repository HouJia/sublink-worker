# 修改日志

| 项目 | 内容 |
|---|---|
| **创建时间** | 2026-06-27 |
| **最后更新** | 2026-06-28 |

## 更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-06-28 | 初稿追加 |

## 变更记录

| 日期 | scope | 摘要 | 主要路径 | 远程执行 |
|---|---|---|---|---|
| 2026-06-27 | feat | BASE_PATH 子路径 `/sublink/`、NPM 58087 部署、修复 runtimeConfig 丢失 basePath | `src/runtime/`、`fork/`、`docs/` | 是 |
| 2026-06-27 | fix | PUBLIC_ORIGIN 前端注入；NPM Docker 内网 proxy_pass；维护文档与回顾 | `src/components/`、`docs/`、`fork/docs/` | 是 |
| 2026-06-27 | feat | LAN_SERVICE_BASE 规则区展示；撤销 PUBLIC_ORIGIN 覆盖；NPM 恢复 58087 | `src/components/`、`docs/` | 是 |
| 2026-06-28 | fix | 内网 URL 移至 Subconverter 模块底部；NPM 公网改 Docker 内网；文档迁出至本项目 | `src/components/`、`docs/` | 是 |
| 2026-06-28 | fix | QNAP 根因：worker 仅 sublink-net 致 NPM hairpin 58087 超时；compose 改默认 bridge | `fork/docker/`、`fork/docs/`、`docs/` | 是 |
