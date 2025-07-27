import * as fs from 'fs/promises';

type MarkdownBuilderOptions = {
  fileDirectory: string;
  fileName: string;
};

export class MarkdownBuilder {
  private content: string;
  private readonly filePath: string;

  constructor(options: MarkdownBuilderOptions) {
    const { fileDirectory, fileName } = options;

    this.content = '';
    this.filePath = `${fileDirectory}/${fileName}.md`;
  }

  async save() {
    try {
      await fs.writeFile(this.filePath, this.content);
    } catch (error) {
      console.error(`Failed to save markdown file: ${error?.toString()}`);
    }
  }

  addTitle(title: string, level = 3) {
    const prefix = this.content.length !== 0 ? `\n\n` : '';
    const hash = '#'.repeat(level);

    this.content += `${prefix}${hash} ${title}\n`;

    return this;
  }

  addListItem(item: string) {
    this.content += `\n- ${item}`;
    return this;
  }

  addNestedListItem(item: string, level = 1) {
    const indent = '  '.repeat(level);
    this.content += `\n${indent}- ${item}`;
    return this;
  }

  addSameLineItem(item: string) {
    this.content += ` ${item}`;
    return this;
  }
}
