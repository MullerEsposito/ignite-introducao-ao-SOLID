import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const userProfile = this.showUserProfileUseCase.execute({ user_id });

      return response.json(userProfile);
    } catch (e) {
      return response.status(404).json({ error: e.message });
    }
  }
}

export { ShowUserProfileController };
