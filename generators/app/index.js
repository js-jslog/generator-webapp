const Generator = require('yeoman-generator');
const DotfilesGenerator = require.resolve('generator-dotfiles/generators/app');
const augmentPackageJson = require('generator-dotfiles/utilities/augmentPackageJson');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      // If dotfiles are reintroduced
      // then repeat this section with '.*'
      this.templatePath('**/*'),
      this.destinationRoot()
    );
  };
  decoratePackageJsonBeforeInstall() {
    const packageJsonAugmentation = {
      name: 'webpack',
      description: 'A basic webpack project served with hot module reloading',
      scripts: {
        start: 'webpack-dev-server --open',
        build: 'webpack'
      },
      devDependencies: {
        'clean-webpack-plugin': '^3.0.0',
        'html-webpack-plugin': '^3.2.0',
        webpack: '^4.41.6',
        'webpack-cli': '^3.3.11',
        'webpack-dev-server': '^3.10.3',
        'webpack-manifest-plugin': '^2.2.0'
      },
    };
    augmentPackageJson(packageJsonAugmentation, this.destinationPath('package.json'));
  };
};

module.exports = class extends MyBase {
  initializing() {
    this.composeWith(DotfilesGenerator);
  };

  writing() {
    this.copyTemplateFiles();
    this.config.save();
  }

  install() {
    this.decoratePackageJsonBeforeInstall();
    this.npmInstall();
  }
};
