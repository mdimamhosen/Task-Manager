import DBConnect from "@/lib/DBConnect";
import Task from "@/models/Taks";
import { NextResponse } from "next/server";

export async function POST(req) {
  await DBConnect();
  try {
    const { id, updates } = await req.json();
    console.log(id, updates);
    if (!id || !updates) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const updateTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(
      {
        success: true,
        data: updateTask,
        message: "Task updated successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task.",
      },
      {
        status: 500,
      }
    );
  }
}
