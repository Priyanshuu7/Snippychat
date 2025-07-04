import { Response, Request } from 'express';
import prisma from '../config/db.config.js';

// Controller class for managing chat groups
class ChatGroupController {
  // Get all chat groups for a user
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: 'desc' },
      });
      return res.json({
        message: 'Chat groups Fecthed sucessfully',
        data: groups,
      });
    } catch (error) {
      res.status(500).json({ message: 'you Fucked up' });
    }
  }

  // Get a specific chat group by ID
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const groups = await prisma.chatGroup.findUnique({
        where: { id: id },
      });
      return res.json({
        message: 'Chat group Fecthed sucessfully',
        data: groups,
      });
    } catch (error) {
      res.status(500).json({ message: 'you Fucked up' });
    }
  }

  // Create a new chat group
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });
      return res.json({ message: 'Chat group created sucessfully' });
    } catch (error) {
      res.status(500).json({ message: 'you Fucked up' });
    }
  }

  // Update an existing chat group
  static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const { id } = req.params;
      await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: { id: id },
      });
      return res.json({ message: 'Chat group Updated sucessfully' });
    } catch (error) {
      res.status(500).json({ message: 'you Fucked up' });
    }
  }

  // Delete a chat group
  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: { id: id },
      });
      return res.json({ message: 'Chat group deleted sucessfully' });
    } catch (error) {
      res.status(500).json({ message: 'you Fucked up' });
    }
  }
}

export default ChatGroupController;
