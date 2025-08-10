#!/usr/bin/env node

/**
 * @Author: @memo28.repo
 * @Date: 2025-08-10 19:55:00
 * @LastEditTime: 2025-08-10 19:55:00
 * @Description: NPM 发布前检查脚本
 * @FilePath: /memo28.pro.Repo/packages/notification/scripts/pre-publish-check.js
 */

const fs = require('fs');
const path = require('path');

/**
 * 发布前检查类
 */
class PrePublishChecker {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.packageRoot = path.resolve(__dirname, '..');
    }

    /**
     * 检查文件是否存在
     * @param {string} filePath - 文件路径
     * @param {string} description - 文件描述
     * @param {boolean} required - 是否必需
     */
    checkFileExists(filePath, description, required = true) {
        const fullPath = path.join(this.packageRoot, filePath);
        const exists = fs.existsSync(fullPath);
        
        if (!exists) {
            const message = `❌ 缺少${description}: ${filePath}`;
            if (required) {
                this.errors.push(message);
            } else {
                this.warnings.push(message);
            }
        } else {
            console.log(`✅ ${description}: ${filePath}`);
        }
        
        return exists;
    }

    /**
     * 检查 package.json 配置
     */
    checkPackageJson() {
        console.log('\n📦 检查 package.json 配置...');
        
        const packageJsonPath = path.join(this.packageRoot, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            this.errors.push('❌ 缺少 package.json 文件');
            return;
        }
        
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // 检查必需字段
        const requiredFields = {
            'name': '包名',
            'version': '版本号',
            'description': '描述',
            'main': '主入口文件',
            'types': '类型定义文件',
            'author': '作者信息',
            'license': '许可证'
        };
        
        for (const [field, description] of Object.entries(requiredFields)) {
            if (!packageJson[field] || (typeof packageJson[field] === 'string' && packageJson[field].trim() === '')) {
                this.errors.push(`❌ package.json 缺少${description} (${field})`);
            } else {
                console.log(`✅ ${description}: ${JSON.stringify(packageJson[field])}`);
            }
        }
        
        // 检查关键词
        if (!packageJson.keywords || packageJson.keywords.length === 0) {
            this.warnings.push('⚠️  建议添加关键词 (keywords) 以提高包的可发现性');
        } else {
            console.log(`✅ 关键词: ${packageJson.keywords.join(', ')}`);
        }
        
        // 检查仓库信息
        if (!packageJson.repository) {
            this.warnings.push('⚠️  建议添加仓库信息 (repository)');
        } else {
            console.log(`✅ 仓库信息: ${packageJson.repository.url}`);
        }
    }

    /**
     * 检查构建产物
     */
    checkBuildArtifacts() {
        console.log('\n🔨 检查构建产物...');
        
        // 检查主要构建文件
        this.checkFileExists('lib/index.js', 'CommonJS 构建文件');
        this.checkFileExists('dist/index.js', 'ES Module 构建文件');
        this.checkFileExists('lib/index.d.ts', '类型定义文件', false);
        
        // 检查 dts 目录
        const dtsPath = path.join(this.packageRoot, 'dts');
        if (fs.existsSync(dtsPath)) {
            const dtsFiles = fs.readdirSync(dtsPath, { recursive: true });
            console.log(`✅ 类型定义文件: ${dtsFiles.length} 个文件`);
        }
    }

    /**
     * 检查文档文件
     */
    checkDocumentation() {
        console.log('\n📚 检查文档文件...');
        
        this.checkFileExists('README.md', 'README 文档');
        this.checkFileExists('LICENSE', '许可证文件');
        this.checkFileExists('CHANGELOG.md', '变更日志', false);
        
        // 检查 README 内容
        const readmePath = path.join(this.packageRoot, 'README.md');
        if (fs.existsSync(readmePath)) {
            const readmeContent = fs.readFileSync(readmePath, 'utf8');
            if (readmeContent.length < 500) {
                this.warnings.push('⚠️  README.md 内容较少，建议添加更详细的使用说明');
            }
            if (!readmeContent.includes('## 安装')) {
                this.warnings.push('⚠️  README.md 建议包含安装说明');
            }
            if (!readmeContent.includes('## 使用') && !readmeContent.includes('## 快速开始')) {
                this.warnings.push('⚠️  README.md 建议包含使用示例');
            }
        }
    }

    /**
     * 检查忽略文件
     */
    checkIgnoreFiles() {
        console.log('\n🚫 检查忽略文件...');
        
        this.checkFileExists('.npmignore', 'NPM 忽略文件', false);
        
        // 检查 .npmignore 内容
        const npmignorePath = path.join(this.packageRoot, '.npmignore');
        if (fs.existsSync(npmignorePath)) {
            const npmignoreContent = fs.readFileSync(npmignorePath, 'utf8');
            const commonIgnores = ['src/', '__test__/', '*.test.ts', 'tsconfig.json'];
            const missingIgnores = commonIgnores.filter(ignore => !npmignoreContent.includes(ignore));
            
            if (missingIgnores.length > 0) {
                this.warnings.push(`⚠️  .npmignore 建议忽略: ${missingIgnores.join(', ')}`);
            }
        }
    }

    /**
     * 检查测试覆盖
     */
    checkTests() {
        console.log('\n🧪 检查测试文件...');
        
        const testDir = path.join(this.packageRoot, '__test__');
        if (fs.existsSync(testDir)) {
            const testFiles = fs.readdirSync(testDir).filter(file => 
                file.endsWith('.test.ts') || file.endsWith('.test.js')
            );
            console.log(`✅ 测试文件: ${testFiles.length} 个`);
            testFiles.forEach(file => console.log(`   - ${file}`));
        } else {
            this.warnings.push('⚠️  建议添加测试文件');
        }
    }

    /**
     * 运行所有检查
     */
    async runAllChecks() {
        console.log('🚀 开始 NPM 发布前检查...\n');
        
        this.checkPackageJson();
        this.checkBuildArtifacts();
        this.checkDocumentation();
        this.checkIgnoreFiles();
        this.checkTests();
        
        // 输出结果
        console.log('\n📊 检查结果:');
        
        if (this.errors.length > 0) {
            console.log('\n❌ 发现错误:');
            this.errors.forEach(error => console.log(`  ${error}`));
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️  警告信息:');
            this.warnings.forEach(warning => console.log(`  ${warning}`));
        }
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('\n🎉 所有检查通过！包已准备好发布。');
        } else if (this.errors.length === 0) {
            console.log('\n✅ 基本检查通过，建议处理警告信息后发布。');
        } else {
            console.log('\n❌ 发现错误，请修复后再发布。');
            process.exit(1);
        }
        
        // 发布指令提示
        if (this.errors.length === 0) {
            console.log('\n📦 发布指令:');
            console.log('  npm publish');
            console.log('  # 或者');
            console.log('  pnpm publish');
        }
    }
}

// 运行检查
if (require.main === module) {
    const checker = new PrePublishChecker();
    checker.runAllChecks().catch(console.error);
}

module.exports = PrePublishChecker;