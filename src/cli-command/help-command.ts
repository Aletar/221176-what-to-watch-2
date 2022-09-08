import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public execute() {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            ${chalk.bold('cli.js')} --<command> ${chalk.gray('[--arguments]')}
        Команды:
            ${chalk.bold.green('--help')}:                      # печатает этот текст
            --version:                   # выводит номер версии
            --import <path>:             # импортирует данные из TSV
            --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
        `);
  }
}
