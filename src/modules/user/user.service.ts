import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import type { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const { hashedPassword } = hashPassword(password);

    const user = await prisma.user.create({
        data: { ...rest, password: hashedPassword },
    });

    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            user_id: true,
            email: true,
            username: true,
            name: true,
            isAdmin: true,
        },
    });
}
