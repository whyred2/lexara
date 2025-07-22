import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { userAuthSchema } from "@/lib/validation/auth";

const registerSchema = userAuthSchema.omit({ confirmPassword: true });

const translations = {
  en: {
    userExists: "User with this email already exists",
    userCreated: "User created successfully",
    internalError: "Internal server error",
    invalidData: "Invalid input data",
  },
  ru: {
    userExists: "Пользователь с таким email уже существует",
    userCreated: "Пользователь успешно создан",
    internalError: "Внутренняя ошибка сервера",
    invalidData: "Неверные входные данные",
  },
  ua: {
    userExists: "Користувач з таким email вже існує",
    userCreated: "Користувача успішно створено",
    internalError: "Внутрішня помилка сервера",
    invalidData: "Невірні вхідні дані",
  },
};

function getTranslation(locale: string, key: string) {
  const supportedLocale =
    locale in translations ? (locale as keyof typeof translations) : "en";
  return translations[supportedLocale][
    key as keyof (typeof translations)["en"]
  ];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, locale } = body;

    const userLocale = locale || req.headers.get("Accept-Language") || "en";

    const validatedData = registerSchema.parse({ name, email, password });

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: getTranslation(userLocale, "userExists") },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: getTranslation(userLocale, "userCreated"),
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    const userLocale = req.headers.get("Accept-Language") || "en";

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: getTranslation(userLocale, "invalidData") },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: getTranslation(userLocale, "internalError") },
      { status: 500 },
    );
  }
}
