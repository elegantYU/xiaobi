/**
 * @source: https://github.com/conventional-changelog/commitlint
 *
 * build: webpack相关
 * ci: 持续集成
 * chore: 构建过程或辅助工具
 * feat: 新功能
 * docs: 文档
 * fix: 修复
 * perf: 优化
 * refactor: 重构
 * style: 样式
 * notes: 注释
 */

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['build', 'ci', 'chore', 'feat', 'docs', 'fix', 'perf', 'refactor', 'style', 'notes', 'wip'],
		],
	},
};
