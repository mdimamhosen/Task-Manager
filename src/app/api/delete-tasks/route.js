import DBConnect from "@/lib/DBConnect";
import Task from "@/models/Taks";
import { NextResponse } from "next/server";

export async function POST(req) {
  await DBConnect();
  try {
    const { id } = await req.json();
    console.log(id);
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: deletedTask,
        message: "Task deleted successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete task.",
      },
      {
        status: 500,
      }
    );
  }
}
