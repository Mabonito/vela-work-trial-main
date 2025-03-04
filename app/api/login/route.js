import { NextResponse } from "next/server";
import { use } from "react";
const bcrypt = require("bcrypt");

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log(email,
      password)

    let user = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/profiles?email=${email}`
    ).then((res) => res.json());
    // User doesn't exist

    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    user = user[0];


    // Wrong password

    const match = password.trim() === user.password;
    console.log(match, password.trim(), user["password"], user["email"])
    if (!match) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // remove password from user before returning
    delete user.password;

    return NextResponse.json({ ...user });
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

}
