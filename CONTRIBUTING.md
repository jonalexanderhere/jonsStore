# Contributing Guide - Modern E-Commerce Website

Panduan untuk berkontribusi dalam pengembangan website e-commerce modern.

## 🤝 How to Contribute

### 1. Fork Repository
1. Fork repository ini ke GitHub account Anda
2. Clone repository yang sudah di-fork:
```bash
git clone https://github.com/yourusername/modern-ecommerce.git
cd modern-ecommerce
```

### 2. Setup Development Environment
1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp env.example .env.local
# Edit .env.local dengan konfigurasi Anda
```

3. Run development server:
```bash
npm run dev
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b bugfix/your-bugfix-name
```

### 4. Make Changes
- Buat perubahan sesuai dengan issue atau feature request
- Ikuti coding standards yang sudah ditetapkan
- Tulis test untuk fitur baru
- Update dokumentasi jika diperlukan

### 5. Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
# atau
git commit -m "fix: resolve bug in checkout process"
```

### 6. Push Changes
```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request
1. Buka GitHub repository
2. Klik "New Pull Request"
3. Pilih branch yang akan di-merge
4. Isi deskripsi perubahan
5. Assign reviewer
6. Submit pull request

## 📋 Coding Standards

### 1. TypeScript
- Gunakan TypeScript untuk semua file
- Definisikan interface untuk semua data structure
- Gunakan type assertion dengan hati-hati
- Hindari `any` type

### 2. React/Next.js
- Gunakan functional components
- Gunakan hooks untuk state management
- Gunakan TypeScript untuk props
- Ikuti Next.js best practices

### 3. Styling
- Gunakan Tailwind CSS untuk styling
- Buat reusable components
- Gunakan CSS modules untuk complex styling
- Ikuti design system yang sudah ada

### 4. Code Organization
- Pisahkan logic dan UI components
- Gunakan custom hooks untuk reusable logic
- Organisir file berdasarkan feature
- Gunakan barrel exports

### 5. Naming Conventions
- Gunakan PascalCase untuk components
- Gunakan camelCase untuk functions dan variables
- Gunakan kebab-case untuk file names
- Gunakan UPPER_CASE untuk constants

## 🧪 Testing

### 1. Unit Tests
```bash
npm run test
```

### 2. Integration Tests
```bash
npm run test:integration
```

### 3. E2E Tests
```bash
npm run test:e2e
```

### 4. Test Coverage
```bash
npm run test:coverage
```

## 📝 Documentation

### 1. Code Documentation
- Tulis JSDoc untuk functions
- Tulis README untuk complex components
- Update type definitions
- Dokumentasikan API endpoints

### 2. User Documentation
- Update README.md
- Update SETUP.md
- Update FEATURES.md
- Update DEPLOYMENT.md

### 3. API Documentation
- Dokumentasikan semua API endpoints
- Tulis contoh request/response
- Dokumentasikan error codes
- Update OpenAPI specification

## 🐛 Bug Reports

### 1. Before Reporting
- Cek apakah bug sudah dilaporkan
- Coba reproduce bug
- Cek versi terbaru
- Cek environment setup

### 2. Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other context about the problem
```

## ✨ Feature Requests

### 1. Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like this feature to work?

## Alternatives Considered
What other solutions have you considered?

## Additional Context
Any other context about the feature request
```

## 🔄 Pull Request Process

### 1. Before Submitting
- [ ] Code follows coding standards
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Cross-browser compatibility tested

### 2. Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows coding standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### 3. Review Process
1. Code review oleh maintainer
2. Automated tests harus pass
3. Manual testing oleh reviewer
4. Approval dari maintainer
5. Merge ke main branch

## 🏷️ Issue Labels

### Bug Labels
- `bug` - Bug report
- `critical` - Critical bug
- `high` - High priority bug
- `medium` - Medium priority bug
- `low` - Low priority bug

### Feature Labels
- `enhancement` - Feature request
- `new-feature` - New feature
- `improvement` - Improvement to existing feature
- `ui/ux` - UI/UX related
- `backend` - Backend related
- `frontend` - Frontend related

### Other Labels
- `documentation` - Documentation
- `question` - Question
- `help-wanted` - Help wanted
- `good-first-issue` - Good first issue
- `duplicate` - Duplicate issue
- `invalid` - Invalid issue
- `wontfix` - Won't fix

## 🚀 Release Process

### 1. Version Numbering
- `MAJOR` - Breaking changes
- `MINOR` - New features
- `PATCH` - Bug fixes

### 2. Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes written
- [ ] Tagged release

### 3. Release Notes
- List of new features
- List of bug fixes
- List of breaking changes
- Migration guide if needed

## 🤔 Questions?

### 1. Getting Help
- Check existing issues
- Check documentation
- Ask in discussions
- Contact maintainers

### 2. Community
- GitHub Discussions
- Discord server
- Email support
- Stack Overflow

## 📜 Code of Conduct

### 1. Our Pledge
- Be respectful
- Be inclusive
- Be collaborative
- Be constructive

### 2. Expected Behavior
- Use welcoming language
- Respect different viewpoints
- Accept constructive criticism
- Focus on what's best for community

### 3. Unacceptable Behavior
- Harassment
- Trolling
- Insulting comments
- Personal attacks

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors akan diakui dalam:
- README.md
- Release notes
- Contributor hall of fame
- Special mentions

---

**Terima kasih telah berkontribusi! 🎉**




