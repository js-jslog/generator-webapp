const Generator = require('yeoman-generator');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationRoot()
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );
  };
};

module.exports = class extends MyBase {
  writing() {
    this.copyTemplateFiles();
    this.config.save();
  }

  install() {
    this.npmInstall();
  }
};
