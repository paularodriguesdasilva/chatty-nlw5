import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settting";

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> { }

export { SettingsRepository }