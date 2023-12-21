import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

// ! kalo pake next js setiap nge save file hot reload bakal terjadi, jadi kita bikin PrismaClient terus terusan, jadi kita restore nya ke globalThis, karena globalThis itu ga ngefek ke hot reload
export const db = globalThis.prisma || new PrismaClient();

// ! ga di production karena di production kita ga pakai hot reload
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
