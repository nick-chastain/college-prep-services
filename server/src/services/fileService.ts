import { prisma } from '../lib/prisma';
import { Readable } from 'stream';

export class FileService {
  private static instance: FileService;

  private constructor() {}

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService();
    }
    return FileService.instance;
  }

  private generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop() || '';
    const sanitizedName = originalName
      .split('.')[0]
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    
    return `${sanitizedName}_${timestamp}_${randomString}.${extension}`;
  }

  async saveFile(
    file: Express.Multer.File,
    appointmentId: string
  ): Promise<string> {
    try {
      const fileName = this.generateFileName(file.originalname);

      const applicationMaterial = await prisma.applicationMaterial.create({
        data: {
          appointmentId,
          fileName: fileName,
          originalName: file.originalname,
          fileSize: file.size,
          fileType: file.mimetype,
          fileData: Buffer.from(file.buffer),
        },
      });

      return applicationMaterial.id;
    } catch (error) {
      console.error('Failed to save file:', error);
      throw error;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await prisma.applicationMaterial.delete({
        where: { id: fileId },
      });

      return true;
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }

  async getFilesByAppointment(appointmentId: string) {
    try {
      return await prisma.applicationMaterial.findMany({
        where: { appointmentId },
        select: {
          id: true,
          fileName: true,
          originalName: true,
          fileSize: true,
          fileType: true,
          createdAt: true,
          // Exclude fileData from the response
        },
      });
    } catch (error) {
      console.error('Failed to get files:', error);
      throw error;
    }
  }

  async getFileData(fileId: string): Promise<{
    data: Buffer;
    fileName: string;
    fileType: string;
  } | null> {
    try {
      const file = await prisma.applicationMaterial.findUnique({
        where: { id: fileId },
        select: {
          fileData: true,
          originalName: true,
          fileType: true,
        },
      });

      if (!file || !file.fileData) {
        return null;
      }

      return {
        data: file.fileData,
        fileName: file.originalName,
        fileType: file.fileType,
      };
    } catch (error) {
      console.error('Failed to get file data:', error);
      throw error;
    }
  }
} 