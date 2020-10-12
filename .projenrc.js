const {
  AwsCdkConstructLibrary,
  FileBase,
  NodePackageManager,
} = require('projen');

class ReadOnlyFile extends FileBase {
  constructor(project, filePath, options) {
    super(project, filePath, { ...options, readonly: true });
    this.data = options.data;
  }

  synthesizeContent() {
    return this.data;
  }
}

const project = new AwsCdkConstructLibrary({
  packageManager: NodePackageManager.NPM,
  authorAddress: 'jordan5sinko@gmail.com',
  authorName: 'Jordan Sinko',
  cdkVersion: '1.67.0',
  name: '@JordanSinko/the-typescript-lambda',
  repository: 'https://github.com/jordan5sinko/the-typescript-lambda.git',
  minNodeVersion: '12',
  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-lambda'],
  cdkTestDependencies: ['@aws-cdk/assert'],
  devDependencies: {
    prettier: '^2.1.2',
    husky: '^4.3.0',
    commitlint: '^11.0.0',
    'pretty-quick': '^3.0.2',
    'npm-run-all': '^4.1.5',
  },
  npmRegistry: 'npm.pkg.github.com',
  eslint: false,
  antitamper: false,
  releaseToNpm: true,
});

project.addFields({
  prettier: {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    semi: true,
  },
  husky: {
    hooks: {
      'pre-commit': 'run-s format',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
  },
  commitlint: {
    extends: ['@commitlint/config-conventional'],
  },
});

new ReadOnlyFile(project, '.prettierignore', {
  data: `.github
package.json
package-lock.json
API.md
`,
});

project.addScript('format', 'pretty-quick --staged');
project.synth();
