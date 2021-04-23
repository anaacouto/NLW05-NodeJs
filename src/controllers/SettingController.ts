import { Request, Response } from "express";
import { SettingService } from "../services/SettingService";

class SettingController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingService = new SettingService();
    try {
      const settings = await settingService.create({ chat, username });
      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;
    const settingService = new SettingService();
    await settingService.update(username, chat);
    return res.send();
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settingService = new SettingService();
    const setting = await settingService.findByUsername(username);
    return res.json(setting);
  }
}

export { SettingController };
