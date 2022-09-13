import got from 'got';
import { appendFile } from 'fs/promises';
import { MockData } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import FilmGenerator from '../common/film-generator/film-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const filmsCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const filmGenerator = new FilmGenerator(this.initialData);

    for (let i = 0; i < filmsCount; i++) {
      await appendFile(filepath, `${filmGenerator.generate()}\n`, 'utf8');
    }

    console.log(`File ${filepath} was created!`);
  }
}
