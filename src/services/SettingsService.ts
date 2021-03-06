import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settting";
import { SettingsRepository } from "../repositories/SettingsRepository";


interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {

    //Select * from settings where username = "username" limit 1;
    const userAlreadyExistis = await this.settingsRepository.findOne({
      username
    });

    if (userAlreadyExistis) {
      throw new Error("User already exists!");
    }

    // criar a representação do objeto
    const settings = this.settingsRepository.create({
      chat,
      username
    })

    // salvar o objeto settings
    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username,
    });
    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      })
      .execute();
  }

}

export { SettingsService }