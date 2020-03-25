const Generator = require('yeoman-generator');
const DotfilesGenerator = require.resolve('generator-dotfiles/generators/app');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      // If dotfiles are reintroduced
      // the repeat this with '.*'
      this.templatePath('**/*'),
      this.destinationRoot()
    );
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
    this.npmInstall();
  }
};
